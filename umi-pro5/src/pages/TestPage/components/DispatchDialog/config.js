import { Input } from 'antd'

const { TextArea } = Input

export default (page) => {
  return {
    formConfig: [
      {
        label: '备注',
        component: TextArea,
        fieldName: 'remark',
        props: {
          placeholder: '请输入备注',
          rows: 4
        },
        rules: [
          { required: true, message: '请输入备注' }
        ],
      }
    ],
    colNum: 1,
    submit: true,
    submitText: '确定',
    handleSubmit: values => { page.handleSubmit(values) },
    cancel: true,
    handleCancel: page.handleCancel,
    bottomSpacing: true,
    formItemLayout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    }
  }
}