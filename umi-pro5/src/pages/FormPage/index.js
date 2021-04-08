import React, { Fragment } from 'react'
import { CustomForm, BtnGroup } from '@/components/antd'
import getFormConfig from './config/form'

export default class FormPage extends React.Component {

    handleSave = (type, fn) => {
        console.log('handlesave');
        setTimeout(fn, 2000)
    }
    render() {
        
        const btnProps = [
            {type: 'cancel'},
            {type: 'save'}
        ]

        return (
            <React.Fragment>
                <CustomForm {...getFormConfig(this)} />
                <BtnGroup btnValues={btnProps} onHandleClick={this.handleSave}/>
            </React.Fragment>
        )
    }
}
