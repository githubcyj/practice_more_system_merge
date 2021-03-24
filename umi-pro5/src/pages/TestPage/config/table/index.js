import React, { Fragment } from 'react'
import { Button } from 'antd'
import { PlusOutlined  } from '@ant-design/icons';
import { request } from 'umi'

import getDefaultColumns from './defaultColumns'
import customColumns from './customColumns'

export default (page) => {
  return {
    // 是否自动调列表接口
    automatic: false,

    // 是否可编辑，这个属性控制table是否开启编辑功能
    editable: true,

    // 设置横向和纵向的滚动宽度
    scroll: { x: 2000, y: 600 },

    // 设置一个字段作为每一行的key
    rowKey: 'id',

    // 是否显示 ‘刷新’ 按钮
    showRefresh: false,

    // 是否显示 ‘设置行高’ 的按钮
    showLineHeight: true,

    // 是否显示 ‘设置列‘ 的按钮
    showTableConfig: true,

    // 是否显示 ’全屏‘ 的按钮
    showFullScreen: true,

    // 是否显示表格上面的滚动条
    showScroller: false,

    // 设置table的多选或单选
    rowSelection: { // 设置多选或单选
      type: 'checkbox',
      onChange: page.handleOnSelectionChange
    },

    // 表格的默认列
    defaultColumns: getDefaultColumns(page),

    // 表格的自定义列
    customColumns: customColumns,

    // 分页参数
    paginationKey: {
      size: "pageSize",
      currPage: "page",
      total: 'data.pagination.totalCount',
      list: 'data.data'
    },

    // 获取表格数据的接口
    handleRequestData: (params) => {
      const formData = Object.assign({}, page.state.formData)

      if (Array.isArray(formData.assignToServiceTime)) {
        formData.assignToServiceTimeBegin = new Date(formData.assignToServiceTime[0]).getTime()
        formData.assignToServiceTimeEnd = new Date(formData.assignToServiceTime[1]).getTime()
      }

      if (Array.isArray(formData.buildTaskTime)) {
        formData.buildTaskTimeBegin = new Date(formData.buildTaskTime[0]).getTime()
        formData.buildTaskTimeEnd = new Date(formData.buildTaskTime[1]).getTime()
      }

      if (Array.isArray(formData.afterSaleTime)) {
        formData.afterSaleTimeBegin = new Date(formData.afterSaleTime[0]).getTime()
        formData.afterSaleTimeEnd = new Date(formData.afterSaleTime[1]).getTime()
      }

      if (Array.isArray(formData.serviceStartTime)) {
        formData.serviceStartTimeBegin = new Date(formData.serviceStartTime[0]).getTime()
        formData.serviceStartTimeEnd = new Date(formData.serviceStartTime[1]).getTime()
      }

      delete formData.assignToServiceTime
      delete formData.buildTaskTime
      delete formData.afterSaleTime
      delete formData.serviceStartTime

      // console.log({ ...formData, ...params })

      return request('/api/users', {
        method: 'GET',
        // url: '/v3/api/users',
        params: {
          ...params,
          ...formData
        }
      })
    },

    // 可编辑的行在保存时的回调
    handleOnSave: (values) => {
      // page.tableRef.current.handleRefresh()
    },

    // 表格上面的操作按钮
    renderOperation: () => {
      return (
        <Fragment>
          <Button type='primary' onClick={page.handleOnStartBuilding}><PlusOutlined />新建</Button>
          <Button type='primary' style={{ marginLeft: '10px' }}>导入</Button>
          <Button type='primary' style={{ marginLeft: '10px' }}>导出</Button>
        </Fragment>
      )
    },

    // 批量操作的按钮
    renderBatchOperation: () => {
      return (
        <Fragment>
          <Button type='primary' style={{ marginLeft: '10px' }} onClick={page.handleOnDispatchLot}>批量分配</Button>
          <Button type='primary' style={{ marginLeft: '10px' }} onClick={page.handleOnDispatchLot}>批量审批</Button>
          <Button style={{ marginLeft: '10px' }} onClick={() => page.handleOnDelete()}>批量删除</Button>
        </Fragment>
      )
    }
  }
}