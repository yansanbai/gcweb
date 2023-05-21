import { Form, Slider, Select, Collapse, Button } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17, offset: 1 },
};

const CameraPlugin = (props) => {
  const { material, camera } = props;

  const { x: xpos, y: ypos, z: zpos } = camera?.current?.position || {};
  const { x: xro, y: yro, z: zro } = camera?.current?.rotation || {};
  const postext = `X : ${Number(xpos).toFixed(2)}  Y : ${Number(ypos).toFixed(
    2
  )}  Z : ${Number(zpos).toFixed(2)}`;
  const rotext = `X : ${Number(xro).toFixed(2)}  Y : ${Number(yro).toFixed(
    2
  )}  Z : ${Number(zro).toFixed(2)}`;

  return (
    <>
      <Form {...layout} labelAlign="left">
        <Form.Item label="位置" name="pos">
          {postext}
        </Form.Item>
        <Form.Item label="欧拉角" name="eular">
          {rotext}
        </Form.Item>
      </Form>
      <Button type="primary" style={{ marginRight: 16 }}>
        保存相机姿态
      </Button>
      <Button>还原相机姿态</Button>
    </>
  );
};

export default CameraPlugin;
