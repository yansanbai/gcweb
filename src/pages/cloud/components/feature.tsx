import React, { useEffect, useState } from "react";
import { request, history, useParams } from "ice";
import { CameraOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Descriptions,
  Tag,
  Card,
  PageHeader,
  Button,
  Tabs,
  Table,
  Space,
  Form,
  Select,
  DatePicker,
} from "antd";
import styles from "./index.module.scss";

const Feature = (props) => {
  const { id } = props;
  const columns = [
    {
      title: "数据ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "提取算法",
      dataIndex: "func",
      width: 200,
    },
    {
      title: "提取时间",
      dataIndex: "gmtCreate",
      width: 200,
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 150,
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <a>三维展示</a>
            <a onClick={() => {}}>删除</a>
          </Space>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      name: "特征集1",
      func: "算法1",
      gmtCreate: "2023-03-21 16:45:58",
    },
    {
      id: 2,
      name: "特征集2",
      func: "算法2",
      gmtCreate: "2023-03-21 16:45:58",
    },
  ];

  return (
    <>
      <div className={styles.operation}>
        <Form layout="inline">
          <Form.Item label="提取时间:">
            <DatePicker.RangePicker className={styles.picker} />
          </Form.Item>
          <Form.Item label="算法:">
            <Select className={styles.select} />
          </Form.Item>
        </Form>
        <Button
          type="primary"
          className={styles.btn}
          onClick={() => {
            history.push(`/cloud/${id}/createFeature`);
          }}
        >
          开始提取
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default Feature;
