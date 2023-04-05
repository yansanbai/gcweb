import React, { useEffect, useState } from "react";
import { request, history, useParams } from "ice";
import { CameraOutlined } from "@ant-design/icons";
import { Descriptions, Tag, Card, PageHeader, Button, Tabs } from "antd";
import { itemRender } from "@/utils";
import styles from "./index.module.scss";
import Analysis from "@/pages/cloud/components/analysislist";

const FeatureDetail = (props) => {
  const params = useParams();
  const { id, featureId } = params;
  if (!id) {
    return null;
  }

  const [detail, setDetail] = useState({});
  const [featureDetail, setFeatureDetail] = useState({});

  const init = async () => {
    const [res1, res2] = await Promise.all([
      request.get(`/cloud/detail?id=${id}`),
      request.get(`/cloud/feature/detail?id=${featureId}`),
    ]);
    if (res1?.success) {
      setDetail(res1?.data);
    }
    if (res2?.success) {
      setFeatureDetail(res2?.data);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const routes = [
    {
      path: "/index",
      breadcrumbName: "首页",
    },
    {
      path: `/cloud/list`,
      breadcrumbName: "点云列表",
    },
    {
      path: `/cloud/${id}`,
      breadcrumbName: `${detail?.name}`,
    },
    {
      breadcrumbName: `${featureDetail?.name}`,
    },
  ];

  return (
    <>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
      />
      <Card className={styles.card}>
        <Descriptions
          title={
            <div className={styles.operation}>
              <div className={styles.title}>
                {featureDetail?.name}
                <Tag style={{ borderRadius: 4 }}>{featureDetail?.id}</Tag>
              </div>
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    history.push(`/cloud/${id}/feature/${featureId}/view`);
                  }}
                >
                  <CameraOutlined />
                  三维展示
                </Button>
              </div>
            </div>
          }
          column={2}
        >
          <Descriptions.Item label="点云">测试case1</Descriptions.Item>
          <Descriptions.Item label="文件大小">10G</Descriptions.Item>
          <Descriptions.Item label="提取算法">算法1</Descriptions.Item>
          <Descriptions.Item label="特征维度">5</Descriptions.Item>
          <Descriptions.Item label="提取开始时间">
            2023-03-21 16:45:58
          </Descriptions.Item>
          <Descriptions.Item label="提取结束时间">
            2023-03-22 16:45:58
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Analysis id={id} />,
    </>
  );
};

export default FeatureDetail;
