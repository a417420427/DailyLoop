
# 每日打卡 APP 技术架构设计文档

## 一、系统总体架构

本系统采用前后端分离架构，前端基于多端统一框架 Taro，后端基于 Node.js + TypeScript 实现 RESTful API。前端支持微信小程序、H5 和原生 App，后端提供统一接口服务。数据库采用 MongoDB 进行数据存储。

```
用户设备（微信小程序 / App / H5）
        ↓
       前端 (Taro + React + TypeScript)
        ↓
       网络请求（RESTful API）
        ↓
       后端 (Node.js + TypeScript + Express/Koa)
        ↓
       数据库 (MongoDB)
```

---

## 二、前端架构设计

### 1. 技术栈
- **框架**：Taro + React + TypeScript
- **UI 组件库**：NutUI-Taro 或自定义组件
- **状态管理**：Recoil 或 Redux Toolkit
- **网络请求**：封装统一 API 模块，支持请求拦截和错误处理
- **数据缓存**：Taro 本地存储（Taro.setStorage / getStorage）

### 2. 目录结构示例
```
src/
├── pages/               // 页面模块
│   ├── home             // 首页/打卡
│   ├── habit            // 习惯管理
│   ├── calendar         // 打卡统计
│   └── profile          // 用户信息
├── components/          // 公共组件
├── stores/              // 状态管理逻辑
├── api/                 // API 请求封装
├── utils/               // 工具函数
└── types/               // 类型定义
```

### 3. 核心功能流程
- 用户登录授权，获取 token 并存储
- 习惯的新增、编辑、删除操作
- 每日打卡数据提交及状态刷新
- 本地缓存提醒设置，配合服务器推送

---

## 三、后端架构设计

### 1. 技术栈
- **语言**：TypeScript
- **框架**：Node.js + Express 或 Koa
- **数据库**：MongoDB，使用 Typegoose 提供类型安全的模型定义
- **认证**：JWT Token 认证机制
- **接口规范**：RESTful API
- **日志**：winston 或类似日志库

### 2. 目录结构示例
```
server/
├── models/              // 数据模型定义（Typegoose）
├── controllers/         // 业务逻辑处理
├── routes/              // API 路由定义
├── middlewares/         // 中间件（鉴权、日志、错误处理）
├── utils/               // 工具函数
├── config/              // 配置文件（数据库、JWT密钥等）
└── index.ts             // 应用入口
```

### 3. 核心模块
- **用户管理**：注册、登录、鉴权、用户信息维护
- **习惯管理**：习惯的增删改查
- **打卡记录**：打卡数据的创建与查询
- **统计分析**：计算连续打卡天数、总打卡次数等
- **推送服务**：定时消息推送接口（结合微信订阅消息和第三方推送）

---

## 四、数据库设计

### 1. 数据库类型
MongoDB，非关系型文档数据库，灵活支持复杂数据结构。

### 2. 主要数据模型

| 模型名         | 说明             |
| -------------- | ---------------- |
| User           | 用户信息         |
| Habit          | 打卡习惯         |
| CheckInRecord  | 打卡记录         |

### 3. 关系说明
- User 与 Habit 一对多
- Habit 与 CheckInRecord 一对多

---

## 五、推送与通知设计

### 1. 小程序推送
- 微信订阅消息 API，定时提醒用户打卡

### 2. App 推送
- Firebase Cloud Messaging (FCM) 或 极光推送

### 3. 本地提醒
- 使用 Taro 本地推送插件或原生通知实现

---

## 六、部署架构

### 1. 前端
- 小程序通过微信公众平台发布
- App 使用 Taro 编译后，分别打包 Android/iOS 发布

### 2. 后端
- 部署在云服务器或云函数（Render、Railway、腾讯云等）
- 使用 PM2 进程管理，结合 Nginx 反向代理

### 3. 数据库
- MongoDB Atlas 云服务，保证高可用和备份

---

## 七、安全设计

- 所有接口采用 HTTPS 传输
- 用户身份采用 JWT 认证，Token 过期自动刷新机制
- 数据库操作严格校验，避免注入风险
- 服务器限流、防刷机制

---

## 八、扩展性设计

- 后端接口设计遵循 RESTful 标准，方便未来升级和多平台支持
- 前端模块化组件设计，易于维护和扩展
- 预留社交分享和好友互动接口，后续迭代快速接入

---
