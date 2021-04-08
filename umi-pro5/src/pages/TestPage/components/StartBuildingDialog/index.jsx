import React from 'react'
import { Form, Dialog } from '@/components/antd'
import getFormConfig from './config'
import { startBuilding } from './service'

export default class StartBuildingDialog extends Dialog {

  modelConfig = {
    ...this.modelConfig,
    title: '发起搭建',
    width: 600,
  }

  onOpen = () => { }

  handleCancel = () => {
    this.close()
  }

  handleSubmit = async value => {
    const { orderItemId } = this.state.data
    const data = { orderItemId, ...value }
    const res = await startBuilding(data)

    this.close()
  }

  render () {
    // return super.render(
    //   <Form {...getFormConfig(this)} />
    // )
  }
}