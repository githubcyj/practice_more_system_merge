import React from 'react'
import { Input, DatePicker, Select } from 'antd'

const { RangePicker } = DatePicker

const serviceStatus = [
  { label: '待接受', value: '1' },
  { label: '待搭建', value: '2' },
  { label: '搭建中', value: '3' },
  { label: '待确认', value: '4' },
  { label: '待上线', value: '5' },
  { label: '验收驳回', value: '6' },
]
const freezeStatus = [
  { label: '已冻结', value: '1' },
  { label: '未冻结', value: '2' },
]

export default (page) => {
  return {
    formConfig: [
    //   {
    //     type: 'Group',
    //     children: [
    //       {
    //         component: Input,
    //         label: '客户名称',
    //         fieldName: 'customerName',
    //         props: {
    //           placeholder: '请输入客户名称'
    //         },
    //       },
    //       {
    //         component: Input,
    //         label: '客户ID',
    //         fieldName: 'customerId',
    //         props: {
    //           placeholder: '请输入客户ID'
    //         },
    //       }
    //     ]
    //   },

    //   {
    //     type: 'Group',
    //     children: [
    //       {
    //         component: Input,
    //         label: '产品名称',
    //         fieldName: 'productName',
    //         props: {
    //           placeholder: '请输入产品名称'
    //         },
    //       },
    //       {
    //         type: 'Select',
    //         component: Select,
    //         label: '服务状态',
    //         fieldName: 'serviceStatus',
    //         props: {
    //           options: serviceStatus,
    //           allowClear: true,
    //           placeholder: '请选择状态'
    //         },
    //       },
    //     ]
    //   },

      {
        type: 'Select',
        component: Select,
        label: '冻结状态',
        fieldName: 'freezeStatus',
        props: {
          options: freezeStatus,
          allowClear: true,
          placeholder: '请选择状态'
        },
      },


      {
        type: 'RangePicker',
        component: RangePicker,
        label: '服务开始时间',
        fieldName: 'assignToServiceTime',
      },

      {
        type: 'RangePicker',
        component: RangePicker,
        label: '搭建时间',
        fieldName: 'buildTaskTime',
      },

      {
        type: 'RangePicker',
        component: RangePicker,
        label: '进入售后时间',
        fieldName: 'afterSaleTime',
      },
      {
        type: 'RangePicker',
        component: RangePicker,
        label: '开通时间',
        fieldName: 'serviceStartTime',
      },

      {
        type: 'DatePicker',
        component: DatePicker,
        label: '出生日期',
        fieldName: 'birthday',
      }
    ],

    keepalive: true,
    colNum: 3,
    handleSearch: values => page.handleSearch(values),
    handleReset: () => page.handleReset(),
  }
}