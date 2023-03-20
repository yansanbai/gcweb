import React, { useRef } from "react";
import { useRequest } from "@ice/plugin-request/hooks";
import { PageHeader, Button, Table, Space, Modal } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import FormModal, { IRef } from "./formModal";
import styles from "./index.module.scss";

const CloudList = (props) => {
  const { loading, data, refresh } = useRequest("/api/cloud/mylist", {
    manual: false,
  });

  const modalRef = useRef<IRef>(null);

  const routes = [
    {
      path: "/index",
      breadcrumbName: "首页",
    },
    {
      breadcrumbName: "点云列表",
    },
  ];

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
            <a>详情</a>
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

  const handleRefresh = () => {
    refresh();
  };

  const handleUpload = () => {
    modalRef?.current?.show();
  };

  const dataSource = Array.isArray(data?.data) ? data?.data : [];

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="我的点云列表"
        breadcrumb={{ routes }}
      />
      <div className={styles.operation}>
        <Button type="primary" className={styles.btn} onClick={handleUpload}>
          <PlusOutlined />
          上传点云
        </Button>
        <Button>
          <RedoOutlined onClick={handleRefresh} />
          刷新
        </Button>
      </div>
      <Table loading={loading} columns={columns} dataSource={dataSource} />
      <FormModal ref={modalRef} />
    </>
  );
};

export default CloudList;
