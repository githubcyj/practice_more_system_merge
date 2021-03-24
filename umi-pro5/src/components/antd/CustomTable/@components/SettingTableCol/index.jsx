import React from 'react'
import { Checkbox, Row, Col, Icon, Tooltip, message } from 'antd'
import Dialog from '@/components/antd/Dialog'
import style from './index.less'


export default class SettingTableCol extends Dialog {
  modelConfig = {
    ...this.modelConfig,
    title: '自定义显示字段',
    width: 800,
    bodyStyle: {
      padding: '0px'
    },
    footer: null
  }

  state = {
    ...this.state,
    visible: false,
    selectedList: [],
    indeterminate: false,
    checkAll: false
  }

  onOpen = () => {
    console.log(this.state.data, 123)
    this.init()
  }

  init () {
    const { columns } = this.state.data

    this.setState({ selectedList: columns })
  }

  onSubmit = () => {
    this.close()
  }

  handleOnChange = (e, item) => {
    if (e.target.checked) {
      item.show = e.target.checked

      this.setState(prevState => {
        const selected = [...prevState.selectedList, item]
        const columns1 = selected.filter(item => !item.fixed)
        const fixedColumns = selected.filter(item => item.fixed)
        const selectedList = [...columns1, ...fixedColumns]

        return { selectedList }
      }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selectedList)
        }

        this.handleSaveSelectedList() // 保存用户的选择
      })
    } else {
      if (this.state.selectedList.length < 4) return message.error('至少要显示3个字段！')

      const selectedList = this.state.selectedList.filter(one => item.dataIndex !== one.dataIndex)

      item.show = e.target.checked

      this.setState({ selectedList }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selectedList)
        }

        this.handleSaveSelectedList() // 保存用户的选择
      })
    }
  }

  handleOnDelete = item => {
    if (this.state.selectedList.length < 4) return message.error('至少要显示3个字段！')

    const { defaultColumns, customColumns } = this.state.data
    const selectedList = this.state.selectedList.filter(one => item.dataIndex !== one.dataIndex);

    defaultColumns.forEach(one => {
      if (item.dataIndex == one.dataIndex) one.show = false
    })
    customColumns.forEach(one => {
      if (item.dataIndex == one.dataIndex) one.show = false
    })

    this.setState({ selectedList }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.selectedList)
      }

      this.handleSaveSelectedList() // 保存用户的选择
    })
  }

  getStorageKey () {
    const pathname = this.props.location.pathname
    const str = localStorage.getItem('currentUser')

    if (str && str != 'null' && str != 'undefined') {
      const user = JSON.parse(str)

      return `${user.username}:${pathname}`
    }

    return pathname
  }

  handleSaveSelectedList () {
    const key = this.getStorageKey()
    const value = JSON.stringify(this.state.selectedList)

    localStorage.setItem(key, value)
  }

  handleResetSelectedList () {
    const key = this.getStorageKey()
    const str = localStorage.getItem(key)

    if (str && str != 'null' && str != 'undefined') {
      const selectedList = JSON.parse(str)
    }
  }

  componentDidMount () {
  }

  render () {
    const { defaultColumns, customColumns } = this.state.data

    return super.render(
      <div className='setting-table-col-container'>
        <div className='setting-table-col-container-left'>
          <div className='setting-table-col-container-left-header'>
            可选字段
          </div>

          <Row>
            <div style={{ fontWeight: 'bold', marginTop: '20px', color: '#000' }}>基础字段</div>
            {
              Array.isArray(defaultColumns) && defaultColumns.map(item => {
                return (
                  <Col span={8} key={item.dataIndex} style={{ padding: '6px 0px' }}>
                    <Checkbox checked={item.show} disabled={item.disabled} onChange={(e) => { this.handleOnChange(e, item) }}>{item.label || item.title}</Checkbox>
                  </Col>
                )
              })
            }
          </Row>

          <Row>
            {
              Array.isArray(customColumns) && customColumns.length > 0 && (
                <div style={{ fontWeight: 'bold', marginTop: '25px', color: '#000' }}>自定义字段</div>
              )
            }

            {
              Array.isArray(customColumns) && customColumns.map(item => {
                return (
                  <Col span={8} key={item.dataIndex} style={{ padding: '6px 0px' }}>
                    <Checkbox checked={item.show} disabled={item.disabled} onChange={(e) => { this.handleOnChange(e, item) }}>{item.label || item.title}</Checkbox>
                  </Col>
                )
              })
            }
          </Row>
        </div>

        <div className='setting-table-col-container-right'>
          <div className='setting-table-col-container-right-header'>
            已显示字段
          </div>

          <div className='setting-table-col-container-right-body'>
            {
              this.state.selectedList.map((item, i) => {
                return (
                  <div className='setting-table-col-container-right-body-item' key={i}>
                    <span>{item.label || item.title}</span>

                    <span>
                      {
                        item.disabled ? null : (
                          <Tooltip title='删除'>
                            <Icon type="delete" className='icon-button' onClick={() => this.handleOnDelete(item)} />
                          </Tooltip>
                        )
                      }
                    </span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
