import React, { Fragment } from 'react'
import { Dropdown, Icon, Menu, Tooltip, Divider, Input, Select, Cascader, InputNumber, DatePicker } from 'antd'
import { Link } from 'dva/router'
import moment from 'moment'
import areaData from './areaData'
import style from './index.less'

const serviceStatusStyle = {
  '1': 'red',
  '2': 'red',
  '3': 'green',
  '4': 'red',
  '5': 'red',
  '6': 'red'
}
const serviceStatus = [
  { label: '待接受', value: '1' },
  { label: '待搭建', value: '2' },
  { label: '搭建中', value: '3' },
  { label: '待确认', value: '4' },
  { label: '待上线', value: '5' },
  { label: '验收驳回', value: '6' },
]
const serviceStatusMap = {
  '1': '待接受',
  '2': '待搭建',
  '3': '搭建中',
  '4': '待确认',
  '5': '待上线',
  '6': '验收驳回',
}

export default (page) => {
  return [ // 列的配置
    {
      title: '客户ID',
      label: '客户ID',
      dataIndex: 'customerId',
      width: 150,
      show: true,
      disabled: true,
      sorter: (a, b) => {
        return a.customerId - b.customerId
      }
    },

    {
      title: () => {
        return (
          <Fragment>
            <span>客户名称</span>

            <Tooltip title='点击该列内容可进行编辑' placement='top'>
              <Icon type="question-circle" className='question-circle' />
            </Tooltip>
          </Fragment>
        )
      },
      label: '客户名称',
      dataIndex: 'customerName',
      width: 300,
      show: true,
      disabled: true,
      render: (t, record) => {
        return record.customerName || ''
      },
      onCell: record => ({
        record,
        editable: true,
        formconfig: {
          type: 'input',
          component: Input,
          fieldName: 'customerName',
          props: {
            placeholder: '请输入客户名称'
          },
          rules: [
            { required: true, message: '请输入客户名称' },
          ],
          initialValue: record.customerName
        },
        onSave: page.handleOnSave,
      })
    },

    {
      title: () => {
        return (
          <Fragment>
            <span>服务状态</span>

            <Tooltip title='点击该列内容可进行编辑' placement='top'>
              <Icon type="question-circle" className='question-circle' />
            </Tooltip>
          </Fragment>
        )
      },
      label: '服务状态',
      dataIndex: 'serviceStatusName',
      width: 150,
      show: true,
      disabled: true,
      render: (t, record) => {
        if (Array.isArray(record.serviceStatus)) {
          return record.serviceStatus.map(item => {
            return serviceStatusMap[item]
          }).join(',')
        }

        const className = style[serviceStatusStyle[record.serviceStatus]]

        return record.serviceStatus ? (
          <span className={`${style.status} ${className}`}>{serviceStatusMap[record.serviceStatus]}</span>
        ) : ''
      },
      onCell: record => ({
        record,
        editable: true,
        formconfig: {
          type: 'select',
          component: Select,
          fieldName: 'serviceStatus',
          props: {
            placeholder: '请选择服务状态',
            defaultOpen: true,
            options: serviceStatus,
            // mode: "multiple"
          },
          rules: [
            { required: true, message: '请选择服务状态' },
          ],
          initialValue: record.serviceStatus
        },
        onSave: page.handleOnSave,
      })
    },

    {
      title: () => {
        return (
          <Fragment>
            <span>地区</span>

            <Tooltip title='点击该列内容可进行编辑' placement='top'>
              <Icon type="question-circle" className='question-circle' />
            </Tooltip>
          </Fragment>
        )
      },
      label: '地区',
      dataIndex: 'area',
      width: 300,
      show: true,
      disabled: true,
      render: (t, record) => {
        return record.area || ''
      },
      onCell: record => ({
        record,
        editable: true,
        formconfig: {
          type: 'cascader',
          component: Cascader,
          fieldName: 'areaCode',
          labelName: 'area',
          props: {
            options: areaData,
            placeholder: '请选择地区',
            allowClear: false
          },
          rules: [
            { required: true, message: '请选择地区' },
          ],
          initialValue: record.areaCode
        },
        onSave: page.handleOnSave,
      })
    },

    {
      title: '业务信息',
      dataIndex: 'businessInfo',
      width: 300,
      show: true,
      disabled: true,
      render: (t, record) => {
        const freezeName = record.freezeStatusName ? `（${record.freezeStatusName}）` : ''

        return (
          <div>
            <Link style={{ fontSize: '14px' }} to='/page-b'>{record.productName || ''}{freezeName}</Link>
          </div>
        )
      }
    },

    {
      title: () => {
        return (
          <Fragment>
            <span>最近开通时间</span>

            <Tooltip title='点击该列内容可进行编辑' placement='top'>
              <Icon type="question-circle" className='question-circle' />
            </Tooltip>
          </Fragment>
        )
      },
      label: '最近开通时间',
      dataIndex: 'lastOpenTime',
      width: 300,
      show: false,
      render: (t, record) => {
        return t && moment(t).format('YYYY-MM-DD HH:mm:ss') || ''
      },
      onCell: record => ({
        record,
        editable: true,
        formconfig: {
          type: 'date',
          component: DatePicker,
          fieldName: 'lastOpenTime',
          props: {
            placeholder: '请选择日期',
            format: 'YYYY-MM-DD HH:mm:ss'
          },
          rules: [
            { required: true, message: '请选择日期' },
          ],
          initialValue: record.lastOpenTime && moment(record.lastOpenTime) || undefined
        },
        onSave: page.handleOnSave,
      })
    },

    {
      title: '进入售后日期',
      dataIndex: 'afterSaleTime',
      width: 300,
      show: false,
      render: (t, record) => {
        return record.afterSaleTime || ''
      }
    },

    {
      title: '服务开始时间',
      dataIndex: 'assignToServiceTime',
      width: 200,
      show: false,
      render: (t, record) => {
        return record.assignToServiceTime || ''
      }
    },

    {
      title: '搭建开始时间',
      dataIndex: 'buildTaskStartTime',
      width: 300,
      show: false,
      render: (t, record) => {
        return record.buildTaskStartTime || ''
      }
    },
    {
      title: '搭建结束时间',
      dataIndex: 'buildTaskEndTime',
      width: 300,
      show: false,
      render: (t, record) => {
        return record.buildTaskEndTime || ''
      }
    },

    {
      title: () => {
        return (
          <Fragment>
            <span>售价</span>

            <Tooltip title='点击该列内容可进行编辑' placement='top'>
              <Icon type="question-circle" className='question-circle' />
            </Tooltip>
          </Fragment>
        )
      },
      label: '售价',
      dataIndex: 'serviceDays',
      width: 150,
      show: false,
      render: (t, record) => {
        return t && `$${t}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''
      },
      onCell: record => ({
        record,
        editable: true,
        formconfig: {
          type: 'number',
          component: InputNumber,
          fieldName: 'serviceDays',
          props: {
            placeholder: '请输入售价',
            formatter: value => (`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
          },
          rules: [
            { required: true, message: '请输入售价' },
          ],
          initialValue: record.serviceDays
        },
        onSave: page.handleOnSave,
      })
    },

    {
      title: '上次分配时间',
      dataIndex: 'lastAssignTime',
      width: 200,
      show: false,
      render: (t, record) => {
        return record.lastAssignTime || ''
      }
    },

    {
      title: '驳回次数',
      dataIndex: 'countReject',
      width: 150,
      show: false,
      render: (t, record) => {
        return `${record.countReject || ''}`
      }
    },

    {
      title: '驳回原因',
      dataIndex: 'rejectReason',
      width: 200,
      show: false,
      ellipsis: true,
      render: (t, record) => {
        return (
          <Tooltip title={record.rejectReason || ''} placement='topLeft'>
            <span>{record.rejectReason || ''}</span>
          </Tooltip>
        )
      }
    },

    {
      title: '交付顾问',
      dataIndex: 'deliveryConsultantName',
      width: 200,
      show: false,
      render: (t, record) => {
        const userId = record.deliveryConsultantNo ? `(${record.deliveryConsultantNo})` : ''

        return `${record.deliveryConsultantName || ''}${userId}`
      }
    },

    {
      title: '搭建专员',
      dataIndex: 'buildOperatorName',
      width: 200,
      show: false,
      render: (t, record) => {
        const userId = record.buildOperatorNo ? `(${record.buildOperatorNo})` : ''

        return `${record.buildOperatorName || ''}${userId}`
      }
    },

    {
      title: '售前销售',
      dataIndex: 'saleName',
      width: 200,
      show: false,
      render: (t, record) => {
        const userId = record.saleNo ? `(${record.saleNo})` : ''

        return `${record.saleName || ''}${userId}`
      }
    },

    {
      title: '操作',
      dataIndex: 'operation',
      width: 150,
      show: true,
      disabled: true,
      fixed: 'right',
      render: (t, record) => {
        const menus = (
          <Menu>
            <Menu.Item onClick={() => { page.handleOnStartBuilding(page) }}>发起搭建</Menu.Item>
            <Menu.Item>搭建驳回</Menu.Item>
            <Menu.Item>上线确认</Menu.Item>
            <Menu.Item>搭建记录</Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={() => { page.handleOnDelete(record) }}>删除</Menu.Item>
          </Menu>
        )

        return (
          <Fragment>
            <Link to='/userManagement/detail'>用户详情</Link>

            <Divider type="vertical" />

            <Dropdown overlay={menus} placement="bottomCenter" trigger={['click']}>
              <a>
                更多 <Icon type="down" />
              </a>
            </Dropdown>
          </Fragment>
        )
      }
    },
  ]
}
