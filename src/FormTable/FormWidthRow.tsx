import { FormInstance, FormItemProps } from 'antd/es/form';
import React, { useCallback } from 'react';
import { RowProps } from 'antd/es/row';
import { ColProps } from 'antd/es/col';
import { Form, Row, Col } from 'antd';

export interface FormItemConfig extends FormItemProps {
  key: string | number;
  colProps?: ColProps;
}

export interface RowFormProps {
  form: FormInstance;
  formList: FormItemConfig[];
  formItemProps?: FormItemProps;
  rowProps?: RowProps;
  colProps?: ColProps;
  fixedRightCol?: React.ReactNode;
}

function FormWidthRow(props: RowFormProps) {
  const { form: propsForm, formList, rowProps, colProps, formItemProps, fixedRightCol } = props;
  const [form] = Form.useForm(propsForm);
  const renderCols = useCallback(() => {
    return formList.map(item => {
      const { key, colProps: curItemColProps, ...curFormItemProps } = item;
      return (
        <Col {...colProps} {...formItemProps} {...curItemColProps} key={key}>
          <Form.Item {...curFormItemProps}>{curFormItemProps.children}</Form.Item>
        </Col>
      );
    });
  }, [formList]);
  return (
    <Form form={form} wrapperCol={{ span: 16 }} labelCol={{ span: 8 }} labelAlign={'right'}>
      <Row {...rowProps}>
        {renderCols()}
        {fixedRightCol ? (
          <Col style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {fixedRightCol}
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </Form>
  );
}
export default FormWidthRow;
