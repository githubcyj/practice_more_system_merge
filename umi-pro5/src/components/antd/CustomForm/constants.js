import React, { Component } from 'react';
import { Input, Checkbox, Select, DatePicker } from 'antd';

const { RangePicker } = DatePicker;
const { Password } = Input;

// antd基础表单项
export const ComponentItem = {
    'Input': Input,
    'Password': Password,
    'Select': Select,
    'DatePicker': DatePicker,
    'RangePicker': RangePicker
}

// 布局常量
export const FormItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
    },
}