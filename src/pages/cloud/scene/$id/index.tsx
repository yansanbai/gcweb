import React, { useEffect, useState } from "react";
import { request, history, useParams } from "ice";
import { CameraOutlined } from "@ant-design/icons";
import { Descriptions, Tag, Card, Breadcrumb, Button, Tabs } from "antd";
import Feature from "./featurelist";
import { itemRender } from "@/utils";
import styles from "./index.module.scss";

const Cloud = (props) => {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return null;
  }

  // const [detail, setDetail] = useState({});

  // const init = async () => {
  //   const [res1] = await Promise.all([request.get(`/cloud/detail?id=${id}`)]);
  //   if (res1?.success) {
  //     setDetail(res1?.data);
  //   }
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  const detail = {
    id: 1,
    name: "雕花楼",
    description: "网上资源",
    gmtCreate: "2023-3-20 10:23:40",
  };

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <a href="/index">首页</a>,
          },
          {
            title: <a href="/cloud/list">点云列表</a>,
          },
          {
            title: "雕花楼",
          },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Card className={styles.card}>
        <Descriptions
          title={
            <div className={styles.operation}>
              <div className={styles.title}>
                {detail?.name}
                <Tag style={{ borderRadius: 4 }}>{detail?.id}</Tag>
              </div>
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    history.push(`/cloud/scene/${id}/view`);
                  }}
                >
                  <CameraOutlined />
                  三维展示
                </Button>
                <Button>编辑</Button>
              </div>
            </div>
          }
          column={2}
        >
          <Descriptions.Item label="上传时间">
            2023-3-20 10:23:44
          </Descriptions.Item>
          <Descriptions.Item label="点数">300000</Descriptions.Item>
          <Descriptions.Item label="文件大小">77.2M</Descriptions.Item>
          <Descriptions.Item label="描述">网上资源</Descriptions.Item>
        </Descriptions>
      </Card>
      <Feature id={id} />,
    </>
  );
};

export default Cloud;
