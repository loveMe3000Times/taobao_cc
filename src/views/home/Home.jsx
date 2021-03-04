import React, { Component } from 'react'
import { Carousel, Grid } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import './home.scss'
import Bargain from '../../components/bargain/Bargain'
import WouldLikeLine from '../../components/wouldLikeLine/WouldLikeLine'
import RecommendItem from '../../components/recommendItem/RecommendItem'
import fn_tmxp from '../../assets/images/fn_tmxp.png'
import fn_aljk from '../../assets/images/fn_aljk.png'
import fn_alpm from '../../assets/images/fn_alpm.png'
import fn_czzx from '../../assets/images/fn_czzx.png'
import fn_elm from '../../assets/images/fn_elm.png'
import fn_fl from '../../assets/images/fn_fl.png'
import fn_hyzx from '../../assets/images/fn_hyzx.png'
import fn_jbzy from '../../assets/images/fn_jbzy.png'
import fn_jpjd from '../../assets/images/fn_jpjd.png'
import fn_jrbk from '../../assets/images/fn_jrbk.png'
import fn_kbsh from '../../assets/images/fn_kbsh.png'
import fn_tbch from '../../assets/images/fn_tbch.png'
import fn_thxs from '../../assets/images/fn_thxs.png'
import fn_tmcs from '../../assets/images/fn_tmcs.png'
import fn_tmgj from '../../assets/images/fn_tmgj.png'
import fn_tmms from '../../assets/images/fn_tmms.png'
import fn_xy from '../../assets/images/fn_xy.png'
import fn_zdxh from '../../assets/images/fn_zdxh.png'

class Home extends Component {

    state = {
        carouselData: [
            { id: 1, img: 'http://dummyimage.com/1180x240/a479f2/ffffff&text=img', type: 'shop' },
            { id: 2, img: 'http://dummyimage.com/1180x240/79f280/ffffff&text=img', type: 'store' },
            { id: 2, img: 'http://dummyimage.com/1180x240/f27994/ffffff&text=img', type: 'store' },
            { id: 3, img: 'http://dummyimage.com/1180x240/79b7f2/ffffff&text=img', type: 'shop' }
        ], // 轮播图数据
        fnData: [
            { img: fn_jrbk, text: '今日爆款', path: '/unrealized' },
            { img: fn_tmxp, text: '天猫新品', path: '/unrealized' },
            { img: fn_tmgj, text: '天猫国际', path: '/unrealized' },
            { img: fn_elm, text: '饿了么', path: '/unrealized' },
            { img: fn_tmcs, text: '天猫超市', path: '/unrealized' },
            { img: fn_fl, text: '分类', path: '/unrealized' },
            { img: fn_tmms, text: '天猫美食', path: '/unrealized' },
            { img: fn_aljk, text: '阿里健康', path: '/unrealized' },
            { img: fn_kbsh, text: '口碑生活', path: '/unrealized' },
            { img: fn_czzx, text: '充值中心', path: '/unrealized' },
            { img: fn_jpjd, text: '机票酒店', path: '/unrealized' },
            { img: fn_jbzy, text: '金币庄园', path: '/unrealized' },
            { img: fn_alpm, text: '阿里拍卖', path: '/unrealized' },
            { img: fn_tbch, text: '淘宝吃货', path: '/unrealized' },
            { img: fn_xy, text: '咸鱼', path: '/unrealized' },
            { img: fn_hyzx, text: '会员中心', path: '/unrealized' },
            { img: fn_zdxh, text: '造点新货', path: '/unrealized' },
            { img: fn_thxs, text: '土货鲜食', path: '/unrealized' },
        ]
    }

    render() {

        let { fnData } = this.state;
        let {history} = this.props;

        return (
            <div className='home'>
                <div className="container-header">
                    <div className="logo"><span className="iconfont icon-tao"></span></div>
                    <div className="search" onClick={() => { history.push('/search') }}>
                        <span className="iconfont icon-search"></span>
                        <span>搜索宝贝店铺</span>
                    </div>
                </div>
                {/* 录播图区域 */}
                <Carousel
                    autoplay={true}
                    infinite
                    dotActiveStyle={{ backgroundColor: '#ff5500' }}
                    className="lunbo"
                >
                    {this.state.carouselData.map(item => (
                        <Link
                            className='carousel-item'
                            to={item.type === 'shop' ? `/container/shopDetail/${item.id}` : `/container/store/${item.id}`}
                            key={item.type === 'shop' ? `shop${item.id}` : `store${item.id}`}
                        >
                            <img src={item.img} alt="" />
                        </Link>
                    ))}
                </Carousel>
                {/* 功能按钮区 */}
                <Grid
                    className="fn-area"
                    data={fnData}
                    dotActiveStyle={{ backgroundColor: '#ff5500' }}
                    hasLine={false}
                    isCarousel
                    columnNum={5}
                    itemStyle={{ padding: 0 }}
                    renderItem={
                        (item, index) => (
                            <Link className="fn-item" to={item.path} key={index}>
                                <img src={item.img} alt={item.text} />
                                <p>{item.text}</p>
                            </Link>
                        )
                    } />
                <Bargain></Bargain>
                <WouldLikeLine></WouldLikeLine>
                <div className="recommend-container">
                    <RecommendItem></RecommendItem>
                    <RecommendItem></RecommendItem>
                    <RecommendItem></RecommendItem>
                    <RecommendItem></RecommendItem>
                    <RecommendItem></RecommendItem>
                    <RecommendItem></RecommendItem>
                </div>
            </div>
        )
    }
}


export default withRouter(Home)