import React, { Fragment } from 'react'
import { Modal, Button } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import { CustomPage, SearchForm, CustomTable } from '@/components/antd'
import Demo from '.'
import getFormConfig from './config/form'
import getTableConfig from './config/table'
import DispatchDialog from './components/DispatchDialog'
import StartBuildingDialog from './components/StartBuildingDialog'

export default class BasicPage extends CustomPage {
  state = {
    selectedRowKeys: [],
    count: 0
  }
  pagePadding = '0'

  demoRef = React.createRef()
  tableRef = React.createRef()
  formRef = React.createRef()
  dispatchDialogRef = React.createRef()
  startBuildingDialogRef = React.createRef()

  // 当表格多选的选项改变时
  handleOnSelectionChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  // 批量分配
  handleOnDispatchLot = () => {
    const { selectedRowKeys } = this.state

    this.dispatchDialogRef.current.show({ type: '2', params: selectedRowKeys })
  }

  // 发起搭建
  handleOnStartBuilding = record => {
    this.startBuildingDialogRef.current.show(record)
  }

  // 删除
  handleOnDelete = (record) => {
    let title = '确定删除吗？'
    const { selectedRowKeys } = this.state

    if (!record) {
      title = `确定删除已选的 ${selectedRowKeys.length} 条记录吗？`
    }

    Modal.confirm({
      title,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => { }
    })
  }

  // 保存
  handleOnSave = (record) => {
    // console.log(record, 111)
  }

  testFunc = () => {
    console.log('user=========', this.demoRef, this.formRef, this.tableRef);
  }
  render () {
      
    const { tableData, count } = this.state
    const { location } = this.props

    return super.render(
      <PageContainer>
        <div style={{ padding: '0px 0px 10px 0px', fontSize: '16px', fontWeight: 'bold', color: '#888' }}>v1 - 用户管理11</div>
        {/* <Demo ref={this.demoRef} /> */}
        <SearchForm ref={this.formRef} {...getFormConfig(this)} location={location} loading={this.state.loading} />

        <div style={{ paddingTop: '15px', fontSize: '0px' }}>{count}</div>
        {/* <Button type='primary' onClick={this.testFunc}>test</Button> */}
        <CustomTable wrappedComponentRef={this.tableRef} {...getTableConfig(this, tableData)} location={location} />

        {/* <DispatchDialog ref={this.dispatchDialogRef} />
        <StartBuildingDialog ref={this.startBuildingDialogRef} /> */}
      </PageContainer>
    )
  }
}
