import React, { Component, useEffect, useRef } from "react";
import { request, history, useParams, useSearchParams } from "ice";
import { Card, PageHeader, Form, Slider, Select } from "antd";
import { itemRender } from "@/utils";
import * as THREE from "three";
import ThreeView from "../../../../components/3DViewer";
import PointPlugin from "@/pages/cloud/components/3DViewer/PointPlugin";
import CameraPlugin from "@/pages/cloud/components/3DViewer/CameraPlugin";
import VisualizePlugin from "@/pages/cloud/components/3DViewer/VisualizePlugin";
import BoxPlugin from "@/pages/cloud/components/3DViewer/BoxPlugin";
import styles from "./index.module.scss";

const Viewer = () => {
  const params = useParams();
  const { id, featureId } = params;
  if (!id) {
    return null;
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const analysis = searchParams.get("analysis");

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
      path: `/cloud/${id}/feature/${featureId}`,
      breadcrumbName: `特征集1`,
    },
    {
      breadcrumbName: "三维展示",
    },
  ];

  const loadFile = (func) => {
    fetch("/test.json")
      .then((response) => response.json())
      .then((json) => {
        const model = new THREE.BufferGeometry();
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
        model.attributes.position = new THREE.BufferAttribute(
          new Float32Array(array1),
          3
        );
        model.attributes.color = new THREE.BufferAttribute(
          new Float32Array(array2),
          3
        );
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
    {
      title: "可视化方式设置",
      key: "visual",
      component: (pluginProps) => {
        return <VisualizePlugin {...pluginProps} file={"/test.json"} />;
      },
    },
    analysis
      ? {
          title: "分析框设置",
          key: "box",
          component: (pluginProps) => {
            return <BoxPlugin {...pluginProps} file={"/test.json"} />;
          },
        }
      : null,
  ].filter(Boolean);

  return (
    <>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
        title="特征: 特征集1"
      />
      <ThreeView
        loadFile={loadFile}
        plugins={plugins}
        defaultActiveKey={analysis ? ["box"] : ["visual"]}
      />
    </>
  );
};
export default Viewer;
