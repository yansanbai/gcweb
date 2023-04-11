// 模拟数据
export default {
  // 点云列表
  "GET /list": {
    success: true,
    data: [
      {
        id: 1,
        name: "测试case1",
        description: "测试点云功能",
        gmtCreate: "2023-3-20 10:23:40",
      },
      {
        id: 2,
        name: "拙政园点云",
        description: "网上资源",
        gmtCreate: "2023-3-23 13:10:26",
      },
    ],
  },
  "GET /cloud/detail": {
    success: true,
    data: {
      id: 1,
      name: "测试case1",
      description: "测试点云功能",
      gmtCreate: "2023-3-20 10:23:40",
    }
  },
  "GET /cloud/feature/detail": {
    success: true,
    data: {
      id: 1,
      name: "特征集1",
      description: "测试点云功能",
      gmtCreate: "2023-3-20 10:23:40",
    }
  },
};
