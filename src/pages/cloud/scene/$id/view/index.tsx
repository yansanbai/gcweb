import React, { Component, useEffect, useRef } from "react";
import { request, history, useParams } from "ice";
import { Card, Breadcrumb, Form, Slider, Select } from "antd";
import { itemRender } from "@/utils";
import ThreeView from "@/components/3DViewer";
import PointPlugin from "@/components/3DViewer/PointPlugin";
import CameraPlugin from "@/components/3DViewer/CameraPlugin";
import BoxPlugin from "@/components/3DViewer/BoxPlugin";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import styles from "./index.module.scss";

const Viewer = () => {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return null;
  }

  const loadFile = (func) => {
    const loader = new PLYLoader();
    loader.load("/diaohualou.ply", (model) => {
      const material = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.1,
        opacity: 0.6,
      });
      const points = new THREE.Points(model, material);
      func(material, points);
    });
  };

  const plugins = [
    {
      title: "点设置",
      key: "points",
      component: (pluginProps) => {
        return <PointPlugin {...pluginProps} />;
      },
    },
    {
      title: "相机设置",
      key: "camera",
      component: (pluginProps) => {
        return <CameraPlugin {...pluginProps} />;
      },
    },
    {
      title: "提取框设置",
      key: "box",
      component: (pluginProps) => {
        return <BoxPlugin {...pluginProps} />;
      },
    },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <a href="/index">首页</a>,
          },
          {
            title: <a href="/cloud/list">点云列表</a>,
          },
          {
            title: <a href="/cloud/scene/1">雕花楼</a>,
          },
          {
            title: "三维展示",
          },
        ]}
        style={{ marginBottom: 16 }}
      />
      <ThreeView
        loadFile={loadFile}
        plugins={plugins}
        defaultActiveKey={["camera"]}
      />
    </>
  );
};
export default Viewer;
