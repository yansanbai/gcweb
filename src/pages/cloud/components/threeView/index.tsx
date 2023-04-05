import React, {
  Component,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { request, history, useParams } from "ice";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  Descriptions,
  Tag,
  Card,
  PageHeader,
  Button,
  Tabs,
  Alert,
  Form,
  Slider,
  Select,
  Collapse,
  Input,
} from "antd";
import { itemRender } from "@/utils";
import styles from "./index.module.scss";

const { Panel } = Collapse;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17, offset: 1 },
};

const ThreeView = forwardRef((props, ref) => {
  const { file, operation } = props;
  const [pos, setPos] = useState({});

  useImperativeHandle(ref, () => {
    return {};
  });

  const iniThree = () => {
    //创建场景
    const scene = new THREE.Scene();

    //创建相机
    const camera = new THREE.PerspectiveCamera(30, 1600 / 800, 1, 3000);
    camera.position.set(100, 100, 100);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.lookAt(0, 0, 0);
    setPos({
      position: camera?.position,
      rotation: camera?.rotation,
    });

    if (file.indexOf("ply") !== -1) {
      // 加载文件
      const loader = new PLYLoader();
      loader.load(file, (model) => {
        // 点材质
        const material = new THREE.PointsMaterial({
          vertexColors: true,
          size: 0.5,
          opacity: 0.6,
        });
        // 点模型
        const mesh = new THREE.Points(model, material);
        //添加至场景
        scene.add(mesh);
      });
    } else {
      fetch(file)
        .then((response) => response.json())
        .then((json) => {
          const geometry = new THREE.BufferGeometry();
          const array1 = [];
          const array2 = [];
          json?.data.forEach((item) => {
            array1.push(item[0]);
            array1.push(item[1]);
            array1.push(item[2]);
            array2.push(item[3]);
            array2.push(item[4]);
            array2.push(item[5]);
          });
          geometry.attributes.position = new THREE.BufferAttribute(
            new Float32Array(array1),
            3
          );
          geometry.attributes.color = new THREE.BufferAttribute(
            new Float32Array(array2),
            3
          );
          const material = new THREE.PointsMaterial({
            vertexColors: true,
            size: 0.5,
            opacity: 0.6,
          });
          const points = new THREE.Points(geometry, material); //点模型对象
          scene.add(points);
        });
    }

    // 坐标轴
    // const axesHelper = new THREE.AxesHelper(150);
    // scene.add(axesHelper);

    //生成渲染实例
    const container = document.getElementById("container");
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(1600, 800); //设置宽高
    renderer.setClearColor("#fff", 0.5); //背景颜色
    container.appendChild(renderer.domElement); //生成的渲染的实例, 这个要放到对应的dom容器里面

    // 相机控件
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = true;
    orbitControls.target = new THREE.Vector3(0, 0, 0); //控制焦点

    // 动画循环渲染
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      setPos({
        position: camera?.position,
        rotation: camera?.rotation,
      });
    };
    animate();
  };

  useEffect(() => {
    iniThree();
  }, []);

  const { x: xpos, y: ypos, z: zpos } = pos?.position || {};
  const { x: xro, y: yro, z: zro } = pos?.rotation || {};
  const postext = `X : ${Number(xpos).toFixed(2)}  Y : ${Number(ypos).toFixed(
    2
  )}  Z : ${Number(zpos).toFixed(2)}`;
  const rotext = `X : ${Number(xro).toFixed(2)}  Y : ${Number(yro).toFixed(
    2
  )}  Z : ${Number(zro).toFixed(2)}`;

  const panels = [
    <Panel header="点设置" key="point">
      <Form {...layout} labelAlign="left">
        <Form.Item label="点大小" name="size">
          <Slider min={1} max={20} />
        </Form.Item>
        <Form.Item label="点标记" name="shape" initialValue="square">
          <Select options={[{ label: "square", value: "square" }]} />
        </Form.Item>
      </Form>
    </Panel>,
    <Panel header="相机设置" key="camera">
      <Form {...layout} labelAlign="left">
        <Form.Item label="位置" name="pos">
          {postext}
        </Form.Item>
        <Form.Item label="欧拉角" name="eular">
          {rotext}
        </Form.Item>
      </Form>
      <Button type="primary" style={{ marginRight: 16 }}>
        保存相机姿态
      </Button>
      <Button>还原相机姿态</Button>
    </Panel>,
    <Panel header="可视化方式设置" key="visual">
      <Form {...layout} labelAlign="left">
        <Form.Item label="描述子维度" name="pos">
          5
        </Form.Item>
        <Form.Item label="可视化维度" name="eular">
          <Input placeholder="示例: 1 或 1-3" />
        </Form.Item>
        <Form.Item label="colorbar" name="eular">
          <Select />
        </Form.Item>
      </Form>
    </Panel>,
  ];

  return (
    <div className={styles.container}>
      <div className={styles.three}>
        <Alert
          message={
            <>
              请使用鼠标滚轮、左键、右键控制摄像机进行缩放、旋转、平移，摄像机当前位置可保存，更多详见&nbsp;
              <a>文档</a>。
            </>
          }
          type="info"
          showIcon
          className={styles.alert}
        />
        <div id="container" />
      </div>
      <div className={styles.operation}>
        <Collapse defaultActiveKey={["camera"]}>
          {operation.map((op) => {
            return panels[op];
          })}
        </Collapse>
      </div>
    </div>
  );
});
export default ThreeView;
