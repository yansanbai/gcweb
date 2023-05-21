import React, { useEffect, useRef, useState } from "react";
import { request, history } from "ice";
import { requestConfig } from "@/app";
import {
  Breadcrumb,
  Button,
  Table,
  Space,
  Modal,
  Tabs,
  Tag,
  Form,
  DatePicker,
  Select,
  Input,
} from "antd";
import { PlusOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import FormModal, { IRef } from "./formModal";
import { itemRender } from "@/utils";
import styles from "./index.module.scss";

const { TabPane } = Tabs;

const CloudList = (props) => {
  // const [data, setData] = useState([]);

  // const getData = async () => {
  //   const res = await request.get("/list", requestConfig);
  //   if (res?.success) {
  //     setData(res?.data);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const modalRef = useRef<IRef>(null);

  const columns = [
    {
      title: "点云ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "描述",
      dataIndex: "description",
      width: 200,
    },
    {
      title: "上传时间",
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
            <a
              onClick={() => {
                history?.push(`/cloud/scene/${record.id}`);
              }}
            >
              详情
            </a>
            <a
              onClick={() => {
                modalRef?.current?.show(record);
              }}
            >
              编辑
            </a>
            <a
              onClick={() => {
                Modal.confirm({
                  title: "确认",
                  content: "确定要删除这个点云吗?",
                });
              }}
            >
              删除
            </a>
          </Space>
        );
      },
    },
  ];

  const columnsArea = [
    {
      title: "点云ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "描述",
      dataIndex: "description",
      width: 200,
      render: (t) => {
        return t || "--";
      },
    },
    {
      title: "关联场景",
      dataIndex: "scene",
      width: 200,
      render: (t, r) => {
        return (
          <>
            <Tag>{t}</Tag>
            {r.sceneName}
          </>
        );
      },
    },
    {
      title: "生成时间",
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
            <a
              onClick={() => {
                history?.push(`/cloud/area/${record.id}`);
              }}
            >
              详情
            </a>
            <a
              onClick={() => {
                Modal.confirm({
                  title: "确认",
                  content: "确定要删除这个点云吗?",
                });
              }}
            >
              删除
            </a>
          </Space>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      name: "测试case1",
      description: "测试点云功能",
      gmtCreate: "2023-3-20 10:23:40",
    },
    {
      id: 2,
      name: "雕花楼",
      description: "网上资源",
      gmtCreate: "2023-3-23 13:10:26",
    },
  ];

  const dataArea = [
    {
      id: 1,
      name: "假山",
      description: "测试分割功能",
      scene: 2,
      sceneName: "雕花楼",
      gmtCreate: "2023-3-28 13:55:20",
    },
    {
      id: 2,
      name: "红色亭子",
      description: "",
      scene: 2,
      sceneName: "雕花楼",
      gmtCreate: "2023-3-28 14:10:26",
    },
  ];

  const handleRefresh = () => {
    //refresh();
  };

  const handleUpload = () => {
    modalRef?.current?.show();
  };

  const items = [
    {
      key: "1",
      label: `场景点云`,
      children: (
        <>
          <div className={styles.operation}>
            <Form layout="inline">
              <Form.Item label="名称:">
                <Input className={styles.select} />
              </Form.Item>
              <Form.Item label="描述:">
                <Input className={styles.select} />
              </Form.Item>
              <Button shape="circle" icon={<SearchOutlined />} type="primary" />
            </Form>
            <div>
              <Button
                type="primary"
                className={styles.btn}
                onClick={handleUpload}
              >
                <PlusOutlined />
                上传点云
              </Button>
              <Button>
                <RedoOutlined onClick={handleRefresh} />
                刷新
              </Button>
            </div>
          </div>
          <Table columns={columns} dataSource={data} />
          <FormModal ref={modalRef} />
        </>
      ),
    },
    {
      key: "2",
      label: `区域点云`,
      children: (
        <>
          <div className={styles.operation}>
            <Form layout="inline">
              <Form.Item label="名称:">
                <Input className={styles.select} />
              </Form.Item>
              <Form.Item label="描述:">
                <Input className={styles.select} />
              </Form.Item>
              <Form.Item label="关联场景:">
                <Input className={styles.select} />
              </Form.Item>
              <Button shape="circle" icon={<SearchOutlined />} type="primary" />
            </Form>
            <Button>
              <RedoOutlined onClick={handleRefresh} />
              刷新
            </Button>
          </div>
          <Table columns={columnsArea} dataSource={dataArea} />
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <a href="/index">首页</a>,
          },
          {
            title: "点云列表",
          },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Tabs items={items} type="card" />
    </>
  );
};

export default CloudList;
