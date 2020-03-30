import React, { CSSProperties, useCallback, useMemo } from 'react';
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';

export interface BaseTableProps<T> extends TableProps<T> {
  expandContext?: React.ReactNode;
  expandContextStyle?: CSSProperties;
}

function BaseTable<T extends object = any>(props: BaseTableProps<T>) {
  const { columns, expandContext, expandContextStyle, ...reset } = props;
  const defaultContextStyle = useMemo<CSSProperties>(
    () => ({
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: '10px',
    }),
    [],
  );
  const getColumns = useCallback<{ (): ColumnsType<T> }>(() => {
    return (
      columns?.map(item => ({
        align: 'center',
        width: 100,
        ...item,
      })) ?? []
    );
  }, [columns]);
  return (
    <>
      <div style={{ ...defaultContextStyle, ...expandContextStyle }}>
        {expandContext}
      </div>
      <Table<T> columns={getColumns()} {...reset} />
    </>
  );
}
export default BaseTable;
