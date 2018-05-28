export const updateTitle = title => {
    //以下代码可以解决以上问题，不依赖jq
    setTimeout(function() {
        //利用iframe的onload事件刷新页面
        document.title = title || '企鹅健康';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function() {
            setTimeout(function() {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }, 0);
};
