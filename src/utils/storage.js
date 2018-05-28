/**
 * @author [insane]
 * @email [luojieyy@gmail.com]
 * @create date 2017-12-07 06:52:58
 * @modify date 2017-12-07 06:52:58
 * @desc simple storage
 */
import hybrid, { isHybrid } from '../api/hybrid';

let db = localStorage;

const isObject = sub => typeof sub === 'object';

const storage = {
    proxy(action) {
        // db 检查
        return (...args) => {
            return db[action](...args);
        };
    }
};

export const setItem = (key, val) => {
    let obj = {};
    obj[key] = isObject(val) ? JSON.stringify(val) : val;
    if (isHybrid) {
        hybrid('storage', {
            action: 'set',
            hash: obj
        });
    } else {
        return storage.proxy('setItem')(key, JSON.stringify(val));
    }
};

export const clearItem = (key, val = null) => {
    let obj = {};
    obj[key] = isObject(val) ? JSON.stringify(val) : val;
    if (isHybrid) {
        hybrid('storage', {
            action: 'remove',
            hash: obj
        });
    } else {
        return storage.proxy('clear')(key, val);
    }
};

export const getItem = key => {
    return new Promise(function(resolve) {
        if (isHybrid) {
            hybrid(
                'storage',
                {
                    action: 'get'
                },
                function(res) {
                    resolve(res[key]);
                }
            );
        } else {
            resolve(storage.proxy('getItem')(key));
        }
    });
};
