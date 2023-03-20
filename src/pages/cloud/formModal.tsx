import React, { useState, forwardRef, useImperativeHandle } from "react";
import { request } from "ice";
import { useRequest } from "@ice/plugin-request/hooks";
import {
  PageHeader,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import type { UploadProps } from "antd";
import { PlusOutlined, RedoOutlined, InboxOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

export interface IRef {
  show: (mode: string) => void;
}
interface IProps {}

const { Dragger } = Upload;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const formModal = forwardRef<IRef, IProps>((props, ref) => {
  const [record, setRecord] = useState({});
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [field] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      show: (r) => {
        if (r?.name) {
          setRecord(r);
          field.setFieldsValue(r);
        } else {
          setRecord({});
        }
        setVisible(true);
      },
    };
  });

  const upProps: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("name", field.getFieldValue("name"));
    formData.append("description", field.getFieldValue("description"));
    formData.append("file", file);
    request.post("/api/pointCloud/upload", formData);
    setVisible(false);
    setFile(null);
    setRecord({});
  };

  const text = record?.name ? "编辑" : "上传";
  return (
    <Modal
      open={visible}
      title={`${text}点云`}
      okText="提交"
      width={800}
      onOk={handleSubmit}
      onCancel={() => {
        setVisible(false);
        setFile(null);
        setRecord({});
      }}
    >
      <Form {...layout} form={field}>
        <Form.Item
          label="点云名称"
          name="name"
          required
          rules={[{ required: true, message: "请输入名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="点云描述" name="description">
          <Input.TextArea />
        </Form.Item>
        {record?.name ? null : (
          <Form.Item label="点云文件" name="file" required>
            <Dragger {...upProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击此处或拖拽文件上传</p>
              <p className="ant-upload-hint">仅支持上传...格式文件</p>
            </Dragger>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
});

export default formModal;
