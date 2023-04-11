import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Collapse } from "antd";
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
  const pointsRef = useRef();
  const materialRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    iniThree();
  }, []);

  const iniThree = () => {
    //创建场景
    const scene = new THREE.Scene();
    //创建相机
    const camera = new THREE.PerspectiveCamera(30, 1600 / 800, 1, 3000);
    camera.position.set(100, 100, 100);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    setPos({
      position: camera?.position,
      rotation: camera?.rotation,
    });

    const material = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.5,
      opacity: 0.6,
    });
    materialRef.current = material;

    loadFile((model) => {
      const points = new THREE.Points(model, material);
      pointsRef.current = points;
      scene.add(points);
      sceneRef.current = scene;
    });

    //生成渲染实例
    const container = document.getElementById("container");
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(1600, 800); //设置宽高
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
    scene: sceneRef.current,
    points: pointsRef.current,
    material: materialRef.current,
    camera: cameraRef.current,
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

  return (
    <div className={styles.container}>
      <div className={styles.three}>
        <div id="container" />
      </div>
      <div className={styles.operation}>
        <Collapse defaultActiveKey={defaultActiveKey}>{panels}</Collapse>
      </div>
    </div>
  );
};
export default ThreeViewer;
