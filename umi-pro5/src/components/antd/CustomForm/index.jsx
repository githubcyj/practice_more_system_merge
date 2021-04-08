import React, { Component } from 'react';
import { Button, Form, Row, Col, Icon, Menu, Input, Checkbox, Dropdown, Tooltip } from 'antd';
import { UpOutlined, DownOutlined, EllipsisOutlined } from '@ant-design/icons'
import { ComponentItem, FormItemLayout } from './constants';
import FormItemGroup from './formItemGroup';

export default class CustomForm extends React.Component {

    state = {
        colNum: this.props.colNum || 3,
        selectedKeys: [`${this.props.colNum || 3}`],
        showAllConditions: true,
        autoLayout: false
    }

    // 创建表单布局
    createFormLayout = (config, i) => {
        const spanSize = Math.floor(24 / (this.state.colNum || 1))
        if (config.hidden) return null
        return (
            <Col span={config.span || spanSize} key={config.fieldName || i}>
                {config.type === 'Group' ? this.createFormItemGroup(config) : this.createFormItem(config)}
            </Col>
        )
    }
    // 创建组合表单
    createFormItemGroup = config => <FormItemGroup config={config} createFormItem={this.createFormItem} />
    // 创建表单
    createFormItem = (config, type) => {
        const formItemLayout = config.formItemLayout || this.props.formItemLayout || FormItemLayout
        formItemLayout.labelCol.sm.span = this.state.colNum > 1 ? 8 : 5
        formItemLayout.wrapperCol.sm.span = this.state.colNum > 1 ? 16 : 19
        const CItem = ComponentItem[config.type];
        const width = config.props?.style?.width || '100%'
        // console.log(component, config.component, 1111);
        // console.log(<CItem />, <config.component />, 1111);
        const FormItem = config.instance || <CItem {...config.props} style={{ width: width }}/>
        const label = type === 'Group' ? '' : config.label;
        return (
            <Form.Item noStyle={type === 'Group'} {...formItemLayout} label={label} name={config.fieldName} rules={config.rules}>
                {FormItem}
            </Form.Item>
        )
    }
    
    // 设置列
    handleOnChangeCol = (item) => {
        if (item.key !== 'auto') {
        this.setState({ colNum: Number(item.key), selectedKeys: item.keyPath, autoLayout: false })
        return
        }

        this.setState({ selectedKeys: item.keyPath, autoLayout: true }, () => {
        const container = document.querySelector('#custom-form-container')

        this.autoLayout(container.clientWidth)
        })
    }

    // 表单操作函数
    onFinish = (values) => {
        console.log('Success:', values);
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    /** 内部函数 */
    // watch窗口的宽度变化
    watchWindowResize = () => {
        const container = document.querySelector('#custom-form-container')

        window.onresize = (e) => {
            this.autoLayout(container.clientWidth)
        }
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

    componentDidMount () {
        this.watchWindowResize()
        // this.resumeCollapseState()
    }

    render() {

        const { formConfig } = this.props;
        const { selectedKeys, colNum, showAllConditions } = this.state;
        
        const menus = (
            <Menu onClick={this.handleOnChangeCol} selectedKeys={selectedKeys}>
              <Menu.Item key='1' style={{ padding: '5px 25px' }}>1 列</Menu.Item>
              <Menu.Item key='2' style={{ padding: '5px 25px' }}>2 列</Menu.Item>
              <Menu.Item key='3' style={{ padding: '5px 25px' }}>3 列</Menu.Item>
              <Menu.Item key='auto' style={{ padding: '5px 25px' }}>自适应</Menu.Item>
            </Menu>
        )
        return (
            <div id='custom-form-container'>
                <Dropdown overlay={menus} trigger={['click']} placement="bottomCenter">
                    <Tooltip title='设置布局'>
                        <EllipsisOutlined className='icon-button' />
                    {/* <Icon type="ellipsis" className='icon-button' /> */}
                    </Tooltip>
                </Dropdown>
                <Form
                    // {...layout}
                    name="basic"
                    // initialValues={{
                    //     remember: true,
                    // }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
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

                                    return this.createFormLayout(config, i)
                                })
                            }
                        </Row>
                </Form>
            </div>
        )
    }
}