import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ShopDetail extends Component {

    state = {
        shopId: 0
    }

    componentDidMount() {
        // 获取 商品id
        let { shopId } = this.props.match.params
        this.setState({ shopId })
    }

    render() {
        let { shopId } = this.state;
        return (
            <div className='shop'>
                Shop --- {shopId}
            </div>
        )
    }
}

ShopDetail = withRouter(ShopDetail)

export default ShopDetail