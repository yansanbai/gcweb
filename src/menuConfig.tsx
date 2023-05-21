import {
  TableOutlined,
  WarningOutlined,
  FormOutlined,
  DashboardOutlined,
  CloudOutlined,
  DatabaseOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import type { MenuDataItem } from "@ant-design/pro-layout";

const asideMenuConfig: MenuDataItem[] = [
  {
    name: "点云",
    path: "/cloud/list",
    icon: <CloudOutlined />,
  },
  {
    name: "模型",
    path: "/model/list",
    icon: <DatabaseOutlined />,
  },
];

export { asideMenuConfig };
