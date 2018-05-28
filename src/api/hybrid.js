/*
 * File: hybrid.js
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>) 
 * Date: 2018-04-Fr 03:16:45
 * Copyright 2018 - 2018 © Doctorwork
 */

import events from './events';
export const isHybrid = /Hybrid/.test(navigator.userAgent);
export const env = {
    Android: /Android/.test(navigator.userAgent)
};

const Hybrid = {
    handlers: {},
    callback({ data, callback }) {
        this.handlers[callback](data);
    },
    on(callback, watcher) {
        this.handlers[callback] = watcher;
    },
    event(type) {
        events.fire(type);
    }
};

window.Hybrid = Hybrid;

const protocols = [
    'pay',
    'forward',
    'upload',
    'header',
    'init',
    'location',
    'loading',
    'modal',
    'back',
    'scroll',
    'pageshow',
    'pagehide',
    'device',
    'fetch',
    'clipboard',
    'permissions',
    'heathSet',
    'loginOut',
    'dismiss',
    'selectHeathData',
    'share',
    'storage',
    'statusBar',
    'storage'
];

const mappers = {};

/**
 * 底层协议实现
 * @param {*string} command 协议名称
 * @param {*object} opts 协议参数
 */
function invoke(command, opts = {}, ctx) {
    if (mappers[command]) {
        opts = mappers[command](opts, ctx);
    }

    let params = {
        name: command,
        ...opts
    };

    if (env.Android) {
        window.requestHybrid.postMessage(JSON.stringify(params));
    } else {
        window.webkit.messageHandlers.requestHybrid.postMessage(params);
    }
    return true;
}

let increment = 1;

const hybrid = function(action, opts = {}, callback) {
    // 检查 action 是否可用
    if (!protocols.includes(action)) {
        throw `protocol ${action} not supported`;
    }

    const time = new Date().getTime();
    const event = `hybrid_callback_${action}_${time}_${increment++}`;

    if (!isHybrid) {
        return Promise.resolve('not in hybrid environment');
    }
    Hybrid.on(event, callback);
    invoke(action, { params: opts, callback: event }, this);
};

export default hybrid;

export const request = function(method, url, data, options) {
    return new Promise((resolve, reject) => {
        hybrid(
            'fetch',
            {
                url,
                body: data,
                method,
                ...options
            },
            ({ data, status, statusText }) => {
                if (status >= 400) {
                    return reject(statusText);
                }
                resolve(JSON.parse(data));
            }
        );
    });
};
