/*
 * File: index.js
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>) 
 * Date: 2018-04-Fr 10:57:59
 * Copyright 2018 - 2018 © Doctorwork
 */
import React from 'react';
import { parseQuery } from '../../utils';
import hybrid, { isHybrid } from '../../api/hybrid';
const isFunc = obj => typeof obj === 'function';
import defaultsDeep from 'lodash/defaultsDeep';
import { updateTitle } from '../../utils/wechat';

const height = '40px';

/**
 * 设置 hyrid header
 * @param {object} options
 */
export function setHybridHeader(options) {
    if (!options || options.skipHybrid || options.skip) {
        return;
    }

    options = defaultsDeep(
        {
            headerStyle: {}
        },
        options
    );

    const [title, background, color] = [
        options.title,
        options.headerStyle.backgroundColor,
        options.headerTintColor
    ];

    if (!isHybrid && window) {
        updateTitle();
        return (document.title = title);
    }

    hybrid('header', { title, background, color });
}

export const getNavigationOptions = (navigationOptions, props) => {
    const query = parseQuery(props.location.search);
    const params = props.match.params;
    // prettier-ignore
    const options = isFunc(navigationOptions)
        ? navigationOptions({
            navigation: {
                state: {
                    ...props.match,
                    params: {
                        ...params,
                        ...query
                    }
                }
            }
        })
        : navigationOptions;

    return options;
};

export default (component: any, props: any) => {
    const { navigationOptions } = component;
    const isAsync = component.prototype.constructor.name == 'Async';

    return function Header() {
        const options = getNavigationOptions(navigationOptions, props);
        // hybrid 调用
        !isAsync && setHybridHeader(options);

        return (options && options.skip) || isAsync ? null : (
            <div className="app-header">
                <div className="app-status-bar" />
                <div className="app-header-content" height={height}>
                    {options.title}
                </div>
            </div>
        );
    };
};
