import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';

const BtnItem = {
    'back': {name: '返回', props:{}},
    'cancel': {name: '取消', props:{}},
    'save': {name: '保存', props:{ type: 'primary'}},
    'reset': {name: '重置', props:{}}
}

export default function BtnGroup (props) {
    const [loading, setLoading] = useState(false);
    const { btnValues, onHandleClick } = props;

    return (
        <div className={styles.button_group_style}>
            {
                btnValues.map(val => {
                    return (
                        <Button loading={loading} {...val.props || BtnItem[val.type].props} onClick={() => { setLoading(true); onHandleClick(val.type, () => {setLoading(false)}) }}>
                            {val.label || BtnItem[val.type].name}
                        </Button>
                    )
                })
            }
        </div>
    )
}