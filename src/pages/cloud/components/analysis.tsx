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

const Analysis = (props) => {
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
      title: "分析算法",
      dataIndex: "func",
      width: 200,
    },
    {
      title: "分析时间",
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
            <a>展示</a>
            <a onClick={() => {}}>删除</a>
          </Space>
        );
      },
    },
  ];

  const data = [];

  if (!data.length) {
    return (
      <div className={styles.empty}>
        <span>
          当前暂无可查看的分析数据，请点击“开始分析”按钮对提取的特征数据进行分析。
        </span>
        <Button
          type="primary"
          className={styles.btn}
          onClick={() => {
            history.push(`/cloud/${id}/createAnalysis`);
          }}
        >
          开始分析
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.operation}>
        <Form layout="inline">
          <Form.Item label="分析时间:">
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
            history.push(`/cloud/${id}/createAnalysis`);
          }}
        >
          开始分析
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default Analysis;
