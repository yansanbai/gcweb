import {
  Form,
  Slider,
  Select,
  Collapse,
  Input,
  Radio,
  Space,
  Button,
  message,
  Switch,
} from "antd";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./index.module.scss";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17, offset: 1 },
};

const BoxPlugin = (props) => {
  const { scene } = props;
  const geoRef = useRef();

  useEffect(() => {
    if (scene) {
      const geo = new THREE.BoxGeometry(100, 100, 100);
      const edge = new THREE.EdgesGeometry(geo);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        linewidth: 10,
        linecap: "round",
        linejoin: "round",
      });
      const line = new THREE.LineSegments(edge, material);
      line.position.set(0, 0, 0);
      line.rotation.set(0, 0, 0);
      geoRef.current = line;
      // scene.current.add(line);
    }
  }, [scene]);

  const handleChange = (changeValues, allValues) => {
    const {
      xcenter,
      ycenter,
      zcenter,
      length,
      width,
      height,
      xrot,
      yrot,
      zrot,
    } = allValues;
    const nowPos = geoRef.current.position;
    const nowRot = geoRef.current.rotation;
    const nowWidth =
      geoRef.current.geometry.parameters.geometry.parameters.width;
    const nowHeight =
      geoRef.current.geometry.parameters.geometry.parameters.height;
    const nowLength =
      geoRef.current.geometry.parameters.geometry.parameters.depth;
    geoRef.current.position.set(
      xcenter || nowPos.x,
      ycenter || nowPos.y,
      zcenter || nowPos.z
    );
    geoRef.current.rotation.set(
      xrot || nowRot.x,
      yrot || nowRot.y,
      zrot || nowRot.z
    );
    geoRef.current.scale.set(
      (length || nowLength) / 100,
      (width || nowWidth) / 100,
      (height || nowHeight) / 100
    );
  };

  return (
    <>
      <Form
        {...layout}
        labelAlign="left"
        className={styles.boxForm}
        onValuesChange={handleChange}
      >
        <Form.Item label="显示" name="show" initialValue={0}>
          <Switch checked={false} />
        </Form.Item>
        <Form.Item label="x中心点" name="xcenter" initialValue={0}>
          <Slider min={-100} max={100} />
        </Form.Item>
        <Form.Item label="y中心点" name="ycenter" initialValue={0}>
          <Slider min={-100} max={100} />
        </Form.Item>
        <Form.Item label="z中心点" name="zcenter" initialValue={0}>
          <Slider min={-100} max={100} />
        </Form.Item>
        <Form.Item label="长度" name="length" initialValue={100}>
          <Slider min={0} max={100} />
        </Form.Item>
        <Form.Item label="宽度" name="width" initialValue={100}>
          <Slider min={0} max={100} />
        </Form.Item>
        <Form.Item label="高度" name="height" initialValue={100}>
          <Slider min={0} max={100} />
        </Form.Item>
        <Form.Item label="x轴旋转" name="xrot" initialValue={0}>
          <Slider min={0} max={6} />
        </Form.Item>
        <Form.Item label="y轴旋转" name="yrot" initialValue={0}>
          <Slider min={0} max={6} />
        </Form.Item>
        <Form.Item label="z轴旋转" name="zrot" initialValue={0}>
          <Slider min={0} max={6} />
        </Form.Item>
        <Form.Item label="" name="submit" wrapperCol={{ span: 24 }}>
          <div className={styles.colorbar}>
            <div />
            <Button type="primary">提交</Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default BoxPlugin;
