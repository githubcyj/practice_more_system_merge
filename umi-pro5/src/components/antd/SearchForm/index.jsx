import React, { Component } from 'react'
import { Button, Form, Row, Col, Tooltip, Icon, Dropdown, Menu, Select, Input } from 'antd'
import { FormInstance } from 'antd/lib/form';
import { UpOutlined, DownOutlined, EllipsisOutlined } from '@ant-design/icons'
import { history } from 'umi'
import moment from 'moment'
import { propTypes } from './config'
import FormItemGroup from './FormItemGroup'
import style from './index.less'

const InputGroup = Input.Group

class SearchForm extends Component {
  static propTypes = propTypes
  formRef = React.createRef();

  state = {
    showAllConditions: false,
    colNum: this.props.colNum || 3,
    selectedKeys: [`${this.props.colNum || 3}`],
    autoLayout: false,
    routeName: window.location.hash
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
    },
  }

  // 展开 / 收起
  handleOnShowMoreCondition = () => {
    this.setState({ showAllConditions: !this.state.showAllConditions }, () => {
      const { pathname, query } = this.props.location

      query.collapse = this.state.showAllConditions
      history.replace({ pathname, query })
    })
  }

  // 设置列
  handleOnChangeCol = (item) => {
    if (item.key !== 'auto') {
      this.setState({ colNum: Number(item.key), selectedKeys: item.keyPath, autoLayout: false })
      return
    }

    this.setState({ selectedKeys: item.keyPath, autoLayout: true }, () => {
      const container = document.querySelector('#search-form-container')

      this.autoLayout(container.clientWidth)
    })
  }

  // 获取表单值
  getFieldsValue = (cb) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        cb(values)
      }
    })
  }
  // 设置表单值
  setFieldsValue = (kv) => {
    this.props.form.setFieldsValue(kv)
  }

  // 动态布局
  autoLayout = (width) => {
    if (this.state.autoLayout) {
      if (width >= 900) {
        this.setState({ colNum: 3 })
      } else if (width >= 700 && width < 900) {
        this.setState({ colNum: 2 })
      } else if (width < 700) {
        this.setState({ colNum: 1 })
      }
    }
  }

  // watch窗口的宽度变化
  watchWindowResize = () => {
    const container = document.querySelector('#search-form-container')

    window.onresize = (e) => {
      this.autoLayout(container.clientWidth)
    }
  }

  // 搜索
  handleSearch = (values) => {
    // if (e) e.preventDefault()

    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
        if (this.props.handleSearch) {
          this.props.handleSearch(values)
        }
    //   }
    // })
  }
  // 重置
  handleReset = () => {
    localStorage.removeItem(this.state.routeName)
    this.formRef.current.resetFields();
    this.props.handleReset()
  }

  // 创建表单项
  createFieldDecorator = (config, type) => {
    const { form } = this.props
    const formItemLayout = config.formItemLayout || this.props.formItemLayout || this.formItemLayout

    formItemLayout.labelCol.sm.span = this.state.colNum > 1 ? 8 : 5
    formItemLayout.wrapperCol.sm.span = this.state.colNum > 1 ? 16 : 19
    // const { getFieldDecorator } = form
    const width = config.props?.style?.width || '100%'
    const instance = config.instance
    let component = <config.component {...config.props} form={form} style={{ width: width }} />
    let values = {}

    if (config.type === 'Select') {
      component = (
        <config.component {...config.props} form={form} style={{ width: width }}>
          {
            config.props.options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))
          }
        </config.component>
      )
    }

    const FormItem = instance || component

    if (this.props.keepalive) {
      values = this.resumeFormValues()

      if (config.type === 'RangePicker' && values[config.fieldName]) {
        values[config.fieldName] = [moment(values[config.fieldName][0]), moment(values[config.fieldName][1])]
      } else if (config.type === 'DatePicker' && values[config.fieldName]) {
        values[config.fieldName] = moment(values[config.fieldName])
      }
    }

    if (config.fieldName && type !== 'Group') {
        return (
            <Form.Item {...formItemLayout} label={config.label} name={config.fieldName} rules={config.rules} initialValues={values[config.fieldName] || config.initialValue || undefined}>
                {FormItem}
            </Form.Item>
        )
    //   return getFieldDecorator(config.fieldName, {
    //     rules: config.rules,
    //     initialValue: values[config.fieldName] || config.initialValue || undefined,
    //   })(FormItem)
    } else if(type === 'Group'){
      return (
        <Form.Item {...formItemLayout} name={config.fieldName} rules={config.rules} initialValues={values[config.fieldName] || config.initialValue || undefined}>
            {FormItem}
        </Form.Item>
      )
    }else {
        return FormItem;
    }
  }

  // 创建表单组
  createGroupItem = (config) => {
    return <FormItemGroup config={config} createFieldDecorator={this.createFieldDecorator} />
  }

  // 表单的布局
  createFormItem = (config, i) => {
    const spanSize = Math.floor(24 / (this.state.colNum || 1))
    

    if (config.hidden) return null
    // console.log(config, i, this.createFieldDecorator(config));
    return (
      <Col span={config.span || spanSize} key={config.fieldName || i}>
        {
          config.type === 'Group' ? (
            // <Form.Item {...formItemLayout} label={config.label} name={config.fieldName} rules={config.rules} initialValues={values[config.fieldName] || config.initialValue || undefined}>
            //   {
                this.createGroupItem(config)
            //   }
            // </Form.Item>
          ) : (
            <React.Fragment>
                {
                  this.createFieldDecorator(config)
                }

                {
                  config.belowTips ? <div style={{ lineHeight: '150%', padding: '5px 0px', color: '#999' }}>{config.belowTips}</div> : null
                }
            </React.Fragment>
            )
        }
      </Col>
    )
  }

  // 保存表单的值
  saveFormValues = () => {
    // this.getFieldsValue((values) => {
    //   const { noSaveFields } = this.props
    //   const data = Object.assign({}, values)

    //   if (Array.isArray(noSaveFields)) {
    //     noSaveFields.forEach(key => {
    //       delete data[key]
    //     })
    //   }

    //   localStorage.setItem(this.state.routeName, JSON.stringify(data))
    // })
  }
  // 恢复表单的值
  resumeFormValues = () => {
    const { noSaveFields } = this.props
    const str = localStorage.getItem(this.state.routeName)
    const values = str && str !== 'undefined' && str !== 'null' ? JSON.parse(str) : {}

    if (Array.isArray(noSaveFields)) {
      noSaveFields.forEach(key => {
        delete values[key]
      })
    }

    return values
  }

  resumeCollapseState = () => {
    const { query } = this.props.location

    if (query.collapse) {
      const showAllConditions = JSON.parse(query.collapse)

      this.setState({ showAllConditions })
    }
  }

  componentDidMount () {
    this.watchWindowResize()
    this.resumeCollapseState()
  }

  componentWillUnmount () {
    if (this.props.keepalive) {
      this.saveFormValues()
    }
  }

  render () {
    const { formConfig, loading } = this.props
    const { colNum, showAllConditions } = this.state
    const oneSize = Math.floor(24 / (colNum || 1))
    let spanSize = 24

    if (showAllConditions) {
      const remainder = formConfig.length % (colNum || 1)

      if (remainder === 0) {
        spanSize = 24
      } else {
        spanSize = (colNum - remainder) * oneSize
      }
    } else {
      if (formConfig.length >= (colNum - 1)) {
        spanSize = Math.floor(24 / (colNum || 1))
      } else {
        spanSize = (colNum - formConfig.length) * oneSize
      }
    }

    const menus = (
      <Menu onClick={this.handleOnChangeCol} selectedKeys={this.state.selectedKeys}>
        <Menu.Item key='1' style={{ padding: '5px 25px' }}>1 列</Menu.Item>
        <Menu.Item key='2' style={{ padding: '5px 25px' }}>2 列</Menu.Item>
        <Menu.Item key='3' style={{ padding: '5px 25px' }}>3 列</Menu.Item>
        <Menu.Item key='auto' style={{ padding: '5px 25px' }}>自适应</Menu.Item>
      </Menu>
    )

    return (
      <div id='search-form-container' className='search-form-container'>
        <div className='search-form-operate-bar'>
          <Dropdown overlay={menus} trigger={['click']} placement="bottomCenter">
            <Tooltip title='设置布局'>
                <EllipsisOutlined className='icon-button' />
              {/* <Icon type="ellipsis" className='icon-button' /> */}
            </Tooltip>
          </Dropdown>
        </div>

        <Form
            name="basic1"
            ref={this.formRef}
            onFinish={this.handleSearch}
            onFinishFailed={() => {}}
        >
          <Row gutter={24}>
            {
              formConfig.map((config, i) => {
                if (colNum > 1) {
                  if (!showAllConditions && i >= (colNum - 1)) {
                    return null
                  }
                } else {
                  if (!showAllConditions && i >= (colNum)) {
                    return null
                  }
                }

                return this.createFormItem(config, i)
              })
            }

            <Col span={spanSize}>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button loading={loading} type="primary" htmlType="submit" /* onClick={this.handleSearch} */ style={{ marginRight: 10 }}>查询</Button>
                <Button loading={loading} onClick={this.handleReset} style={{ marginRight: 10 }}>重置</Button>
                <a onClick={this.handleOnShowMoreCondition}>
                  {
                    showAllConditions ? '收起' : '展开'
                  }
                  {showAllConditions ? <UpOutlined style={{ marginLeft: 2 }} /> : <DownOutlined style={{ marginLeft: 2 }} />}
                  <Icon type={showAllConditions ? 'UpOutlined' : 'DownOutlined'} style={{ marginLeft: 2 }} />
                </a>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default SearchForm;