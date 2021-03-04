import React, { Component } from 'react'
import { Button, InputItem, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form'
import { Link } from 'react-router-dom'

import './register.scss'
import Reg from '../../utils/reg';
import apiUser from '../../api/user';
import { Object2FormData } from '../../utils/format';

class Register extends Component {
    state = {
        btnDisabled: false, // 注册按钮是否可点击
        modalMsg: "", // modal 的文本内容
        modalFlag: false, // modal 打开|关闭
        pcode: "", // 短信验证码
    }

    /**
     * 账号注册
     */
    register = () => {
        var phoneValue = this.props.form.getFieldProps('phone').value
        var phoneValidator = this.props.form.getFieldError('phone')
        var pcodeValue = this.props.form.getFieldProps('pcode').value
        var pcodeValidator = this.props.form.getFieldError('pcode')

        if (!phoneValue) {
            this.openModal("请输入电话号码")
        } else if (phoneValidator) {
            this.openModal(phoneValidator[0])
        } else if (!pcodeValue) {
            this.openModal("请输入验证码")
        } else if (pcodeValidator) {
            this.openModal(pcodeValidator[0])
        } else {
            // this.openModal("所有格式均正确")
            // let fd = new FormData();
            // fd.append("phone", phoneValue);
            // fd.append("pcode", pcodeValue);
            // api.register(fd).then((data) => {
            //     console.log(data);
            // })
            window.sessionStorage.setItem('phone', phoneValue);
            // console.log(this.props);
            this.props.history.push('/registerInfor')
        }
    }

    /**
     * 获取验证码
     */
    getPcode = () => {
        var phoneValidator = this.props.form.getFieldError('phone')
        var phone = this.props.form.getFieldProps('phone').value
        if (!phone) { this.openModal('请输入电话号码') }
        else if (phoneValidator) { this.openModal(phoneValidator[0]) }
        else {
            let data = Object2FormData({ phone, type: 1 })
            apiUser.getCode(data)
                .then(data => {
                    if (data && data.code === 200) { this.setState({ pcode: data.data.code }); Toast.success(`短信验证码是：${data.data.code}`) }
                    else { this.openModal(data.data.msg) }
                })
        }
    }

    /**
     * 调用 modal 框
     * @param {String} msg modal 的body显示的文本信息 
     */
    openModal = (msg) => {
        this.setState({
            modalFlag: true,
            modalMsg: msg
        })
    }

    /**
     * 关闭 modal 框
     */
    closeModal = () => {
        this.setState({
            modalFlag: false
        })
    }

    // 手机号码验证
    validatorPhone = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback(new Error("电话号码不能为空"))
        } else if (!Reg.phone.test(value)) {
            callback(new Error('电话号码输入有误'))
        } else {
            // 成功
        }
    }

    // 验证码验证
    validatorPcode = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback(new Error("请输入短信验证码"))
        } else if (value !== this.state.pcode) {
            callback(new Error("验证码不正确, 验证码是：" + this.state.pcode))
        }
    }

    render() {

        const { getFieldProps, getFieldError } = this.props.form
        const { pcode } = this.state;

        return (
            <div className="register">
                <div className="head">
                    <p className="title">手机号注册</p>
                    <p className="descr">手机号码满足格式就行，验证码{pcode ? pcode : '(请输入手机号获取验证码)'}</p>
                </div>
                <div className="body">
                    <InputItem
                        {
                        ...getFieldProps('phone', {
                            rules: [{ "validator": this.validatorPhone }]
                        })
                        }
                        error={!!getFieldError('phone')}
                        onErrorClick={() => Toast.info(getFieldError('phone')[0], 1)}
                        placeholder="请编写您的电话号码"
                        defaultValue="18224751748"
                        clear
                    ></InputItem>
                    <InputItem
                        defaultValue="0000"
                        {
                        ...getFieldProps('pcode', {
                            rules: [{ "validator": this.validatorPcode }]
                        })
                        }
                        error={!!getFieldError('pcode')}
                        onErrorClick={() => Toast.info(getFieldError('pcode')[0], 1)}
                        placeholder="请输入验证码 0000"
                        clear
                        extra={<span className="getCode">获取验证码</span>}
                        onExtraClick={this.getPcode}
                    ></InputItem>
                    <Button type="primary" className="btn-login" onClick={this.register} disabled={this.state.btnDisabled} >同意并注册</Button>
                    <div className="agreements">
                        已阅读并同意以下协议<Link to="/agreement/0">淘宝平台服务协议</Link>
                        <Link to="/agreement/1">隐私权政策</Link>
                        <Link to="/agreement/2">法律声明</Link>
                        <Link to="/agreement/3">支付宝及客户端服务协议</Link>
                    </div>
                </div>
                <Modal
                    visible={this.state.modalFlag}
                    footer={[{ text: <span style={{ color: '#ff5000' }}>确 定</span>, onPress: this.closeModal }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    transparent
                    maskClosable={false}
                >
                    {this.state.modalMsg}
                </Modal>
            </div>
        )
    }
}


export default createForm()(Register)
