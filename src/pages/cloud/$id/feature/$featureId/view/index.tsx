import React, { Component, useEffect, useRef } from "react";
import { request, history, useParams } from "ice";
import { Card, PageHeader, Form, Slider, Select } from "antd";
import { itemRender } from "@/utils";
import ThreeView from "../../../../components/threeView";
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

  return (
    <>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
        title="点云: 测试case1"
      />
      <ThreeView operation={[0, 1, 2]} file="/test.json" />
    </>
  );
};
export default Viewer;
