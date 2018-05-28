/**
 *
 * @param {*function} fn 待转换函数
 * @param {*number} arity  参数个数
 * @param {*array} a 参数
 */
export function convertToFP(fn, arity, a) {
    a = a || [];

    if (a.length >= arity) {
        return fn.apply(null, a.slice(0, arity).reverse());
    }

    return function() {
        var args = Array.prototype.slice.call(arguments);
        return convertToFP(fn, arity, a.concat(args));
    };
}

import _addMonths from 'date-fns/add_months';
import _format from 'date-fns/format';
import _addYears from 'date-fns/add_years';
import _addDays from 'date-fns/add_days';
import _parse from 'date-fns/parse';
import _startOfWeek from 'date-fns/start_of_week';
import _subMonths from 'date-fns/sub_months';
import _subDays from 'date-fns/sub_days';

import zh_cn from 'date-fns/locale/zh_cn';

export const format = format => {
    return function(date) {
        return _format(date, format, {
            locale: zh_cn
        });
    };
};
export const addYears = convertToFP(_addYears, 2);
export const addMonths = convertToFP(_addMonths, 2);
export const addDays = convertToFP(_addDays, 2);

export const subMonths = convertToFP(_subMonths, 2);
export const subDays = convertToFP(_subDays, 2);

export const parse = convertToFP(_parse, 2)({});
export const startOfWeek = convertToFP(_startOfWeek, 2)({ weekStartsOn: 1 });
export { default as startOfMonth } from 'date-fns/start_of_month';
