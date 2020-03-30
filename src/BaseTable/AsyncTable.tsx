import React, { useMemo } from 'react';
import { useRequest } from '@umijs/hooks';
import {
  PaginatedFormatReturn,
  PaginatedParams,
} from '@umijs/hooks/es/useFormTable';
import { TablePaginationConfig, TableProps } from 'antd/es/table';
import _ from 'lodash';
import { BaseTable } from '.';

export interface AsyncTableProps<T, R, P> extends TableProps<T> {
  fetchData: (p: P) => Promise<R>;
  responseAdapter: (res: R) => PaginatedFormatReturn<T>;
}

function FormTable<
  T extends object = any,
  R extends object = any,
  P extends object = any
>(props: AsyncTableProps<T, R, P>) {
  const { fetchData, responseAdapter, ...tableProps } = props;
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
  const initialPagination = _.mergeWith(
    defaultPagination,
    tableProps.pagination,
  );
  const service = async (
    { current, pageSize }: PaginatedParams[0],
    other: P,
  ) => {
    const res = await fetchData({
      ...other,
      page: current - 1,
      size: pageSize,
    });
    const adapterResponse = responseAdapter(res);
    return Promise.resolve(adapterResponse);
  };
  const { tableProps: serviceTableProps, pagination } = useRequest(service, {
    paginated: true,
    defaultPageSize: initialPagination.defaultPageSize,
  });
  const {
    current,
    pageSize,
    total,
    totalPage,
    changeCurrent,
    changePageSize,
    onChange,
  } = pagination;
  return (
    <BaseTable<T>
      {...tableProps}
      dataSource={serviceTableProps.dataSource}
      loading={serviceTableProps.loading}
      pagination={{
        ...initialPagination,
        current,
        pageSize: pageSize ?? 0,
        total,
      }}
    />
  );
}

export default FormTable;
