import React, { CSSProperties, useMemo } from 'react';
import { Button, Card, Form } from 'antd';
import { useFormTable } from '@umijs/hooks';
import { PaginatedParams } from '@umijs/hooks/es/useFormTable';
import { TablePaginationConfig, TableProps } from 'antd/es/table';
import { PaginatedFormatReturn } from '@umijs/use-request/lib/types';
import _ from 'lodash';
import { FormItemProps } from 'antd/es/form';
import { RowProps } from 'antd/es/row';
import { ColProps } from 'antd/es/col';
import { AsyncTableProps } from '../BaseTable/AsyncTable';
import BaseTable, { BaseTableProps } from '../BaseTable/BaseTable';
import FormWidthRow, { RowFormProps } from './FormWidthRow';

interface FormTableProps<T, R, P> {
  baseTableConfig: BaseTableProps<T>;
  rowFormConfig: RowFormProps;
  fetchData: (p: P) => Promise<R>;
  responseAdapter: (res: R) => PaginatedFormatReturn<T>;
  searchBtnText?: string;
  resetBtnText?: string;
}

function AsyncFormTable<
  T extends object = any,
  R extends object = any,
  P extends object = any
>(props: FormTableProps<T, R, P>) {
  const {
    baseTableConfig,
    rowFormConfig,
    fetchData,
    responseAdapter,
    searchBtnText = '搜索',
    resetBtnText = '重置',
  } = props;
  const { form: rowForm } = rowFormConfig;
  const [form] = Form.useForm(rowForm);
  const defaultPagination = useMemo<TablePaginationConfig>(
    () => ({
      total: 0,
      defaultPageSize: 10,
      defaultCurrent: 10,
      showQuickJumper: true,
      showSizeChanger: true,
    }),
    [],
  );
  const defaultLayout = useMemo<{
    rowProps: RowProps;
    colProps: ColProps;
  }>(
    () => ({
      rowProps: {
        gutter: 24,
      },
      colProps: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6,
        xl: 6,
        xxl: 6,
      },
    }),
    [],
  );
  const initialPagination = _.mergeWith(
    defaultPagination,
    baseTableConfig.pagination,
  );
  const initialFormLayout = {
    rowProps: rowFormConfig.rowProps || defaultLayout.rowProps,
    colProps: rowFormConfig.colProps || defaultLayout.colProps,
  };

  const getTableData = async (
    { current, pageSize }: PaginatedParams[0],
    formData: P,
  ): Promise<PaginatedFormatReturn<T>> => {
    const res = await fetchData({
      page: current - 1,
      size: pageSize,
      ...formData,
    });
    const adapterResponse = responseAdapter(res);
    return Promise.resolve<PaginatedFormatReturn<T>>(adapterResponse);
  };
  const { tableProps, search, pagination } = useFormTable<any, T>(
    getTableData,
    {
      defaultPageSize: initialPagination.defaultPageSize,
      form,
    },
  );
  const { submit, reset } = search;
  const { current, pageSize, total } = pagination;
  return (
    <>
      <Card
        style={{ marginBottom: '16px', overflow: 'hidden' }}
        bodyStyle={{ paddingBottom: '0px' }}
      >
        <Form
          form={form}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 8 }}
          labelAlign={'right'}
        >
          <FormWidthRow
            {...rowFormConfig}
            {...initialFormLayout}
            fixedRightCol={
              <Form.Item
                style={{ display: 'flex', justifyContent: 'flex-end' }}
                wrapperCol={{ span: 24 }}
              >
                <Button type="primary" onClick={submit}>
                  {searchBtnText}
                </Button>
                <Button onClick={reset} style={{ marginLeft: 16 }}>
                  {resetBtnText}
                </Button>
              </Form.Item>
            }
          />
        </Form>
      </Card>
      <BaseTable<T>
        {...baseTableConfig}
        dataSource={tableProps.dataSource}
        loading={tableProps.loading}
        pagination={{
          ...initialPagination,
          current,
          pageSize: pageSize ?? 0,
          total,
        }}
      />
    </>
  );
}
export default AsyncFormTable;
