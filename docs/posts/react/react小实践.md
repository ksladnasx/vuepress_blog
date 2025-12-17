---
date: 2025-12-11
category:
  - 项目笔记
tag:
  - React
  - TypeScript

---

# React 入门实战案例

用户列表管理（对比 Vue3 核心差异 + 网络请求）

这个案例是「用户列表管理」（包含**列表展示、关键词筛选、分页、新增 / 删除用户**），复杂度适中，能覆盖 React 与 Vue3 核心差异，且重点体现 React 网络请求的写法。全程用 TS + React Hooks，对比 Vue3 逐点标注差异，帮你快速掌握核心区别。

## 一、案例准备

### 1. 环境（和 Vue3 一致，快速过）

```bash
# 创建 React+TS 项目（类比 Vue3 + Vite）
npm create vite@latest react-user-list -- --template react-ts
cd react-user-list && npm i && npm i axios antd # 安装axios（网络请求）、antd（UI组件，类比Element Plus）
npm run dev
```

### 2. 模拟 API（新建 src/api/user.ts，类比 Vue3 的 api 文件夹）

```typescript
import axios from 'axios';

// 定义用户类型（类比 Vue3 中的 interface）
export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

// 模拟分页请求参数
export interface UserListParams {
  keyword?: string; // 筛选关键词
  page: number;     // 页码
  pageSize: number; // 页大小
}

// 模拟响应格式
interface UserListResponse {
  list: User[];
  total: number;
}

// 1. 获取用户列表（模拟网络请求）
export const getUserList = async (params: UserListParams): Promise<UserListResponse> => {
  // 模拟接口延迟（真实项目去掉）
  await new Promise(resolve => setTimeout(resolve, 500));
  // 模拟数据（真实项目替换为 axios.get 真实接口）
  const mockList: User[] = [
    { id: 1, name: '张三', age: 20, email: 'zhangsan@test.com' },
    { id: 2, name: '李四', age: 25, email: 'lisi@test.com' },
    { id: 3, name: '王五', age: 30, email: 'wangwu@test.com' },
  ];
  // 模拟关键词筛选
  const filteredList = mockList.filter(user => 
    user.name.includes(params.keyword || '') || user.email.includes(params.keyword || '')
  );
  return {
    list: filteredList,
    total: filteredList.length,
  };
};

// 2. 新增用户（模拟 POST 请求）
export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { id: Date.now(), ...user }; // 用时间戳模拟 ID
};

// 3. 删除用户（模拟 DELETE 请求）
export const deleteUser = async (id: number): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};
```

## 二、核心组件：UserList.tsx

这个组件是核心，包含**状态管理、网络请求、列表渲染、交互逻辑**，每处和 Vue3 不同的地方都标注清楚。

```tsx
import { useState, useEffect, useCallback } from 'react';
import { Button, Input, Table, Modal, Form, message, Pagination } from 'antd';
import { getUserList, addUser, deleteUser, User, UserListParams } from './api/user';

// React 函数组件 = Vue3 setup + template 合体（核心差异1）
const UserList = () => {
  // ========== 1. 状态管理（对比 Vue3 ref/reactive） ==========
  // React 用 useState 管理单个状态（类比 Vue3 ref），无 reactive 等价物（可通过 useState<对象> 模拟）
  // 核心差异2：React 状态是「不可变的」，必须通过 setXxx 替换，不能直接修改（Vue3 可直接改 ref.value/reactive 对象）
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [userList, setUserList] = useState<User[]>([]); // 用户列表
  const [total, setTotal] = useState<number>(0); // 总条数
  const [searchParams, setSearchParams] = useState<UserListParams>({
    keyword: '',
    page: 1,
    pageSize: 10,
  });
  // 新增用户弹窗状态
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // 表单实例（AntD 表单，类比 Element Plus FormInstance）
  const [form] = Form.useForm();

  // ========== 2. 网络请求（React 网络请求核心：useEffect + 异步函数） ==========
  // 核心差异3：React 无「生命周期钩子」，用 useEffect 替代（类比 Vue3 onMounted + watch）
  // 依赖数组 = 触发条件：searchParams 变化时重新请求（类比 Vue3 watch(searchParams, () => {}, {immediate: true})）
  const fetchUserList = useCallback(async () => {
    setLoading(true);
    try {
      // React 网络请求：异步函数 + try/catch 处理错误（和 Vue3 逻辑一致，但触发时机不同）
      const res = await getUserList(searchParams);
      setUserList(res.list);
      setTotal(res.total);
      setLoading(false);
    } catch (error) {
      console.error('请求用户列表失败：', error);
      message.error('请求用户列表失败');
      setLoading(false);
    }
  }, [searchParams]); // 依赖 searchParams，变化时重新创建函数

  // 页面挂载时执行一次，searchParams 变化时重新执行（类比 Vue3 onMounted + watch）
  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]); // 依赖 fetchUserList（因 fetchUserList 用 useCallback 缓存，仅 searchParams 变时更新）

  // ========== 3. 交互逻辑（对比 Vue3 事件处理） ==========
  // 核心差异4：React 事件名是驼峰（onClick/onChange），Vue3 是短横线（@click/@change）
  // 核心差异5：React 无 v-model，表单用「受控组件」（value + onChange 绑定）

  // 关键词筛选（Input 受控组件，类比 Vue3 <input v-model="searchParams.keyword" />）
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({
      ...prev,
      keyword: e.target.value,
      page: 1, // 筛选后重置页码
    }));
  };

  // 分页变化（类比 Vue3 Pagination 组件的 @change 事件）
  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams(prev => ({
      ...prev,
      page,
      pageSize,
    }));
  };

  // 新增用户
  const handleAddUser = async () => {
    try {
      // 表单验证（类比 Vue3 form.validate()）
      const values = await form.validateFields();
      // 调用新增接口
      const newUser = await addUser(values);
      // React 修改数组状态：必须创建新数组（不可变），Vue3 可直接 push
      setUserList(prev => [...prev, newUser]);
      setModalVisible(false);
      form.resetFields();
      message.success('新增用户成功');
    } catch (error) {
      console.error('新增用户失败：', error);
      message.error('新增用户失败');
    }
  };

  // 删除用户
  const handleDeleteUser = useCallback(async (id: number) => {
    try {
      await deleteUser(id);
      // React 修改数组：过滤出不等于当前 id 的项（创建新数组），Vue3 可直接 splice
      setUserList(prev => prev.filter(user => user.id !== id));
      message.success('删除用户成功');
    } catch (error) {
      console.error('删除用户失败：', error);
      message.error('删除用户失败');
    }
  }, []);

  // ========== 4. 渲染逻辑（JSX vs Vue3 模板） ==========
  // 核心差异6：React 无 v-for/v-if，用 JS 逻辑（map/三元表达式）实现；Vue3 用指令
  // 核心差异7：JSX 必须有唯一根节点（用 <> 空标签，类比 Vue3 <template>）
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      key: 'action',
      // React 列渲染：直接写 JSX 逻辑，Vue3 用 slot-scope
      render: (_, record: User) => (
        <Button danger onClick={() => handleDeleteUser(record.id)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {/* 筛选栏 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {/* 受控输入框：value 绑定状态，onChange 更新状态（类比 Vue3 v-model） */}
        <Input
          placeholder="输入姓名/邮箱筛选"
          value={searchParams.keyword}
          onChange={handleKeywordChange}
          style={{ width: '300px' }}
        />
        <Button type="primary" onClick={() => setModalVisible(true)}>
          新增用户
        </Button>
      </div>

      {/* 用户列表（Table 组件，类比 Element Plus Table） */}
      <Table
        columns={columns}
        dataSource={userList}
        rowKey="id"
        loading={loading}
        pagination={false} // 关闭内置分页，自定义
      />

      {/* 分页组件 */}
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Pagination
          current={searchParams.page}
          pageSize={searchParams.pageSize}
          total={total}
          onChange={handlePageChange}
        />
      </div>

      {/* 新增用户弹窗（Modal 组件，类比 Element Plus Dialog） */}
      <Modal
        title="新增用户"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleAddUser}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
```

### 3. 入口组件：App.tsx

```tsx
import UserList from './UserList';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <UserList />
    </ConfigProvider>
  );
}

export default App;
```

## 三、React vs Vue3 核心差异

| 特性              | React（本案例）                         | Vue3                                        |
| ----------------- | --------------------------------------- | ------------------------------------------- |
| 组件写法          | 函数组件 + JSX（逻辑与 UI 融合）        | 单文件组件 .vue（模板 / 逻辑 / 样式分离）   |
| 状态管理          | useState（不可变，必须 setXxx 替换）    | ref/reactive（可变，直接修改 .value/ 属性） |
| 副作用 / 生命周期 | useEffect（依赖数组控制执行时机）       | onMounted/onUpdated + watch（指令式）       |
| 表单处理          | 受控组件（value + onChange 绑定）       | v-model（语法糖，自动绑定）                 |
| 列表 / 条件渲染   | JS 逻辑（map / 三元表达式）             | v-for/v-if 指令                             |
| 事件处理          | 驼峰命名（onClick/onChange）            | 短横线命名（@click/@change）                |
| 数组修改          | 必须创建新数组（[...prev, newItem]）    | 可直接修改（push/splice）                   |
| 网络请求触发      | useEffect + useCallback（依赖变化触发） | setup 中直接调用 + watch（监听参数变化）    |

## 四、React 网络请求核心要点

1. **触发时机**：
   - Vue3：可在 `onMounted` 中直接请求，或用 `watch` 监听参数变化重新请求；
   - React：必须用 `useEffect` 包裹请求逻辑，依赖数组控制「何时执行」（空数组 = 仅挂载时执行，类比 `onMounted`）。
2. **异步处理**：
   - 两者都用 `async/await + try/catch`，但 React 中异步函数不能直接写在 `useEffect` 里（需封装成单独函数）；
   - React 需用 `useCallback` 缓存请求函数，避免因函数重新创建导致 `useEffect` 重复执行。
3. **状态更新**：
   - Vue3：请求结果可直接赋值给 `reactive` 对象；
   - React：必须通过 `setXxx` 更新状态，且数组 / 对象需遵循「不可变原则」（创建新值，不修改旧值）。