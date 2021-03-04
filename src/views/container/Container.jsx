import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter, Route, Redirect } from 'react-router'

import './container.scss'
import Home from '../home/Home'
import Cart from '../cart/Cart'
import OrderList from '../orderList/OrderList'
import Me from '../me/Me'
import ShopDetail from '../shopDetail/ShopDetail'
import Store from '../store/Store'

class Container extends Component {

    state = {
        selectedTab: 'home',
    }

    componentDidMount = () => {
        // 初始话tabBar选中
        let tabTemp = window.localStorage.getItem('containerTabBar');
        tabTemp && this.tabBarPress(tabTemp);
    }

    /**
     * tabBar.Item 点击回调
     * @param {String} tabBarAim 选中的tab(跳转的路径)
     */
    tabBarPress = (tabBarAim) => {
        this.setState({ selectedTab: tabBarAim });
        window.localStorage.setItem('containerTabBar', tabBarAim);
        this.props.history.push('/container/' + tabBarAim);
    }

    render() {

        return (
            <div className="container" direction='column'>
                <div className="container-main">
                    <Route path="/container/home" component={Home}></Route>
                    <Route path="/container/cart" component={Cart}></Route>
                    <Route path="/container/orderList" component={OrderList}></Route>
                    <Route path="/container/me" component={Me}></Route>
                    <Route path="/container/shopDetail/:shopId" component={ShopDetail}></Route>
                    <Route path="/container/store/:storeId" component={Store}></Route>
                    <Redirect to="/container/home"></Redirect>
                </div>
                <TabBar unselectedTintColor="#949494" tintColor="#ff5500" barTintColor="white" >
                    <TabBar.Item
                        title="主页"
                        key="home"
                        icon={<span className="iconfont icon-home"></span>}
                        selectedIcon={<span className="iconfont icon-homefill"></span>}
                        selected={this.state.selectedTab === 'home'}
                        onPress={() => { this.tabBarPress('home') }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="购物车"
                        key="cart"
                        icon={<span className="iconfont icon-cart"></span>}
                        selectedIcon={<span className="iconfont icon-cartfill"></span>}
                        selected={this.state.selectedTab === 'cart'}
                        onPress={() => { this.tabBarPress('cart') }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="订单列表"
                        key="orderList"
                        icon={<span className="iconfont icon-form"></span>}
                        selectedIcon={<span className="iconfont icon-formfill"></span>}
                        selected={this.state.selectedTab === 'orderList'}
                        onPress={() => { this.tabBarPress('orderList') }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="我的"
                        key="me"
                        icon={<span className="iconfont icon-my"></span>}
                        selectedIcon={<span className="iconfont icon-myfill"></span>}
                        selected={this.state.selectedTab === 'me'}
                        onPress={() => { this.tabBarPress('me') }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}

Container = withRouter(Container)

export default Container