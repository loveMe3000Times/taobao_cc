import React, { Component } from 'react'

import bgImg from './images/wouldLikeLineText.png';

const imgStyle = {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%'
}

export default class WouldLikeLine extends Component {
    render() {
        return (
            <div className="would-like-line" style={{padding: '.32rem 2.85rem'}}>
                <img src={bgImg} alt="" style={imgStyle} />
            </div>
        )
    }
}
