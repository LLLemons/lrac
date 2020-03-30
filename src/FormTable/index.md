---
title: 'FormTable'
nav:
  title: 组件
  path: /components
---

```tsx
/**
 * title: 基本用法
 * desc: 带搜索的Table，form，数据源均由外部传入
 */

import React from 'react';
import Demo from './../FormTable/demo/demo1.tsx';

export default () => <Demo />;

```

### API
| 参数 | 说明 | 类型 | 默认值
| :---: | :---: | :---: | :---:
| baseTableConfig | 表格基础配置 | BaseTableProps | ss
| rowFormConfig | 表单搜索栏配置 | RowFormProps | sss
| fetchData | 表格数据源 | params => Promise | sss
| responseAdapter | 数据源数据结构适配 | response => PaginatedFormatReturn | sss
| searchBtnText | 搜索按钮文案 | string | sss
| resetBtnText | 重置按钮文案 | string | sss

