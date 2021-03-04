import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'

import Img from './temp.webp'
import './recommendItem.scss'

class RecommendItem extends Component {
    render() {
        return (
            <Link className="recommend-item" to={'/container/shopDetail/' + 0}>
                <div className="img-box">
                    <img src={Img} alt=""/>
                </div>
                <div className="text-box">
                    <div className="desc">
                    商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述
                    </div>
                    <div className="infor">
                        <div className="money">999</div>
                        <div className="sold-num">24</div>
                    </div>
                </div>
            </Link>
        )
    }
}


export default withRouter(RecommendItem)