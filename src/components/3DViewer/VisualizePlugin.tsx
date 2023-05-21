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
} from "antd";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./index.module.scss";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17, offset: 1 },
};

const VisualizePlugin = (props) => {
  const { info, points } = props;
  const { dimension = 5, file = "/test.json" } = info || {};
  const [form] = Form.useForm();
  const testColorBar = useRef([]);

  useEffect(() => {
    const cv = document.getElementById("cv");
    if (!cv) {
      return;
    }
    const ctx = cv.getContext("2d");
    for (var i = 0; i <= 255; i++) {
      ctx.beginPath();
      var color = "rgb(100, " + i + ", " + i + ")";
      ctx.fillStyle = color;
      ctx.fillRect(i * 0.5, 0, 0.5, 200);
      testColorBar.current.push([100, i, i]);
    }
    cv.onclick = function (e) {
      var x = e.offsetX, // mouse x
        y = e.offsetY, // mouse y
        p = ctx.getImageData(x, y, 1, 1),
        x = p.data; // pixel at mouse (x, y) - contains [r, g, b, a]
      alert("Color: rgb(" + x[0] + ", " + x[1] + ", " + x[2] + ")");
    };
  }, []);

  const findColor = (colorbar, min, max, v) => {
    const percent = (v - min) / (max - min);
    const pos = Math.floor(testColorBar.current.length * percent);
    return testColorBar.current[pos === 0 ? 0 : pos - 1];
  };

  const getValue = (item, type, dimension, anchor) => {
    switch (Number(type)) {
      case 1:
        return item[5 + Number(dimension)];
      case 2:
        return item[5 + Number(dimension)] - anchor;
      case 3:
        return (
          dimension.reduce((total, value) => {
            return total + item[value];
          }, 0) / dimension.length
        );
    }
  };

  const handleConfirm = () => {
    form
      .validateFields()
      .then((values) => {
        const { dimension, colorbar, single, mutiple, anchor } = values;
        // 确定可视化类型及维度
        let type = 1;
        let dim = [];
        if (dimension.indexOf("-") < 0) {
          type = single;
          dim = [Number(dimension)];
        } else {
          type = mutiple;
          const mark = dimension.split("-");
          for (let i = mark[0]; i <= mark[1]; i++) {
            dim.push(i);
          }
        }
        fetch(file) // 加载特征文件
          .then((response) => response.json())
          .then((json) => {
            const array = [];
            let min = getValue(json?.data?.[0], type, dim, anchor);
            let max = getValue(json?.data?.[0], type, dim, anchor);
            // 获取不同可视化类型下的特征数值
            json?.data.forEach((item) => {
              const value = getValue(item, type, dim, anchor);
              array.push(value);
              if (value < min) {
                min = value;
              }
              if (value > max) {
                max = value;
              }
            });
            let colors = [];
            console.log(min, max, array);
            array.forEach((feature) => {
              const color = findColor(colorbar, min, max, feature);
              colors.push(color[0] / 255);
              colors.push(color[1] / 255);
              colors.push(color[2] / 255);
            });
            if (points.geometry.attributes) {
              points.geometry.attributes.color = new THREE.BufferAttribute(
                new Float32Array(colors),
                3
              );
            }
          });
      })
      .catch((err) => {
        return;
      });
  };

  const handleChange = (changeValues) => {
    const { single, mutiple } = changeValues;
    if (single) {
      form.setFieldValue("mutiple", undefined);
    }
    if (mutiple) {
      form.setFieldValue("single", undefined);
    }
  };

  return (
    <Form
      {...layout}
      labelAlign="left"
      form={form}
      onValuesChange={handleChange}
    >
      <Form.Item label="描述子维度" name="feature">
        {dimension}
      </Form.Item>
      <Form.Item label="可视化维度" name="dimension">
        <Input placeholder="示例: 1, 1-3" />
      </Form.Item>
      <Form.Item label="colorbar" name="colorbar">
        <div className={styles.colorbar}>
          <canvas id="cv" width={127.5} height={25} />
          <Button>更多</Button>
        </div>
      </Form.Item>
      <Form.Item
        label="可视化方式"
        name="type"
        labelCol={{ span: 10 }}
      ></Form.Item>
      <Form.Item label="单维" name="single">
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>直接</Radio>
            <Radio value={2}>特征区别</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="多维" name="mutiple">
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={3}>平均</Radio>
            <Radio value={4}>模长</Radio>
            <Radio value={5}>特征区别</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="设置锚点" name="anchor">
        <Input placeholder="输入点索引1-3000000" />
      </Form.Item>
      <Form.Item label="" name="submit" wrapperCol={{ span: 24 }}>
        <div className={styles.colorbar}>
          <div />
          <Button onClick={handleConfirm}>确认</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default VisualizePlugin;
