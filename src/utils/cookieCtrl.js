/* 设置Cookie
* @param {string} cookieName Cookie 名称
* @param {string} cookieValue Cookie 值
* @param {string} nDays Cookie 过期天数
*/
export function SetCookie(cookieName, cookieValue, nDays) {
    var today = new Date();

    var expire = new Date();

    if (nDays == null || nDays == 0) nDays = 1;

    expire.setTime(today.getTime() + nDays * 24 * 60 * 60 * 1000); //获取毫秒数

    document.cookie =
        cookieName +
        '=' +
        escape(cookieValue) +
        ';expires=' +
        expire.toGMTString();
}
// * 读取指定的Cookie值
//  * @param {string} cookieName Cookie名称
//  */

export function GetCookie(cookieName) {
    var theCookie = '' + document.cookie;

    var ind = theCookie.indexOf(cookieName);

    if (ind == -1 || cookieName == '') return '';

    var ind1 = theCookie.indexOf(';', ind);
    if (ind1 == -1) ind1 = theCookie.length;

    return unescape(theCookie.substring(ind + cookieName.length + 1, ind1));
}
