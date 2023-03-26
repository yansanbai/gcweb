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

const CreateFeature = (props) => {
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

  const options = [
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
      <div className={styles.createTitle}>新建特征提取任务</div>
      <Form {...layout} form={field}>
        <Form.Item label="点云" name="id" initialValue="测试case1">
          <Input disabled />
        </Form.Item>
        <Form.Item label="提取方法" name="func">
          <Select options={options} />
        </Form.Item>
      </Form>
      <div className={styles.btns}>
        <Button type="primary">提交</Button>
        <Button>重置</Button>
      </div>
    </>
  );
};

export default CreateFeature;
