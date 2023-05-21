import { Form, Slider, Select, Collapse } from "antd";

const PointPlugin = (props) => {
  const { material } = props;

  const handleSizeChange = (value) => {
    material.current.size = value;
  };

  const handleShapeChange = (value) => {
    const textureLoader = new THREE.TextureLoader();
    const loadTexture = textureLoader.load(`/images/${value}.png`);
    material.current.map = loadTexture;
  };

  return (
    <Form labelAlign="left">
      <Form.Item label="点大小" name="size">
        <Slider min={0.1} max={2} onChange={handleSizeChange} />
      </Form.Item>
      <Form.Item label="点标记" name="shape" initialValue="square">
        <Select
          options={[
            { label: "square", value: "square" },
            { label: "circle", value: "circle" },
          ]}
          onChange={handleShapeChange}
        />
      </Form.Item>
    </Form>
  );
};

export default PointPlugin;
