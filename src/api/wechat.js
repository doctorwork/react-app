import * as api from './index';
const wx: any = window.wx;
const wxApp = process.env.REACT_APP_WX_APPID;

const wxService =
    'http://public-dev.doctorwork.com/base-rest/v1/wechat/wechat_config';

const makeShare = data => {
    wx.onMenuShareAppMessage({
        title: data.title || '企鹅健康', // 分享标题
        desc: data.desc, // 分享描述
        link: data.link || location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
            data.image ||
            'http://avatar-qiniu.doctorwork.com/o_1cd7k4baa13e71dlvck53k91jpea.png', // 分享图标
        type: data.type || 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: data.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
            // 用户确认分享后执行的回调函数
            // alert('test ok');
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
            // alert('test fail');
        }
    });
};

let pending = false;
let ready = false;

export const config = async force => {
    if (pending) return;
    if (ready && !force) {
        return Promise.resolve();
    }
    pending = true;
    const data = await api.get(
        `${wxService}?appId=${wxApp}&url=` + encodeURIComponent(location.href)
    );

    wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: [
            'scanQRCode',
            'chooseWXPay',
            'hideMenuItems',
            'closeWindow',
            'hideOptionMenu',
            'onMenuShareAppMessage',
            'onMenuShareTimeline'
        ]
    });

    ready = true;
    pending = false;
};

wx.ready(config);

wx.error(function() {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    ready = false;
    // config();
});

export const setUpShare = data => {
    config().then(() => {
        return makeShare(data);
    });
};

export const execute = method => {
    return config().then(() => {
        return wx[method].bind(wx);
    });
};
