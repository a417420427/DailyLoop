# 每日打卡 APP 数据库设计文档

## 一、数据库选型
- **类型**：非关系型文档数据库 MongoDB
- **理由**：灵活的文档结构，便于存储用户习惯、打卡记录等动态数据，支持水平扩展。

---

## 二、主要数据模型设计

### 1. User（用户表）
| 字段名     | 类型       | 说明               | 备注                   |
|------------|------------|--------------------|------------------------|
| _id        | ObjectId   | 主键               | 自动生成               |
| openId     | string     | 微信唯一标识       | 小程序登录必需         |
| phone      | string     | 手机号             | 用于手机号登录         |
| nickname   | string     | 用户昵称           |                        |
| avatarUrl  | string     | 头像链接           |                        |
| createdAt  | Date       | 创建时间           |                        |
| updatedAt  | Date       | 更新时间           |                        |

---

### 2. Habit（习惯表）
| 字段名     | 类型       | 说明               | 备注                   |
|------------|------------|--------------------|------------------------|
| _id        | ObjectId   | 主键               | 自动生成               |
| userId     | ObjectId   | 所属用户ID         | 关联 User._id          |
| name       | string     | 习惯名称           |                        |
| icon       | string     | 图标（URL或名称）  |                        |
| frequency  | string     | 打卡频率           | 如“每天”、“每周三次”  |
| remindTime | string     | 提醒时间（HH:mm）  |                        |
| targetDays | number     | 目标天数           | 可为空，表示无限期     |
| createdAt  | Date       | 创建时间           |                        |
| updatedAt  | Date       | 更新时间           |                        |

---

### 3. CheckInRecord（打卡记录表）
| 字段名     | 类型       | 说明               | 备注                   |
|------------|------------|--------------------|------------------------|
| _id        | ObjectId   | 主键               | 自动生成               |
| habitId    | ObjectId   | 关联习惯ID         | 关联 Habit._id         |
| userId     | ObjectId   | 关联用户ID         | 关联 User._id          |
| date       | Date       | 打卡日期           | 仅日期部分有效         |
| content    | string     | 备注内容           | 可为空                 |
| photoUrl   | string     | 打卡照片链接       | 可为空                 |
| createdAt  | Date       | 创建时间           |                        |

---

## 三、关系说明

- 一个用户（User）可以有多个习惯（Habit），一对多关系
- 一个习惯（Habit）对应多条打卡记录（CheckInRecord），一对多关系
- 打卡记录同时关联用户和习惯，方便查询

---

## 四、索引设计建议

- User：`openId`、`phone` 建立唯一索引，加速登录查询
- Habit：`userId` 建立索引，快速获取用户所有习惯
- CheckInRecord：`habitId` 和 `date` 联合索引，用于快速查询每日打卡状态

---

## 五、示例数据结构（JSON）

```json
{
  "User": {
    "_id": "ObjectId('...')",
    "openId": "o123456789",
    "phone": "13800138000",
    "nickname": "张三",
    "avatarUrl": "https://example.com/avatar.jpg",
    "createdAt": "2025-06-15T10:00:00Z",
    "updatedAt": "2025-06-15T10:00:00Z"
  },
  "Habit": {
    "_id": "ObjectId('...')",
    "userId": "ObjectId('...')",
    "name": "晨跑",
    "icon": "run_icon",
    "frequency": "每天",
    "remindTime": "07:00",
    "targetDays": 30,
    "createdAt": "2025-06-15T10:00:00Z",
    "updatedAt": "2025-06-15T10:00:00Z"
  },
  "CheckInRecord": {
    "_id": "ObjectId('...')",
    "habitId": "ObjectId('...')",
    "userId": "ObjectId('...')",
    "date": "2025-06-15T00:00:00Z",
    "content": "今天跑了5公里",
    "photoUrl": "https://example.com/photo.jpg",
    "createdAt": "2025-06-15T07:15:00Z"
  }
}
