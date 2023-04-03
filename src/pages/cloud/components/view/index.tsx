import React, { Component, useEffect } from "react";
import { request, history, useParams } from "ice";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Descriptions, Tag, Card, PageHeader, Button, Tabs } from "antd";
import { itemRender } from "@/utils";
import styles from "./index.module.scss";

const Viewer = () => {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return null;
  }

  const routes = [
    {
      path: "/index",
      breadcrumbName: "首页",
    },
    {
      path: `/cloud/list`,
      breadcrumbName: "点云列表",
    },
    {
      path: `/cloud/${id}`,
      breadcrumbName: `点云${id}`,
    },
    {
      breadcrumbName: "三维展示",
    },
  ];

  const generateSprite = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;

    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(0,255,255,1)");
    gradient.addColorStop(0.4, "rgba(0,0,64,1)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const iniThree = () => {
    //创建场景
    const scene = new THREE.Scene();

    // 加载文件
    const loader = new PLYLoader();
    loader.load("/test.ply", (model) => {
      // 点材质
      const material = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.4,
        opacity: 0.6,
      });
      // 点模型
      const mesh = new THREE.Points(model, material);
      //添加至场景
      scene.add(mesh);
      renderer.render(scene, camera);
    });

    //创建相机
    const camera = new THREE.PerspectiveCamera(30, 1600 / 800, 1, 3000);
    camera.position.set(100, 100, 100);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // 坐标轴
    const axesHelper = new THREE.AxesHelper(150);
    scene.add(axesHelper);

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
    };
    animate();
  };

  useEffect(() => {
    iniThree();
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
      />
      <div className={styles.container}>
        <div id="container" />
      </div>
    </>
  );
};
export default Viewer;
