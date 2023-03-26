import React, { useEffect, useState } from "react";
import { request, history, useParams } from "ice";
import { CameraOutlined } from "@ant-design/icons";
import {
  PageHeader,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Select,
} from "antd";
import { itemRender } from "@/utils";
import styles from "./index.module.scss";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const CreateAnalysis = (props) => {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return null;
  }
  const [field] = Form.useForm();

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
      breadcrumbName: `点云详情`,
    },
    {
      breadcrumbName: `新建任务`,
    },
  ];

  const options1 = [
    {
      label: "特征1",
      value: "111",
    },
    {
      label: "特征2",
      value: "222",
    },
  ];

  const options2 = [
    {
      label: "算法1",
      value: "111",
    },
    {
      label: "算法2",
      value: "222",
    },
  ];

  // 这里是临时数据
  return (
    <>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
      />
      <div className={styles.createTitle}>新建特征分析任务</div>
      <Form {...layout} form={field}>
        <Form.Item label="分析特征" name="id">
          <Select options={options1} />
        </Form.Item>
        <Form.Item label="提取方法" name="func">
          <Select options={options2} />
        </Form.Item>
      </Form>
      <div className={styles.btns}>
        <Button type="primary">提交</Button>
        <Button>重置</Button>
      </div>
    </>
  );
};

export default CreateAnalysis;
