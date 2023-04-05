import React, { useEffect, useState } from "react";
import { request, history, useParams } from "ice";
import { CameraOutlined } from "@ant-design/icons";
import { Descriptions, Tag, Card, PageHeader, Button, Tabs } from "antd";
import Feature from "../components/featurelist";
import { itemRender } from "@/utils";
import styles from "./index.module.scss";

const Cloud = (props) => {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return null;
  }

  const [detail, setDetail] = useState({});

  const init = async () => {
    const [res1] = await Promise.all([request.get(`/cloud/detail?id=${id}`)]);
    if (res1?.success) {
      setDetail(res1?.data);
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
      breadcrumbName: `${detail?.name}`,
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
                {detail?.name}
                <Tag style={{ borderRadius: 4 }}>{detail?.id}</Tag>
              </div>
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    history.push(`/cloud/${id}/view`);
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
          <Descriptions.Item label="上传人">雁三白</Descriptions.Item>
          <Descriptions.Item label="上传时间">
            2023-3-20 10:23:44
          </Descriptions.Item>
          <Descriptions.Item label="点数">18000</Descriptions.Item>
          <Descriptions.Item label="文件大小">10G</Descriptions.Item>
          <Descriptions.Item label="描述">
            这是一个测试点云,不是真实园林模型,请勿随意使用
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Feature id={id} />,
    </>
  );
};

export default Cloud;
