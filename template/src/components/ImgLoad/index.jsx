/**
 * @author lvzhiyi
 *
 * @description img加载组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.styl';
class Img extends Component {
    static propTypes = {
        src: PropTypes.string,
        place: PropTypes.string
    };
    constructor() {
        super(...arguments);
        this.state = {
            error: false
        };
    }
    render() {
        const { src, place } = this.props;
        return this.state.error && !place ? (
            <div className="instead-img" />
        ) : (
            <img
                className="img-load"
                src={src && !this.state.error ? src : place}
                onError={() => {
                    this.setState({ error: true });
                }}
                alt=""
            />
        );
    }
}

export default Img;
