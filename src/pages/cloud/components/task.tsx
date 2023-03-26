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

const Task = (props) => {
  const columns = [
    {
      title: "任务ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "任务类型",
      dataIndex: "type",
      width: 150,
    },
    {
      title: "任务状态",
      dataIndex: "state",
      width: 200,
      render: (text) => {
        switch (text) {
          case "INIT":
            return <Tag color="blue">待执行</Tag>;
          case "RUNNING":
            return <Tag color="green">运行中</Tag>;
          case "FAIL":
            return <Tag color="red">失败</Tag>;
          case "FINISH":
            return <Tag color="gray">已完成</Tag>;
        }
      },
    },
    {
      title: "任务开始时间",
      dataIndex: "gmtCreate",
      width: 200,
    },
    {
      title: "任务结束时间",
      dataIndex: "gmtEnd",
      width: 200,
      render: (text) => {
        return text || "--";
      },
    },
    // 不同状态可以有不同操作
    {
      title: "操作",
      dataIndex: "operation",
      width: 150,
      render: (text, record, index) => {
        switch (record?.state) {
          case "INIT":
            return (
              <Space size="middle">
                <a>删除</a>
              </Space>
            );
          case "RUNNING":
            return (
              <Space size="middle">
                <a>取消</a>
              </Space>
            );
          case "FAIL":
            return (
              <Space size="middle">
                <a>重试</a>
                <a>取消</a>
              </Space>
            );
          case "FINISH":
            return (
              <Space size="middle">
                <a>查看数据</a>
                <a>删除</a>
              </Space>
            );
        }
      },
    },
  ];

  const data = [
    {
      id: 1,
      type: "特征提取",
      state: "FINISH",
      gmtCreate: "2023-03-21 16:45:58",
      gmtEnd: "2023-03-22 16:45:58",
    },
    {
      id: 2,
      type: "特征分析",
      state: "RUNNING",
      gmtCreate: "2023-03-21 16:45:58",
      gmtEnd: "",
    },
  ];

  return (
    <>
      <div className={styles.operation}>
        <Form layout="inline">
          <Form.Item label="任务开始时间:">
            <DatePicker.RangePicker className={styles.picker} />
          </Form.Item>
          <Form.Item label="类型:">
            <Select className={styles.select} />
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default Task;
