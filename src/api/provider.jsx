/*
 * File: provider.jsx
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>) 
 * Date: 2018-04-Sa 03:24:08
 * Copyright 2018 - 2018 © Doctorwork
 */

import { Provider } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { request } from './index';

export class ApiProvider extends PureComponent {
    getChildrenContext() {
        const { store } = this.props;
        return { api: request, store };
    }

    render() {
        return (
            <Provider store={this.props.store}>{this.props.children}</Provider>
        );
    }
}

ApiProvider.propTypes = {
    store: PropTypes.object,
    api: PropTypes.func
};
