import React from 'react'
import { Input } from 'antd'

const { TextArea } = Input

export default (page) => {
  return {
    formConfig: [
      {
        label: '客户名称',
        instance: (
          <span>阿格乐供应链（上海）有限公司</span>
        )
      },

      {
        label: '购买套餐',
        instance: (
          <span>微商城高级版</span>
        )
      },

      {
        label: '店铺ID',
        instance: (
          <span>56049813</span>
        )
      },

      {
        label: '搭建说明',
        component: TextArea,
        fieldName: 'remark',
        props: {
          placeholder: '请输入搭建说明',
          rows: 4
        },
        rules: [
          { required: true, message: '请输入搭建说明' }
        ],
      },
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