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
  Card,
  Form,
  Input,
  Cascader,
} from "antd";
import {
  PlusOutlined,
  RedoOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { itemRender } from "@/utils";
import styles from "./index.module.scss";

const { TabPane } = Tabs;
const { Meta } = Card;

const ModalList = (props) => {
  const data = [
    {
      id: 1,
      name: "假山石模型",
      tags: (
        <>
          <Tag color="red">景观</Tag>
          <Tag color="blue">石头</Tag>
        </>
      ),
      img: "/test1.png",
    },
    {
      id: 2,
      name: "石桌",
      tags: (
        <>
          <Tag color="red">景观</Tag>
          <Tag color="blue">石头</Tag>
        </>
      ),
      img: "/test2.jpg",
    },
    {
      id: 3,
      name: "曲桥",
      tags: (
        <>
          <Tag color="red">建筑</Tag>
          <Tag color="blue">桥</Tag>
        </>
      ),
      img: "/test3.jpg",
    },
    {
      id: 4,
      name: "六角亭",
      tags: (
        <>
          <Tag color="red">建筑</Tag>
          <Tag color="blue">亭子</Tag>
        </>
      ),
      img: "/test4.jpg",
    },
  ];

  const handleRefresh = () => {
    //refresh();
  };

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <a href="/index">首页</a>,
          },
          {
            title: "模型列表",
          },
        ]}
        style={{ marginBottom: 16 }}
      />
      <div className={styles.operation}>
        <Form layout="inline">
          <Form.Item label="名称:">
            <Input className={styles.select} />
          </Form.Item>
          <Form.Item label="标签:">
            <Cascader className={styles.select} />
          </Form.Item>
          <Button shape="circle" icon={<SearchOutlined />} type="primary" />
        </Form>
        <Button>
          <RedoOutlined onClick={handleRefresh} />
          刷新
        </Button>
      </div>
      <div className={styles.cardContainer}>
        {data.map((c) => {
          return (
            <Card
              style={{ width: 300 }}
              hoverable
              cover={<img alt="example" src={c.img} width={300} height={200} />}
              actions={[
                <DownloadOutlined key="down" />,
                <EditOutlined key="down" />,
                <DeleteOutlined key="down" />,
              ]}
              onClick={() => {
                history?.push(`/model/1`);
              }}
              className={styles.card}
            >
              <Meta
                title={
                  <div className={styles.tags}>
                    <span>{c.name}</span>
                    {c.tags}
                  </div>
                }
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ModalList;
