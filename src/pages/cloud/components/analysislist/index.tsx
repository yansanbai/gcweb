import React, { useEffect, useState } from "react";
import { request, history, useParams } from "ice";
import {
  CameraOutlined,
  PlusOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
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
import ReactDOM from "react-dom";
import { Chart, LineAdvance } from "bizcharts";
import { cards } from "./data";

const Analysis = (props) => {
  const { id } = props;

  return (
    <>
      <div className={styles.contentTitle}>
        <div className={styles.show} />
        分析数据
      </div>
      <div className={styles.operation}>
        {/* <Form layout="inline">
          <Form.Item label="提取时间:">
            <DatePicker.RangePicker className={styles.picker} />
          </Form.Item>
          <Form.Item label="算法:">
            <Select className={styles.select} />
          </Form.Item>
          <Form.Item label="状态:">
            <Select className={styles.select} />
          </Form.Item>
        </Form> */}
        <div></div>
        <Button
          type="primary"
          className={styles.btn}
          onClick={() => {
            history.push(`/cloud/${id}/createFeature`);
          }}
        >
          <PlusOutlined />
          新增分析
        </Button>
      </div>
      <div className={styles.charts}>
        {cards.map((item) => {
          return (
            <Card
              className={styles.chart}
              title={item?.name}
              extra={
                <Space size="middle" className={styles.extra}>
                  <a>
                    <DownloadOutlined />
                  </a>
                  <a>
                    <DeleteOutlined />
                  </a>
                </Space>
              }
            >
              <Chart autoFit height={300} data={item?.data}>
                <LineAdvance point area position="x*y" />
              </Chart>
            </Card>
          );
        })}
      </div>
    </>
  );
};
export default Analysis;
