import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Store extends Component {

    state = {
        storeId: 0
    }

    componentDidMount() {
        // 获取 商品id
        let { storeId } = this.props.match.params
        this.setState({ storeId })
    }

    render() {
        let { storeId } = this.state;
        return (
            <div className='shop'>
                Store_Id --- {storeId}
            </div>
        )
    }
}

Store = withRouter(Store)

export default Store