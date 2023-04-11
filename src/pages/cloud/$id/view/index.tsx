import React, { Component, useEffect, useRef } from "react";
import { request, history, useParams } from "ice";
import { Card, PageHeader, Form, Slider, Select } from "antd";
import { itemRender } from "@/utils";
import ThreeView from "../../components/3DViewer";
import PointPlugin from "../../components/3DViewer/PointPlugin";
import CameraPlugin from "../../components/3DViewer/CameraPlugin";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import styles from "./index.module.scss";

const Viewer = () => {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return null;
  }

  const threeRef = useRef(null);

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
      breadcrumbName: `测试case1`,
    },
    {
      breadcrumbName: "三维展示",
    },
  ];

  const loadFile = (func) => {
    const loader = new PLYLoader();
    loader.load("/test.ply", (model) => {
      func(model);
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
  ];

  return (
    <>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
        title="点云: 测试case1"
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
