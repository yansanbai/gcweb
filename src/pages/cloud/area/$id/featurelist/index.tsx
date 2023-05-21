import React, { useEffect, useState } from "react";
import { request, history, useParams } from "ice";
import { CameraOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import {
  Descriptions,
  Tag,
  Card,
  Button,
  Tabs,
  Table,
  Space,
  Form,
  Select,
  DatePicker,
  Drawer,
  Alert,
  Input,
} from "antd";
import styles from "./index.module.scss";

const Feature = (props) => {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const [field] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "任务ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "状态",
      dataIndex: "state",
      width: 200,
      render: (text) => {
        switch (text) {
          case "CLOSE":
            return <Tag color="gray">已取消</Tag>;
          case "RUNNING":
            return <Tag color="green">提取中</Tag>;
          case "FAIL":
            return <Tag color="red">失败</Tag>;
          case "FINISH":
            return <Tag color="blue">已完成</Tag>;
        }
      },
    },
    {
      title: "开始时间",
      dataIndex: "gmtCreate",
      width: 200,
    },
    {
      title: "结束时间",
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
                    history.push(`/cloud/area/1/build/1`);
                  }}
                >
                  查看结果
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
      func: "PFH",
      state: "FINISH",
      gmtCreate: "2023-4-01 15:04:55",
      gmtEnd: "2023-4-01 15:06:58",
    },
  ];

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const options2 = [{ label: "泊松表面重建", value: 1 }];

  return (
    <>
      <div className={styles.contentTitle}>
        <div className={styles.show} />
        重建
      </div>
      <div className={styles.operation}>
        <Form layout="inline">
          <Form.Item label="重建时间:">
            <DatePicker.RangePicker className={styles.picker} />
          </Form.Item>
          <Form.Item label="状态:">
            <Select className={styles.select} />
          </Form.Item>
        </Form>
        <div>
          <Button
            type="primary"
            className={styles.btn}
            onClick={() => {
              showDrawer();
            }}
          >
            <PlusOutlined />
            开始重建
          </Button>
          <Button>
            <RedoOutlined onClick={() => {}} />
            刷新
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ hideOnSinglePage: false, showSizeChanger: true }}
      />
      <Drawer
        title="新建重建任务"
        placement="right"
        onClose={onClose}
        open={open}
        closable={false}
        size="large"
      >
        {/* <Alert
          message="不同的提取方法具有不同的效果...，重建任务需要执行约十分钟。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        /> */}
        <Form {...layout} form={field}>
          <Form.Item label="点云" name="id" initialValue="假山">
            <Input disabled />
          </Form.Item>
          <Form.Item label="重建方法" name="func" initialValue={1}>
            <Select options={options2} />
          </Form.Item>
          <Form.Item label=" ">
            <div className={styles.footer}>
              <Button type="primary">确认</Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default Feature;
