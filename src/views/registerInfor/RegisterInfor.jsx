import React, { Component } from 'react'
import { NavBar, Icon, InputItem, Button, Modal } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { createForm } from 'rc-form'
import md5 from 'md5'
import { connect } from 'react-redux'

import './registerInfor.scss';
import regType from '../../utils/reg';
import api from '../../api/user';
import { userUpdate } from '../../redux/actions';

class RegisterInfor extends Component {

    state = {
        passwordInput: {
            type: "password", // 登录密码框类型 password | text
            icon: "icon-attentionforbid", // icon-attention
        },
        modalFlag: false, // 模态框状态
        modalMsg: "", // 模态框内容
    }

    makeSure = () => {
        const { getFieldError, getFieldProps } = this.props.form;
        const { userUpdate } = this.props

        const account = getFieldProps('account').value; // 用户输入用户名
        const accountErrorArray = getFieldError('account'); // 用户名验证错误信息
        const password = getFieldProps('password').value; // 用户输入密码
        const passwordErrorArray = getFieldError('password') // 账号验证错误信息
        if (accountErrorArray && accountErrorArray.length > 0) {
            this.openModal(accountErrorArray[0]);
            return;
        } else if (passwordErrorArray && passwordErrorArray.length > 0) {
            this.openModal(passwordErrorArray[0]);
            return;
        } else if (account && password) {
            // 信息填写成功
            let phone = window.sessionStorage.getItem('phone');
            let fd = new FormData();
            fd.append('phone', phone);
            fd.append('account', account);
            fd.append('password', md5(password));
            api.register(fd).then(data => {
                if (data.code === 200) {
                    data = data.data;
                    window.localStorage.setItem('Token', data.token);
                    window.localStorage.setItem('Id', data.id);
                    userUpdate(data);
                } else {
                    data = data.data;
                    if (typeof data === 'object') {
                        let str = ""
                        Object.values(data).forEach((item) => { str += item; });
                        this.openModal(str);
                    }
                }
            })
        } else {
            this.openModal("请填写用户名和密码")
        }
    }

    /**
 * 自定义的验证方式
 * @param {Object}   rule      可以在里面获取到验证对象(getFieldProps 的第一个参数对应)
 * @param {String}   value     输入框当前值
 * @param {Function} callback  触发失败的回调函数(返回错误信息)
 */
    validatorAccount = (rule, value, callback) => {
        value = value.trim();
        if (value.length >= regType.account.minLength && value.length <= regType.account.maxLength) {
            // 成功
        } else {
            callback(new Error("用户名格式不正确，请重新输入"))
        }
    }

    validatorPassword = (rule, value, callback) => {
        if (regType.password.index.test(value)) {
            // callback(new Error(""));
        } else {
            callback(new Error("密码格式错误"));
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

    render() {

        const { getFieldProps } = this.props.form;

        return (
            <div className="register-infor">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >设置用户信息</NavBar>
                <div className="body">
                    <div className="input-item">
                        <InputItem
                            clear
                            {
                            ...getFieldProps('account', {
                                rules: [{ "validator": this.validatorAccount }]
                            })
                            }
                            placeholder="会员名"
                        >
                        </InputItem>
                        <p className="ps">6~25个字符，推荐使用中文，请一定要包含姓名、身份证、银行卡等隐私信息，可用于登录找回密码</p>
                    </div>
                    <div className="input-item">
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
                        <p className="ps">密码由6-20位英文字日、数字或符号组成</p>
                    </div>
                    <Button type="ghost" className="btn-login" onClick={this.makeSure} >确 认</Button>
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
            </div>
        )
    }
}

RegisterInfor = createForm()(RegisterInfor);
RegisterInfor = connect(
    state => ({ user: state.user }),
    {
        userUpdate
    }
)(RegisterInfor);

export default withRouter(RegisterInfor)
