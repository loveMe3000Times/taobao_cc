import React, { Component } from 'react'
import { Flex, InputItem, Button, Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import md5 from 'md5'

import './login.scss';
import regType from '../../utils/reg';
import apiUser from '../../api/user'
import { userUpdate } from '../../redux/actions'
import { Object2FormData } from '../../utils/format'

class Login extends Component {

    state = {
        loginMethod: "account", // 登录方式： account : 账号密码登录， phone: 电话号码登录
        passwordInput: {
            type: "password", // 登录密码框类型 password | text
            icon: "icon-attentionforbid", // icon-attention
        },
        modalFlag: false, // 模态框状态
        modalMsg: "", // 模态框内容
        pcode: '', // 短信验证码

    }

    /**
     * 自定义的验证方式
     * @param {Object}   rule      可以在里面获取到验证对象(getFieldProps 的第一个参数对应)
     * @param {String}   value     输入框当前值
     * @param {Function} callback  触发失败的回调函数(返回错误信息)
     */
    validatorAccount = (rule, value, callback) => {
        value = value.trim();
        if (value === "") {
            callback(new Error("用户名不正确，请重新输入"))
        } else if (value.length < regType.account.minLength || value.length > regType.account.maxLength) {
            callback(new Error("用户名格式不正确，长度为6~20位，请重新输入"))
        }
    }

    validatorPassword = (rule, value, callback) => {
        if (regType.password.index.test(value)) {
            // callback(new Error(""));
        } else {
            callback(new Error("密码格式错误"));
        }
    }

    // 手机号码验证
    validatorPhone = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback(new Error("电话号码不能为空"))
        } else if (!regType.phone.test(value)) {
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

    loginByPassword = () => {
        const { getFieldError, getFieldProps } = this.props.form;

        const account = getFieldProps('account').value; // 用户输入用户名
        const accountErrorArray = getFieldError('account'); // 用户名验证错误信息
        let password = getFieldProps('password').value; // 用户输入密码
        const passwordErrorArray = getFieldError('password') // 账号验证错误信息
        if (accountErrorArray && accountErrorArray.length > 0) {
            this.openModal(accountErrorArray[0]);
            return;
        }
        else if (passwordErrorArray && passwordErrorArray.length > 0) {
            this.openModal(passwordErrorArray[0]);
            return;
        } else if (account && password) {
            // 登录成功
            // this.openModal("登录中...")
            password = md5(password)
            apiUser.loginByPassword(Object2FormData({ account, password }))
                .then(data => {
                    if (data.code === 200) {
                        this.props.userUpdate(data.data);
                        window.localStorage.setItem('Id', data.data.id);
                        window.localStorage.setItem('Token', data.data.token);
                        this.props.history.push('/home')
                    } else {
                        this.openModal(data.data.msg)
                    }
                })
                .catch(error => {
                    this.openModal('登录失败（前端）')
                })
        } else {
            this.openModal("请填写用户名和密码")
        }
    }

    // 电话号码登录
    loginByPhone = () => {
        const { getFieldError, getFieldProps } = this.props.form;

        const pcode = getFieldProps('pcode').value; // 用户输入用户名
        const pcodeErrorArray = getFieldError('pcode'); // 用户名验证错误信息
        let phone = getFieldProps('phone').value; // 用户输入密码
        const phoneErrorArray = getFieldError('phone') // 账号验证错误信息
        if (pcodeErrorArray && pcodeErrorArray.length > 0) {
            this.openModal(pcodeErrorArray[0]);
            return;
        }
        else if (phoneErrorArray && phoneErrorArray.length > 0) {
            this.openModal(phoneErrorArray[0]);
            return;
        } else if (pcode && phone) {
            // 登录成功
            // this.openModal("登录中...")
            apiUser.loginByPhone(Object2FormData({ pcode, phone }))
                .then(data => {
                    if (data.code === 200) {
                        this.props.userUpdate(data.data);
                        window.localStorage.setItem('Id', data.data.id);
                        window.localStorage.setItem('Token', data.data.token);
                        this.props.history.push('/home')
                    } else {
                        this.openModal(data.data.msg)
                    }
                })
                .catch(error => {
                    this.openModal('登录失败（前端）')
                })
        } else {
            this.openModal("请填写用户名和密码")
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
            let data = Object2FormData({ phone, type: 2 })
            apiUser.getCode(data)
                .then(data => {
                    if (data && data.code === 200) { this.setState({ pcode: data.data.code }); this.openModal(`短信验证码是：${data.data.code}`) }
                    else { this.openModal(data.data.msg) }
                })
        }
    }

    // 密码输入框显示按钮: 修改密码框类型 & icon样式
    seePassword = () => {
        let passwordInput = this.state.passwordInput;
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordInput.icon = 'icon-attention'
        } else if (passwordInput.type === 'text') {
            passwordInput.type = 'password';
            passwordInput.icon = 'icon-attentionforbid'
        }
        this.setState({ passwordInput })
    }

    /**
     *  打开模态框
     * @param {String} text 模态框显示文本信息
     */
    openModal = (text) => {
        this.setState({
            modalFlag: true,
            modalMsg: text
        })
    }

    // 关闭模态框
    modalClose = () => {
        this.setState({
            modalFlag: false
        })
    }

    /**
     * 修改登录方式 
     * 登录方式： account : 账号密码登录， phone: 电话号码登录
     */
    changeLoginMethod = () => {
        let loginMethod = this.state.loginMethod;
        loginMethod = loginMethod === 'account' ? 'phone' : 'account';
        this.setState({ loginMethod });
    }

    toRegister = () => {
        this.props.history.push("/register")
    }

    render() {

        const { getFieldProps } = this.props.form;
        const { loginMethod } = this.state;

        return (
            <div className="login">
                <Flex className="header">
                    <div className="logo">
                        <img src="/images/logo.png" alt="" />
                    </div>
                </Flex>
                <div className="body">
                    {
                        loginMethod === 'account' ?
                            < div className="login-account">
                                <InputItem
                                    name="account"
                                    clear
                                    {
                                    ...getFieldProps('account', {
                                        rules: [{ "validator": this.validatorAccount }]
                                    })
                                    }
                                    placeholder="手机号/邮箱/会员名"
                                >
                                </InputItem>
                                <InputItem
                                    name="password"
                                    type={this.state.passwordInput.type}
                                    clear
                                    {
                                    ...getFieldProps('password', {
                                        rules: [{ "validator": this.validatorPassword }]
                                    })
                                    }
                                    placeholder="请输入登录密码"
                                    extra={<span className={"iconfont " + this.state.passwordInput.icon}></span>}
                                    onExtraClick={this.seePassword}
                                >
                                </InputItem>
                                <div className="login-fun">
                                    <div className="login-change" onClick={this.changeLoginMethod}>短信验证码登录</div>
                                    <div className="register" onClick={this.toRegister}>免费注册</div>
                                </div>
                            </div>
                            : ''
                    }
                    {
                        loginMethod === 'phone' ?
                            < div className="login-phone">
                                <InputItem
                                    name="phone"
                                    clear
                                    {
                                    ...getFieldProps('phone', {
                                        rules: [{ "validator": this.validatorPhone }]
                                    })
                                    }
                                    placeholder="手机号码"
                                >
                                    <select name="">
                                        <option value="1006">+1008</option>
                                    </select>
                                </InputItem>
                                <InputItem
                                    name="pcode"
                                    className="pcode"
                                    clear
                                    {
                                    ...getFieldProps('pcode', {
                                        rules: [{ "validator": this.validatorPcode }]
                                    })
                                    }
                                    placeholder="请输入验证码"
                                    extra={<span className="getCode">获取验证码</span>}
                                    onExtraClick={this.getPcode}
                                >
                                </InputItem>
                                <div className="login-fun">
                                    <div className="login-change" onClick={this.toRegister}>免费注册</div>
                                </div>
                            </div>
                            : ''
                    }
                    <Button type="primary" className="btn-login" onClick={this.loginByPhone} >登录</Button>
                    {
                        loginMethod === "phone" ? <Button type="ghost" className="btn-login btn-login2" onClick={this.changeLoginMethod} >账号密码登录</Button> : ""
                    }
                </div>
                <Modal
                    visible={this.state.modalFlag}
                    transparent
                    maskClosable={false}
                    footer={[{ text: <p style={{ color: '#ff5000' }}>确定</p>, onPress: () => { this.modalClose(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    onClose={this.modalClose}
                >
                    {this.state.modalMsg}
                </Modal>
            </div >
        )
    }
}

Login = createForm()(Login)
Login = withRouter(Login)
Login = connect(null, { userUpdate })(Login)

export default Login