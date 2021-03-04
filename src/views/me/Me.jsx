import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import './me.scss'
import '../../assets/icon/iconfont'

import headerImg from './images/header_img.webp'
import img_dfh from './images/daifahuo.webp'
import img_dfk from './images/daifukuan.webp'
import img_dsh from './images/daishouhuo.webp'
import img_pj from './images/pingjia.webp'
import img_tk from './images/tuikuan.webp'

// 工具列表
const toolList = [
    { icon: '#icon-baoxiangui-xiangzi-chouti', text: '工具1', herf: '/unrealized' },
    { icon: '#icon-3Dyanjing-yanjing-guanying', text: '工具2', herf: '/unrealized' },
    { icon: '#icon-jinbi-yingbi-huobi-Coin', text: '工具3', herf: '/unrealized' },
    { icon: '#icon-huazhuangpin-fangsaishuang-BBshuang-hushoushuang', text: '工具4', herf: '/unrealized' },
    { icon: '#icon-erji-toudaishierji-shengyin-yinle', text: '工具5', herf: '/unrealized' },
    { icon: '#icon-elemo-waimai-canyin', text: '工具6', herf: '/unrealized' },
    { icon: '#icon-gaogenxie-nvxie', text: '工具7', herf: '/unrealized' },
    { icon: '#icon-hongbao-qian-jiangjin-fuli', text: '工具8', herf: '/unrealized' },
    { icon: '#icon-maikefeng-Kge-KTV-huatong', text: '工具9', herf: '/unrealized' },
    { icon: '#icon-shouji-dianhua-phone-yidongdianhua', text: '工具10', herf: '/unrealized' },
]

class Me extends Component {

    render() {

        // let { history } = this.props

        return (
            <div className='me'>
                {/* ------ 头部-用户信息 ------ */}
                <div className="user-box">
                    <div className="top">
                        <Link className="left" to="/unrealized">
                            <img src={headerImg} alt="" /> <span>设置淘宝昵称</span>
                        </Link>
                        <div className="right">
                            <Link to="/unrealized">
                                <span className="iconfont icon-people_list_light"></span>
                            </Link>
                            <Link to="/unrealized">
                                <span className="iconfont icon-settings"></span>
                            </Link>
                        </div>
                    </div>
                    <div className="bottom">
                        <Link className="item" to="/unrealized">
                            <div className="item-num">0</div>
                            <div className="item-text">收藏夹</div>
                        </Link>
                        <Link className="item" to="/unrealized">
                            <div className="item-num">0</div>
                            <div className="item-text">关注店铺</div>
                        </Link>
                        <Link className="item" to="/unrealized">
                            <div className="item-num">0</div>
                            <div className="item-text">足迹</div>
                        </Link>
                        <Link className="item" to="/unrealized">
                            <div className="item-num">0</div>
                            <div className="item-text">红包卡券</div>
                        </Link>
                    </div>
                </div>

                {/* ------ 活动专区 ------ */}
                <WingBlank size="md">
                    <WhiteSpace size="md" />
                    <Card className="card promotion-box">
                        <Card.Body className="promotion-body">
                            <Link to="/unrealized" className="promotion-item">
                                <div className="text-box">
                                    <div className="title">会员中心</div>
                                    <div className="desc">淘气值提升秘籍</div>
                                </div>
                                <div className="img-box">
                                    <svg class="svg-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-taobao"></use>
                                    </svg>
                                </div>
                            </Link>
                            <div className="dc-v"></div>
                            <Link to="/unrealized" className="promotion-item">
                                <div className="text-box">
                                    <div className="title">淘宝省钱卡</div>
                                    <div className="desc">领91元红包</div>
                                </div>
                                <div className="img-box">
                                    <svg class="svg-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-baobao-xiangbao-kuabao"></use>
                                    </svg>
                                </div>
                            </Link>
                            <div className="dc-h"></div>
                            <Link to="/unrealized" className="promotion-item">
                                <div className="text-box">
                                    <div className="title">雪糕</div>
                                    <div className="desc">特别好吃的雪糕</div>
                                </div>
                                <div className="img-box">
                                    <svg class="svg-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-bingqiling-tiantong-xuegao"></use>
                                    </svg>
                                </div>
                            </Link>
                            <div className="dc-v"></div>
                            <Link to="/unrealized" className="promotion-item">
                                <div className="text-box">
                                    <div className="title">免费领水果</div>
                                    <div className="desc">2亿人都在参与</div>
                                </div>
                                <div className="img-box">
                                    <svg class="svg-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-yingtao-chelizi-shuiguo"></use>
                                    </svg>
                                </div>
                            </Link>
                        </Card.Body>
                    </Card>
                </WingBlank>

                {/* ------ 订单列表 ------ */}
                <WingBlank size="md">
                    <WhiteSpace size="md" />
                    <Card className="order-box card">
                        <Card.Header
                            title={<span className="card-title order-title">我的订单</span>}
                            extra={<Link to="/container/orderList" className="card-extra look-all">查看全部订单&gt;</Link>}
                        />
                        <Card.Body className="order-body">
                            <Link className="order-item" to="/container/cart">
                                <img src={img_dfk} alt="" />
                                <span className="order-item-text">待付款</span>
                            </Link>
                            <Link className="order-item" to="/container/cart">
                                <img src={img_dfh} alt="" />
                                <span className="order-item-text">待发货</span>
                            </Link>
                            <Link className="order-item" to="/container/cart">
                                <img src={img_dsh} alt="" />
                                <span className="order-item-text">待收货</span>
                            </Link>
                            <Link className="order-item" to="/container/cart">
                                <img src={img_pj} alt="" />
                                <span className="order-item-text">评价</span>
                            </Link>
                            <Link className="order-item" to="/container/cart">
                                <img src={img_tk} alt="" />
                                <span className="order-item-text">退款/售后</span>
                            </Link>
                        </Card.Body>
                    </Card>
                </WingBlank>

                {/* ------ 必备工具 ------ */}
                <WingBlank size="md">
                    <WhiteSpace size="md" />
                    <Card className="tool-box card">
                        <Card.Header
                            title={<span className="card-title tool-title">必备工具</span>}
                            extra={<Link to="/unrealized" className="card-extra look-all">查看全部工具&gt;</Link>}
                        />
                        <Card.Body className="tool-body">
                            {
                                toolList.map(item => {
                                    return (
                                        <Link className="tool-item" to={item.herf}>
                                            <svg class="svg-icon" aria-hidden="true">
                                                <use xlinkHref={item.icon}></use>
                                            </svg>
                                            <span className="tool-item-text">{item.text}</span>
                                        </Link>
                                    )
                                })
                            }
                        </Card.Body>
                    </Card>
                </WingBlank>
            </div >
        )
    }
}

export default withRouter(Me)