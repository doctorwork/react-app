/*
 * File: index.js
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>)
 * Date: 2018-04-Fr 10:14:01
 * Copyright 2018 - 2018 © Doctorwork
 */
import { replaceParams, isFullUrl, appendQuery } from '../utils';
import { request as hybridRequest, isHybrid } from './hybrid';
import toast from '../components/Toast';
const API_PATH = process.env.REACT_APP_API || '/api/v1';
const DOMAIN = process.env.REACT_APP_WEB_DOMAIN || location.origin;
const GRAPHQL_PATH = process.env.REACT_APP_GRAPHQL_PATH || DOMAIN + '/graphql';

/**
 * 请求快捷方法
 * @param {string} method 请求方法 get/post/put/delete
 * @param {string} url url 地址
 * @param {object} opts 请求选项
 */
export const request = (method, url, data = {}, options = {}) => {
    const payload = {
        method: method.toUpperCase(),
        credentials: 'include',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    };

    if (payload.method === 'GET') {
        url = appendQuery(url, data);
    } else {
        payload.body = JSON.stringify(data);
    }

    if (process.env.APP_USE_MOCK) {
        delete payload.credentials;
    }

    return fetch(url, Object.assign(payload, options)).then(res => {
        if (res.status !== 200) {
            return Promise.reject(res.statusText);
        }

        return res.json();
    });
};

const responseHandler = res => {
    const { data, errcode, errmsg } = res;
    if (!errcode) {
        return data;
    } else {
        toast(errmsg);
        return Promise.reject(res);
    }
};

const gateway = isHybrid ? hybridRequest : request;
/**
 * return (url, data, params) => {}
 */
export const [get, post, put, del] = ['GET', 'POST', 'PUT', 'DELETE'].map(
    method => {
        return function(url, data, params, options) {
            url = replaceParams(params)(isFullUrl(url) ? url : API_PATH + url);

            return gateway
                .call(null, method, url, data, options)
                .then(responseHandler);
        };
    }
);

/**
 * 修改档次请求的默认参数
 * @param {object} options
 *  withOptions({headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
 */
export const withOptions = options => {
    return sender => {
        return function() {
            return sender.apply(null, [...arguments, options]);
        };
    };
};

export const graphql = query => {
    return post(GRAPHQL_PATH, { query });
};

/**
 * 通过表单方式请求
 */
export const byForm = withOptions({
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
});
