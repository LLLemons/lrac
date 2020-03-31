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
import { Button, Card, Input } from 'antd';
import { AsyncFormTable } from '..';
import { useForm } from 'antd/lib/form/util';
import Mock, { Random } from 'mockjs';

const columns = [
  {
    dataIndex: 'partnerName',
    title: '合作商名称',
  },
  {
    dataIndex: 'vin',
    title: '车架号',
  },
  {
    dataIndex: 'vehicleBrandName',
    title: '品牌',
  },
  {
    dataIndex: 'vehicleModelName',
    title: '车型',
  },
  {
    dataIndex: 'vehicleSeriesName',
    title: '车系',
  },
];

const formList = [
  {
    key: 'vin',
    name: 'vin',
    label: '车架号',
    children: <Input />,
  },
  {
    key: 'vin1',
    name: 'vin1',
    label: '车架号1',
    children: <Input />,
  },
  {
    key: 'vin2',
    name: 'vin2',
    label: '车架号2',
    children: <Input />,
  },
  {
    key: 'vin3',
    name: 'vin3',
    label: '车架号3',
    children: <Input />,
  },
  {
    key: 'vin4',
    name: 'vin4',
    label: '车架号4',
    children: <Input />,
  },
  {
    key: 'vin5',
    name: 'vin45',
    label: '车架号45',
    children: <Input />,
  },
];

interface TableColumnProps {}

interface ResponseProps {
  total: number;
  list: TableColumnProps[];
}

interface RequestParamsProps {}

const fetchData = ({ page, size }): Promise<ResponseProps> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { list } = Mock.mock({
        'list|20': [
          {
            'id|+1': 1,
            partnerName: Random.cword(3, 7),
            vin: Random.cword(3, 7),
            vehicleBrandName: Random.cword(3, 7),
            vehicleModelName: Random.cword(3, 7),
            vehicleSeriesName: Random.cword(3, 7),
          },
        ],
      });
      resolve({
        total: 1,
        list: list,
      });
    }, 2000);
  });
};

export default function() {
  const [form] = useForm();
  return (
    <>
      <AsyncFormTable<TableColumnProps, ResponseProps, RequestParamsProps>
        baseTableConfig={{
          rowKey: 'id',
          bordered: true,
          size: 'small',
          columns,
        }}
        rowFormConfig={{
          form,
          formList: formList,
        }}
        fetchData={fetchData}
        responseAdapter={({ list, total }) => ({
          total,
          list,
        })}
      />
    </>
  );
}


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

