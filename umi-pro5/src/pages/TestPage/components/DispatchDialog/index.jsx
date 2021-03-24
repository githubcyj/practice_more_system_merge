import React from 'react'
import { Form, Dialog } from '@/components/antd'
import getFormConfig from './config'
import { dispatch } from './service'

export default class DispatchDialog extends Dialog {

  modelConfig = {
    ...this.modelConfig,
    title: '分配交付顾问',
    width: 500,
  }

  user = {}

  onOpen = () => {
    const { type } = this.state.data

    this.modelConfig.title = type === '1' ? '分配交付顾问' : '批量分配交付顾问'
    this.setState({})
    this.user = {}
  }

  handleCancel = () => {
    this.close()
  }

  handleOnSelectChange = (value, node, option) => {
    this.user = option || {}
  }

  handleSubmit = async (formData) => {
    const { params: orderItemIds } = this.state.data
    const data = { orderItemIds, name: this.user.name, type: 1, ...formData }

    const res = await dispatch(data)

    this.close()
  }

  render () {
    return super.render(
      <Form {...getFormConfig(this)} />
    )
  }
}