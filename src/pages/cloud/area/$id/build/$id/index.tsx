import React, { Component, useEffect, useRef } from "react";
import { request, history, useParams } from "ice";
import { Card, Breadcrumb, Form, Slider, Select } from "antd";
import { itemRender } from "@/utils";
import ThreeView from "@/components/3DViewer";
import PointPlugin from "@/components/3DViewer/PointPlugin";
import CameraPlugin from "@/components/3DViewer/CameraPlugin";
import BoxPlugin from "@/components/3DViewer/SavePlugin";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import styles from "./index.module.scss";
import geometry from "bizcharts/lib/geometry";

const Viewer = () => {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return null;
  }

  const loadFile = (func) => {
    const loader = new PLYLoader();
    loader.load("/rock_model.ply", (model) => {
      const meshMaterial = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
      });
      const geo = new THREE.Mesh(model, meshMaterial);
      func(meshMaterial, geo);
    });
  };

  const plugins = [
    {
      title: "相机设置",
      key: "camera",
      component: (pluginProps) => {
        return <CameraPlugin {...pluginProps} />;
      },
    },
    {
      title: "重建结果保存",
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
            title: <a href="/cloud/area/1">假山</a>,
          },
          {
            title: "重建结果",
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
