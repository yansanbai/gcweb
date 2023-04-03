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
      title: "特征ID",
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
      title: "状态",
      dataIndex: "state",
      width: 200,
      render: (text) => {
        switch (text) {
          case "INIT":
            return <Tag color="blue">待提取</Tag>;
          case "RUNNING":
            return <Tag color="green">提取中</Tag>;
          case "FAIL":
            return <Tag color="red">失败</Tag>;
          case "FINISH":
            return <Tag color="gray">已完成</Tag>;
        }
      },
    },
    {
      title: "提取开始时间",
      dataIndex: "gmtCreate",
      width: 200,
    },
    {
      title: "提取结束时间",
      dataIndex: "gmtEnd",
      width: 200,
      render: (text) => {
        return text || "--";
      },
    },
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
                <a>查看日志</a>
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
                <a
                  onClick={() => {
                    history.push(`/cloud/${id}/feature/${record?.id}`);
                  }}
                >
                  详情
                </a>
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
      name: "特征集1",
      func: "算法1",
      state: "FINISH",
      gmtCreate: "2023-03-21 16:45:58",
      gmtEnd: "2023-03-22 16:45:58",
    },
    {
      id: 2,
      name: "特征集2",
      func: "算法2",
      state: "RUNNING",
      gmtCreate: "2023-03-21 16:45:58",
      gmtEnd: "",
    },
  ];

  return (
    <>
      <div className={styles.contentTitle}>
        <div className={styles.show} />
        点云特征
      </div>
      <div className={styles.operation}>
        <Form layout="inline">
          <Form.Item label="提取时间:">
            <DatePicker.RangePicker className={styles.picker} />
          </Form.Item>
          <Form.Item label="算法:">
            <Select className={styles.select} />
          </Form.Item>
          <Form.Item label="状态:">
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
          <PlusOutlined />
          开始提取
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ hideOnSinglePage: false, showSizeChanger: true }}
      />
    </>
  );
};
export default Feature;
