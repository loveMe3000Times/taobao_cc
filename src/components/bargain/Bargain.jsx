import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Carousel, Badge } from 'antd-mobile'

import './bargain.scss'
import fn_tmxp from '../../assets/images/fn_tmxp.png'

class Bargain extends Component {
    render() {
        return (
            <div className="bargain" onClick={() => this.props.history.push('/unrealized')}>
                <div className="warp">
                    <div className="left">
                        <div className="row">
                            <div className="row-title">
                                <span>聚划算</span>
                            </div>
                            <div className="row-container">
                                <div className="bargain-item" style={{ backgroundColor: 'rgb(254, 240, 240)', }}>
                                    <div className="item-title" style={{ color: '#F56C6C' }}>品牌折扣</div>
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                                <div className="bargain-item" style={{ backgroundColor: 'rgb(254, 240, 240)', }}>
                                    <div className="item-title">划算好货</div>
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-title">
                                <span>掏抢购</span>
                                <span>天天特卖</span>
                            </div>
                            <div className="row-container">
                                <div className="bargain-item">
                                    <div className="item-title" style={{ color: '#F56C6C' }}>限时半价</div>
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                                <div className="bargain-item" style={{ backgroundColor: 'rgb(254, 240, 240)', }}>
                                    <div className="item-title" style={{ color: '#E6A23C' }}>9.9包邮</div>
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-title">
                                <span>每日好店</span>
                            </div>
                            <div className="row-container">
                                <div className="bargain-item">
                                    <div className="item-title" style={{ color: '#E6A23C' }}>深挖藏店</div>
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                                <div className="bargain-item">
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="row">
                            <div className="row-title">
                                <span>淘宝直播</span>
                            </div>
                            <div className="row-container">
                                <div className="bargain-item">
                                    <div className="item-title" style={{ color: '#409EFF' }}>好物传送</div>
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                                <div className="bargain-item">
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-title">
                                <span>有好货<Badge text="品质好物" size="small" hot style={{ marginLeft: 12 }} /></span>
                            </div>
                            <div className="row-container">
                                <div className="bargain-item">
                                    <div className="item-title" style={{ color: '#F56C6C' }}>全民推荐</div>
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                                <div className="bargain-item">
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-title">
                                <span>哇哦视频</span>
                            </div>
                            <div className="row-container">
                                <div className="bargain-item">
                                    <div className="item-title">粉丝爱看</div>
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                                <div className="bargain-item" style={{ backgroundColor: 'rgb(254, 240, 240)', }}>
                                    <img src={fn_tmxp} alt="" className="item-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="notice">
                    <div className="title">淘宝头条</div>
                    <Carousel
                        className="cont"
                        vertical
                        dots={false}
                        dragging={false}
                        swiping={false}
                        autoplay
                        infinite
                        autoplayInterval={1500}
                    >
                        {/* <NoticeBar
                            icon={<Tag className='notice-tag' small style={tagStyle}>头条</Tag>}
                            style={{ height: '.43rem', lineHeight: '.43rem', backgroundColor: '#fff' }}
                        >
                            淘宝新闻 》 淘宝新闻 》 淘宝新闻 》 淘宝新闻 》 淘宝新闻 》
                        </NoticeBar> */}
                        <Link className="notice-item ellipsis" to='/unrealized'>
                        1 淘宝新闻 》 淘宝新闻 》 淘宝新闻 》 淘宝新闻 》 淘宝新闻 》
                        </Link>
                        <Link className="notice-item ellipsis" to='/unrealized'>
                        2 淘宝新闻 》 淘宝新闻 》 淘宝新闻 》 淘宝新闻 》 淘宝新闻 》
                        </Link>
                    </Carousel> </div >
            </div >
        )
    }
}

Bargain = withRouter(Bargain)

export default Bargain