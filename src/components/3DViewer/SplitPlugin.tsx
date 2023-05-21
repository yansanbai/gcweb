import {
  Form,
  Slider,
  Select,
  Collapse,
  Alert,
  Button,
  Tag,
  Table,
  List,
  Modal,
  Input,
} from "antd";
import * as THREE from "three";
import { useEffect, useState } from "react";
import ThreeView from "./saveViewer";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import PointPlugin from "@/components/3DViewer/PointPlugin";
import styles from "./index.module.scss";

const SplitPlugin = (props) => {
  const { material, scene, camera, points } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (camera) {
      window.addEventListener("click", onClick);
    }
  }, [camera, scene]);

  const onClick = (e) => {
    const mouse = {
      x: (e.offsetX / 1600) * 2 - 1,
      y: -(e.offsetY / 900) * 2 + 1,
    };
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera.current);
    //射线和模型求交，选中一系列点
    var intersects = raycaster.intersectObjects(scene.current.children);
    if (intersects.length > 0) {
      const index = intersects[0].index;
      // 第一个点的位置和颜色

      const pos = intersects[0].object.geometry.attributes.position.array.slice(
        index * 3,
        index * 3 + 3
      );
      const color = intersects[0].object.geometry.attributes.color.array.slice(
        index * 3,
        index * 3 + 3
      );
      // //第一个点的颜色
      // const selectedColor = [
      //   intersects[0].object.geometry.attributes.color.array[
      //     intersects[0].index * 3
      //   ],
      //   intersects[0].object.geometry.attributes.color.array[
      //     intersects[0].index * 3 + 1
      //   ],
      //   intersects[0].object.geometry.attributes.color.array[
      //     intersects[0].index * 3 + 2
      //   ],
      // ];
      // points.current.geometry.attributes.color.array.forEach((col, index) => {
      //   if (
      //     col ===
      //     intersects[0].object.geometry.attributes.color.array[
      //       intersects[0].index * 3
      //     ]
      //   ) {
      //     points.current.geometry.attributes.color.array[index] = 1;
      //   } else if (
      //     col ===
      //     intersects[0].object.geometry.attributes.color.array[
      //       intersects[0].index * 3 + 1
      //     ]
      //   ) {
      //     points.current.geometry.attributes.color.array[index] = 0;
      //   } else if (
      //     col ===
      //     intersects[0].object.geometry.attributes.color.array[
      //       intersects[0].index * 3 + 2
      //     ]
      //   ) {
      //     points.current.geometry.attributes.color.array[index] = 0;
      //   }
      // });
      // points.current.geometry.attributes.color = new THREE.BufferAttribute(
      //   new Float32Array(points.current.geometry.attributes.color.array),
      //   3
      // );
    }
  };

  const data = [
    {
      color: "#ff7f30",
      point: "(-0.47, 17.29, -5.03)",
      show: true,
    },
    {
      color: "#4b2382",
      point: "(0.84, 21.07, -4.78)",
      show: true,
    },
    {
      color: "#6c92ce",
      point: "(0.84, 21.07, 3.26)",
      show: true,
    },
    {
      color: "#53b84f",
      point: "(3.22, 16.78, 3.04)",
      show: true,
    },
  ];

  const loadFile = (func) => {
    const loader = new PLYLoader();
    loader.load("/rock.ply", (model) => {
      const material = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.1,
      });
      const points = new THREE.Points(model, material);
      func(material, points);
    });
  };

  return (
    <>
      <Button type="primary" style={{ marginRight: 16, marginBottom: 16 }}>
        开始选择
      </Button>
      <List
        size="small"
        header={<div>已选择区域</div>}
        footer={
          <>
            <Button
              style={{ marginRight: 16 }}
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >
              保存
            </Button>
            <Button>还原</Button>
          </>
        }
        bordered
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            className={styles.listItem}
            actions={[
              <a key="show">{item.show ? "隐藏" : "显示"}</a>,
              <a key="delete">删除</a>,
            ]}
          >
            <div>
              <Tag color={item.color}>{index + 1}</Tag>
              <span>{item.point}</span>
            </div>
            <div></div>
          </List.Item>
        )}
      />
      <Modal
        open={visible}
        title="保存"
        width={1500}
        onCancel={() => {
          setVisible(false);
        }}
        okText="提交"
      >
        <ThreeView
          loadFile={loadFile}
          plugins={[]}
          defaultActiveKey={["split"]}
        />
      </Modal>
    </>
  );
};

export default SplitPlugin;
