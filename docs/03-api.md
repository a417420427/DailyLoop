
# API 接口文档

## 1. 用户相关接口

### 1.1 用户登录
- **接口地址**：`POST /api/auth/login`
- **描述**：用户使用微信授权或手机号验证码登录
- **请求参数**：

| 参数       | 类型   | 必填 | 说明                  |
| ---------- | ------ | ---- | --------------------- |
| type       | string | 是   | 登录类型，wechat 或 phone |
| code       | string | 微信登录时必填 | 微信登录临时凭证          |
| phone      | string | 手机号登录时必填 | 用户手机号                |
| verifyCode | string | 手机号登录时必填 | 验证码                  |

- **响应示例**：

```json
{
  "success": true,
  "data": {
    "userId": "123456",
    "token": "jwt-token-string"
  }
}
```

---

## 2. 打卡习惯管理

### 2.1 新增习惯
- **接口地址**：`POST /api/habits`
- **描述**：创建新的打卡习惯
- **请求头**：
  - Authorization: Bearer token
- **请求参数**：

| 参数       | 类型   | 必填 | 说明             |
| ---------- | ------ | ---- | ---------------- |
| name       | string | 是   | 习惯名称         |
| icon       | string | 否   | 习惯图标URL      |
| frequency  | string | 是   | 打卡周期（日/周/月） |
| remindTime | string | 否   | 提醒时间（HH:mm） |

- **响应示例**：

```json
{
  "success": true,
  "data": {
    "habitId": "hab123"
  }
}
```

### 2.2 获取习惯列表
- **接口地址**：`GET /api/habits`
- **描述**：获取当前用户所有打卡习惯
- **请求头**：
  - Authorization: Bearer token
- **响应示例**：

```json
{
  "success": true,
  "data": [
    {
      "habitId": "hab123",
      "name": "早起",
      "icon": "http://example.com/icon.png",
      "frequency": "daily",
      "remindTime": "07:00"
    }
  ]
}
```

---

## 3. 打卡记录相关

### 3.1 打卡
- **接口地址**：`POST /api/checkins`
- **描述**：提交当日打卡
- **请求头**：
  - Authorization: Bearer token
- **请求参数**：

| 参数     | 类型   | 必填 | 说明                  |
| -------- | ------ | ---- | --------------------- |
| habitId  | string | 是   | 打卡习惯ID            |
| date     | string | 否   | 打卡日期（默认当天，格式 YYYY-MM-DD） |
| content  | string | 否   | 文字备注              |
| photoUrl | string | 否   | 打卡照片URL           |

- **响应示例**：

```json
{
  "success": true,
  "message": "打卡成功"
}
```

### 3.2 获取打卡记录
- **接口地址**：`GET /api/checkins?habitId={habitId}&month={YYYY-MM}`
- **描述**：获取指定习惯某月的打卡记录
- **请求头**：
  - Authorization: Bearer token
- **响应示例**：

```json
{
  "success": true,
  "data": [
    {
      "date": "2025-06-01",
      "content": "早起锻炼",
      "photoUrl": "http://example.com/photo1.jpg"
    },
    {
      "date": "2025-06-02"
    }
  ]
}
```

---

## 4. 统计数据接口

### 4.1 获取打卡统计
- **接口地址**：`GET /api/statistics?habitId={habitId}`
- **描述**：获取指定习惯的统计数据，如连续打卡天数、总打卡次数
- **请求头**：
  - Authorization: Bearer token
- **响应示例**：

```json
{
  "success": true,
  "data": {
    "totalCheckIns": 45,
    "consecutiveDays": 10
  }
}
```

---

## 5. 备注

- 所有接口均采用 JSON 格式请求和响应
- 需要用户登录的接口必须在请求头中携带 `Authorization` 字段，格式为 `Bearer {token}`
- 时间格式均采用 ISO 8601 标准，日期格式为 `YYYY-MM-DD`
