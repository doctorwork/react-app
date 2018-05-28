/*
 * File: mixin.js
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>)
 * Date: 2018-04-Sa 05:47:28
 * Copyright 2018 - 2018 © Doctorwork
 */
import React from 'react';
import hybrid, { isHybrid } from '../api/hybrid';
import * as api from '../api';
import Scene from '../components/Scene';
import { Route } from 'react-router-dom';
import renderHeader from '../components/Header';
import { parseQuery, isFullUrl } from '../utils';
import toast from '../components/Toast/index';
import events from '../api/events';

import { config } from '../api/wechat';
import { platform } from '../utils';

function getUrl(options, base = '') {
    let url = typeof options === 'string' ? options : options.url;

    if (!isFullUrl(url)) {
        return base + url;
    }

    return url;
}

class History {
    history = null;

    setHistory(history) {
        this.history = history;
    }
}

const base = location.origin + process.env.PUBLIC_URL;

// 浏览器跳转
class forwardWithHistory extends History {
    constructor(props) {
        super(props);
        return this;
    }

    forward = (options, state, method = 'push') => {
        let url = getUrl(options);
        if (isFullUrl(url)) {
            return (location.href = url);
        }

        if (platform.wechat) {
            // return (location.href = location.origin + history.base + url);
        }
        this.history[method](url, state);
    };
    setHistory(history) {
        this.history = history;
        this.replace = this.replace;
    }
}

// hybrid 跳转
// eslint-disable-next-line
class forwardWithHybrid extends History {
    constructor(props) {
        super(props);
        return this;
    }

    forward = (options: any, params: any) => {
        let url = getUrl(options, base);
        hybrid('forward', { ...params, url });
    };
}

forwardWithHybrid.replace = () => {
    hybrid('back');
    forwardWithHybrid(...arguments);
};

export const forwardFactory = isHybrid
    ? new forwardWithHybrid()
    : new forwardWithHistory();

// 后退
export const back = function(history) {
    isHybrid ? hybrid('back') : history.goBack();
};

let watched = false;

const watchRoute = history => {
    if (watched) return;
    watched = true;
    history.listen(() => {
        config(true);
    });
};

export const RouteWithSubRoutes = (route: any) => (
    <Route
        path={route.path}
        render={props => {
            const { history } = props;
            watchRoute(history);
            forwardFactory.setHistory(history);

            const global = {
                forward: forwardFactory.forward,
                back: back.bind(route.component, history),
                hybrid,
                api,
                toast,
                events
            };

            props.location.query = parseQuery(props.location.search);

            return (
                <Scene
                    renderHeader={renderHeader(route.component, props)}
                    renderChild={(showError: Function): any => (
                        <route.component
                            {...props}
                            routes={route.routes}
                            global={{ ...global, showError }}
                        />
                    )}
                />
            );
        }}
    />
);
