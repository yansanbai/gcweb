import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Collapse, Alert } from "antd";
import styles from "./index.module.scss";

const { Panel } = Collapse;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17, offset: 1 },
};

const ThreeViewer = (props) => {
  const { loadFile, plugins, defaultActiveKey } = props;
  const [pos, setPos] = useState({});
  const sceneRef = useRef();
  const geoRef = useRef();
  const materialRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    iniThree();
  }, []);

  const iniThree = () => {
    //创建场景
    const scene = new THREE.Scene();
    //创建相机
    const camera = new THREE.PerspectiveCamera(30, 1600 / 900, 1, 3000);
    camera.position.set(100, 100, 100);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    setPos({
      position: camera?.position,
      rotation: camera?.rotation,
    });

    loadFile((material, geometry) => {
      scene.add(geometry);
      geoRef.current = geometry;
      materialRef.current = material;
      sceneRef.current = scene;
    });

    //生成渲染实例
    const container = document.getElementById("container");
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(1600, 900); //设置宽高
    renderer.setClearColor("#fff", 0.5); //背景颜色
    container.appendChild(renderer.domElement); //放入对应的dom容器

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

  // 使用外部插件
  const pluginProps = {
    scene: sceneRef,
    geometry: geoRef,
    material: materialRef,
    camera: cameraRef,
    positions: pos,
  };

  const panels = plugins.map((plugin) => {
    const { title, key, component } = plugin;
    return (
      <Panel header={title} key={key}>
        {component(pluginProps)}
      </Panel>
    );
  });

  //操作鼠标左键、右键、滚轮可对模型进行旋转、平移、缩放操作。
  //当前页面展示内容为场景点云的分割结果，您可以在点击“开始选择”后，鼠标选取需要的某个区域。全部选择完毕后，点击“完成选择”，查看效果并保存为区域点云。
  return (
    <div className={styles.container}>
      <div className={styles.three}>
        <Alert
          message="当前页面展示内容为区域点云的重建结果，您可以填写模型信息进行保存，也可以使用提取框选择需要区域进行保存。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <div id="container" />
      </div>
      <div className={styles.operation}>
        <Collapse defaultActiveKey={defaultActiveKey}>{panels}</Collapse>
      </div>
    </div>
  );
};
export default ThreeViewer;