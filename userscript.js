// ==UserScript==
// @name         快猫/红杏/含羞草/麻豆/AvPron/皇家会所/9sex/91TV/猫咪/小天鹅/破解VIP视频免费看
// @namespace    http://tampermonkey.net/
// @version      0.38
// @description  来不及解释了，快上车！！！
// @author       w2f
 
// @match        https://*.kmkk80.com/videoContent/*
// @match        https://*.kmkk81.com/videoContent/*
// @match        https://*.kmkk82.com/videoContent/*
// @match        https://*/videoContent/*
// @include      /^https://www.kmkk\d+\.com.+$/
 
// @match        https://*/play/video/*
// @match        https://*.hxaa139.com/*
// @match        https://*.hxaa140.com/*
// @match        https://*.hxaa141.com/*
// @include      /^https://www.hxaa\d+\.com.+$/
 
// @match        https://*/playvideo/*
// @match        https://*/live/*
// @match        https://*/live
 
// @match        https://madou.bet/*
// @match        https://*.com/index
// @match        https://*.com/new
// @match        https://*.com/channel/videoList*
// @match        https://*.com/tags*
// @match        https://*.com/rankList
// @match        https://madou.tv/*
 
// @match        https://afkv28.com/*
// @match        https://afkv29.com/*
// @match        https://afkv30.com/*
 
// @match        https://*/videos/*
 
// @match        https://*/index/movie/play/id/*
 
// @match        https://kdt29.com/*
 
// @match        https://*/vip/index.html
// @match        https://*/vip/list-*.html
// @match        https://*/index/home.html
 
// @match        https://xtefv.xyz/*
// @match        https://xteez.xyz/*
// @match        https://xtedy.xyz/*
 
// @icon         https://index.madou19.tv/json/icon.png
// @license      MIT
// @grant none
// ==/UserScript==
 
(function () {
    'use strict';
 
    /* none 如果不使用 unsafeWindow ，快猫手机端，含羞草pc端会播放失败，原因未知。
    原因：通过 @require 加载的hls提示找不到，通过import_js导入ok */
    let err_cnt = 0;
 
    function import_js(src) {
        let script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
    }
    import_js("https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js");
    import_js("https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.1.5/hls.min.js");
    let not_need_dplayer = location.href.match("https://theav.*?.com/videos/") != null ||
        location.href.match("https://the.*?.fun/videos/") != null ;
    if (!not_need_dplayer) {
        import_js("https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.26.0/DPlayer.min.js");
    }
 
    let today = new Date().toLocaleDateString();
    let min = new Date().getMinutes();
    let chat = `最近支付宝发红包力度很大，请大家扫码领红包后一定要用掉，你用了我才有奖励，脚本免费，维护不易，多谢支持！`;
    function show_support_author() {
        var secondsLeft = 10;
        var mydiv = document.createElement('div');
        mydiv.innerHTML = `<div id="my_add_dizhi3" style="position: fixed;z-index: 10000;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.8);">
            <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);max-width: 90%;max-height: 90%;">
            <p style="color:red;font-size:14px">${chat}（${secondsLeft}s后自动关闭）</p>
            <img src="https://i2.100024.xyz/2022/11/23/vlslmo.webp"></div></div>`;
        document.querySelector("head").after(mydiv);
 
        var interval = setInterval(function() {
            secondsLeft--;
            var xxx = document.querySelector("#my_add_dizhi3 p");if(xxx) xxx.innerText = `${chat}（${secondsLeft}s后自动关闭)`;
            if (secondsLeft <= 0) {
                var yyy = document.querySelector("#my_add_dizhi3"); if(yyy) yyy.parentNode.removeChild(yyy);
                clearInterval(interval);
            }
        }, 1000);
    }
 
    /* 函数功能：显示视频地址，及提示信息 */
    function show_videoUrl(videoUrl,dizhi, flag = 0) {
        var xxx = document.querySelector("#my_add_dizhi");
        if(flag==0 && xxx){
            return 0;
        }
        if (xxx) xxx.parentNode.removeChild(xxx);
        var mydiv = document.createElement('div');
        mydiv.innerHTML = `<div id="my_add_dizhi" style="color:red;font-size:14px">
            <p style="color:red;font-size:14px;word-wrap: break-word;word-break: break-all;">视频地址：<a href="${videoUrl}" target="_blank">${videoUrl}</a></p>
            <p style="color:red;font-size:14px">问题反馈 or 支持作者请<a href="https://sleazyfork.org/zh-CN/scripts/456496" target="_blank">【点击此处】</a>，使用愉快！</p>
            </div>`;
        dizhi.after(mydiv);
        return 1;
    }
 
    /* 函数功能：加载Dplayer播放视频。 参数说明：videoUrl：视频地址 el：播放器加载位置 dizhi: 地址显示位置  flag:是否强制刷新 */
    function play_video(videoUrl, el, dizhi, flag = 0) {
 
        if (!videoUrl || !el || !dizhi) throw new Error(`部分参数无效，视频地址：${videoUrl}、播放器位置：${el}、提示位置：${dizhi}`);
 
        let ret = show_videoUrl(videoUrl,dizhi,flag);
        if(ret == 0){
            return 0;
        }
 
        if (window.dp) {
            window.dp.pause()
            window.dp.destroy()
            window.dp = null;
        }
 
        /* 2. 新增播放器 */
        window.dp = new DPlayer({
            element: el,
            autoplay: true,
            theme: '#FADFA3',
            loop: true,
            lang: 'zh',
            screenshot: true,
            hotkey: true,
            preload: 'auto',
            video: {
                url: videoUrl,
                type: 'hls'
            }
        });
 
        /* 3. 设置播放器浮动显示,并添加一个具有上边距的兄弟div避免覆盖下面的内容 */
        //el.classList.add("my_add_header");
        //el.style += "z-index: 999;top: 0;";
        el.style.position = 'sticky';
        el.style.zIndex = '999';
        el.style.top = '0';
        var xxx = document.querySelector("#my_add_sibling");
        if(!xxx){
            var sibling = document.createElement('div');
            sibling.id = "my_add_sibling";
            //sibling.style.marginTop = el.offsetHeight + 'px'; // 设置兄弟元素的顶部边距
            el.after(sibling);
        }
    }
 
    /* 函数功能：同上，可切换清晰度  */
    function play_video2(videoUrl, videoUrl2, videoUrl3, videoUrl4, el, dizhi) {
        /* 1. 显示地址 */
        var mydiv = document.createElement('div');
        mydiv.innerHTML = `<div id="my_add_dizhi" style="color:red;font-size:14px">注意：部分视频只360P，切换后无法播放说明不存在高清晰度版本！！！视频地址：
        <p style="color:red;font-size:14px;word-wrap: break-word;word-break: break-all;">360P：<a href="${videoUrl}" target="_blank">${videoUrl}</a></p>
        <p style="color:red;font-size:14px;word-wrap: break-word;word-break: break-all;">480P：<a href="${videoUrl2}" target="_blank">${videoUrl2}</a></p>
        <p style="color:red;font-size:14px;word-wrap: break-word;word-break: break-all;">720P：<a href="${videoUrl3}" target="_blank">${videoUrl3}</a></p>
        <p style="color:red;font-size:14px;word-wrap: break-word;word-break: break-all;">1080P：<a href="${videoUrl4}" target="_blank">${videoUrl4}</a></p>
        <p style="color:red;font-size:14px">问题反馈 or 支持作者请<a href="https://sleazyfork.org/zh-CN/scripts/456496" target="_blank">【点击此处】</a>，使用愉快！</p>
        </div>`;
        dizhi && dizhi.after(mydiv);
 
        /* 2. 新增播放器 */
        window.dp = new DPlayer({
            element: el,
            autoplay: true,
            theme: '#FADFA3',
            loop: true,
            lang: 'zh',
            screenshot: true,
            hotkey: true,
            preload: 'auto',
            video: {
                quality: [
                    {
                        name: '360P',
                        url: videoUrl,
                        type: 'hls',
                    },
                    {
                        name: '480P',
                        url: videoUrl2,
                        type: 'hls',
                    },
                    {
                        name: '720P',
                        url: videoUrl3,
                        type: 'hls',
                    },
                    {
                        name: '1080P',
                        url: videoUrl4,
                        type: 'hls',
                    },
                ],
                defaultQuality: 0,
            }
        });
    }
 
    /* 函数功能：在界面上显示程序错误，便于分析  */
    function show_err_log(err) {
        err && console.log(err);
        err_cnt++;
        if (err_cnt == 10) {
            //err_cnt = 0;
            var mydiv = document.createElement('div');
            mydiv.innerHTML = `<div id="my_add_err_log" style="color:red;font-size:14px">
            解析出错，1.检查是否登录！2.请仔细阅读<a href="https://sleazyfork.org/zh-CN/scripts/456496" target="_blank">【脚本说明】</a>查看是否支持你的平台组合，
            如需帮助请复制以下内容到脚本评论区，等候作者处理! 请加上使用的平台组合，如：chrome + tampermonkey 。
            <p style="color:red;font-size:14px">错误信息：${err || "尝试多次仍然未获取到地址,可能是网站已更新..."}</p>
            <p style="color:red;font-size:14px">操作系统：${navigator.platform}</p>
            <p style="color:red;font-size:14px">浏览器：${navigator.userAgent}</p>
            <p style="color:red;font-size:14px">当前地址：${location.href}</p>
            </div>`;
            document.querySelector("head").after(mydiv);
            clearInterval(my_timer);
        }
    }
 
    function do_login(){
        let phone = JSON.parse(localStorage.getItem('move-client-user-info'))?.user?.user_info?.phone;
        let event = document.createEvent('HTMLEvents');
            event.initEvent("input", true, true);
        if(phone){
            /* 自动登录 */
            let account = document.querySelectorAll('input.van-field__control')[0];
            account.value = phone;
            account.dispatchEvent(event);
            let password = document.querySelectorAll('input.van-field__control')[1];
            password.value = "123456";
            password.dispatchEvent(event);
            document.querySelector('button[type=submit]').click();
        }else{
            /* 自动注册 */
            document.querySelector('div.login_1_2_1')?.click();
            let account = document.querySelectorAll('input.van-field__control')[0];
            account.value = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"][ Math.floor(10 * Math.random())] + Math.floor(Math.random() * 100000000);
            account.dispatchEvent(event);
            let password = document.querySelectorAll('input.van-field__control')[1];
            password.value = "123456";
            password.dispatchEvent(event);
            let password2 = document.querySelectorAll('input.van-field__control')[2];
            password2.value = "123456";
            password2.dispatchEvent(event);
            document.querySelector('button[type=submit]').click();
        }
    }
 
    let flag = 0;
    let last_videoUrl = null;
    function get_videourl() {
        let videoUrl = null, videoUrl2 = null, videoUrl3 = null, videoUrl4 = null;
        let el = null;
        let dizhi = null;
        let player = null;
        let shikan = null;
        let ads = null;
        try {
            if (!not_need_dplayer && typeof(DPlayer)!= 'function' ) {
                /* DPlayer还未加载完毕时就解析完视频地址，会导致播放时报错ReferenceError: DPlayer is not defined */
                console.log("正在加载DPlayer...");
                return;
            }
            /* 小天鹅 支持手机 + PC */
            if (location.href.match("https://xte.*?.xyz/#/Details") != null) {
                //console.log("[小天鹅]视频页面，正在解析...");
                player = document.querySelector("div.Mpplay") || document.querySelector("div.playerBox");
                document.body.classList.remove('van-overflow-hidden');
                ads = document.querySelector(".VipzceBox"); if (ads) ads.parentNode.removeChild(ads);/*app*/
                ads = document.querySelector("div.el-dialog__body"); if (ads) ads.parentNode.removeChild(ads);/*pc*/
                ads = document.querySelector(".v-modal"); if (ads) ads.parentNode.removeChild(ads);/*pc*/
                /* 1.点击试看（不需要） */
                /* 2.解析真实地址 */
                videoUrl = (document.querySelector("div.detailsBox")|| document.querySelector("div.user"))?.__vue__?.detailsdata?.vod_direct_play_url;
                if(player && videoUrl){
                    if(videoUrl == last_videoUrl){
                        return;
                    }else{
                        last_videoUrl = videoUrl;
                        console.log("真实地址:", videoUrl);
                        console.log("last_videoUrl:", last_videoUrl);
                        /* 3.移除广告 */
                        //ads = document.querySelector(".MpplayFh");
                        /* 4.播放正片 */
                        play_video(videoUrl, player, document.querySelector("div.DetailsofTheTitle") || document.querySelector("div.playVideoInfo"),1);
                        //player.parentNode.before(ads);
                        /* 5.停止定时器 */
                        //clearInterval(my_timer);
                    }
                }else{
                    console.log("[小天鹅]视频页面，未获取到地址，继续尝试...");
                }
            }
            /* 猫咪vip */
            else if (location.href.match("https://www..*?.com/vip/") != null) {
                document.querySelectorAll("div.content-item  a.video-pic")?.forEach( a => {a.href = a.href.replace("/vip/play-","/shipin/detail-")});
                //clearInterval(my_timer);
                //console.log("[猫咪]视频页面，未获取到地址，继续尝试...");
            }
            /* 9sex */
            else if (location.href.match("https://.*?/index/movie/play/id/") != null) {
                player = document.querySelector("#dplayer");
                dizhi = document.body.innerHTML.match("movies/(.*?)_preview.jpg.txt")[1].split('/');/* $("script").text() */
                /* 1.点击试看（不需要） */
                if (player && dizhi && flag == 0) {
                    /* 2.解析真实地址 */
                    videoUrl = `https://9s.m3.bca834d60257.com/${dizhi[0]}/${dizhi[1]}/360P/${dizhi[2]}_360P.m3u8`; console.log("真实地址:", videoUrl);
                    videoUrl2 = `https://9s.m3.bca834d60257.com/${dizhi[0]}/${dizhi[1]}/480P/${dizhi[2]}_480P.m3u8`; console.log("真实地址2:", videoUrl2);
                    videoUrl3 = `https://9s.m3.bca834d60257.com/${dizhi[0]}/${dizhi[1]}/720P/${dizhi[2]}_720P.m3u8`; console.log("真实地址3:", videoUrl3);
                    videoUrl4 = `https://9s.m3.bca834d60257.com/${dizhi[0]}/${dizhi[1]}/1080P/${dizhi[2]}_1080P.m3u8`; console.log("真实地址4:", videoUrl4);
                    /* 3.vip视频需要移除登录框 */
                    ads = document.querySelector("#login-tip-modal"); if (ads) ads.parentNode.removeChild(ads);
                    ads = document.querySelector(".vip-tip-modal"); if (ads) ads.parentNode.removeChild(ads);
                    /* 4.播放正片 */
                    play_video2(videoUrl, videoUrl2, videoUrl3, videoUrl4, player, document.querySelector("div.notice"));
                    flag = 1;
                }
                else if (flag == 1) {
                    /* 3.1 免费视频需要加载播放后移除广告 */
                    ads = document.querySelector(".pause-ad-imgbox"); if (ads) ads.parentNode.removeChild(ads);
                    /* 5.停止定时器 */
                    clearInterval(my_timer);
                }
                else {
                    console.log("[9sex]视频页面，未获取到地址，继续尝试...");
                }
            }
            /* 皇家会所 */
            else if (location.href.match("https://www.hjhs.*?/videos/") != null) {
                player = document.querySelector("#dplayer");
                /* 1.点击试看（不需要） */
                if (player && window.api?.quality?.url) {
                    /* 2.解析真实地址 */
                    videoUrl = window.api.quality.url.replace("suo.", "").replace("_suo", ""); console.log("真实地址:", videoUrl);
                    /* 3.移除广告 */
                    /* 4.播放正片 */
                    play_video(videoUrl, player, document.querySelector("div.headline"));
                    /* 5.停止定时器 */
                    clearInterval(my_timer);
                }
                else {
                    console.log("[皇家会所]视频页面，未获取到地址，继续尝试...");
                }
            }
            /* The AV Pron，兼容手机 + PC
            已知缺陷: 若使用Dplayer, 则 chrome/safari 播放正常（无法新标签播放，可能有限制），kiwi m3u8地址获取成功，但播放失败！
            已知缺陷: 可能网站存在限制，控制台中player.api("hls")有值，但脚本获取为null 。只有使用 unsafeWindow.player.api("hls")能获取到 ，
            但由于userscript不支持unsafeWindow，故safari浏览器+userscript无效。改为从<script/>内容查找m3u8地址 */
            else if (location.href.match("https://theav.*?.com/videos/") != null ||
                     location.href.match("https://the.*?.fun/videos/") != null ) {
                /* 1.点击试看（不需要） */
                /* 2.解析真实地址 */
                videoUrl = window.player?.api("hls")?.url?.split('?')[0] || window.m3ky?.split('?')[0]; /* 该方案在safari浏览器+userscript下无效 */
                /* videoUrl = document.body.innerHTML.match("https:(.*?).m3u8")[0];  $("script").text() */
                if (videoUrl && typeof(Playerjs)== 'function' ) {
                    console.log("真实地址:", videoUrl);
                    /* 3.移除广告 */
                    ads = document.querySelector(".table"); if (ads) ads.style.display = "none";
                    ads = document.querySelector(".sponsor"); if (ads) ads.style.display = "none";
                    ads = document.querySelector(".rate_box"); if (ads) ads.style.display = "none";
                    ads = document.querySelector(".green"); if (ads) ads.style.display = "none";
                    /* 4.播放正片 */
                    /* play_video(videoUrl, document.querySelector(".player"), document.querySelector("h2.title"));该方案在kiwi+tempermonkey下无效 */
                    Playerjs({ id: "layer", file: videoUrl, autoplay: 1 });//id: "player"
                    /* 5.停止定时器 */
                    clearInterval(my_timer);
                }
                else {
                    console.log("[The AV Pron]视频页面，未获取到地址，继续尝试...");
                }
            }
            /* 快猫，兼容手机 + PC */
            else if (location.href.match("https://.*?km.*?.com/videoContent/") != null) {
                /* 1.点击试看（不需要） */
                /* 2.解析真实地址 */
                videoUrl = document.querySelector("#videoContent")?.__vue__?.formatUrl;
                if (videoUrl) {
                    console.log("真实地址:", videoUrl);
                    /* 3.移除广告 */
                    ads = document.querySelector(".exchangeBg"); if (ads != null) ads.style.display = "none";
                    /* 4.播放正片 */
                    play_video(videoUrl, document.querySelector("div.backImg"), document.querySelector("div.videoTitle") || document.querySelector("div p.name"));
                    /* 5.停止定时器 */
                    clearInterval(my_timer);
                }
                else {
                    console.log("[快猫]视频页面，未获取到地址，继续尝试...");
                }
            }
            /* 红杏，兼容手机 + PC */
            else if (location.href.match("https://.*?.hxaa.*?.com/#/moves/playvideo/") != null) {
                let login = document.querySelector("div.play_video_wdl_2_2");
                shikan = document.querySelector("div.shikan") || document.querySelector("div.on_play");
                player = document.querySelector(" div#mse") || document.querySelector("div.play_video_1 div");
                if(login){
                    /* 0.登录 or 注册 */
                    login.click();
                    do_login();
                }
                else if (shikan) {
                    /* 1.点击试看 */
                    shikan.click(); console.log("点击试看！");
                }
                else if (player?.__vue__?.playUrl) {
                    /* 2.解析真实地址 */
                    let videoUrl = player.__vue__.playUrl.split('&time')[0];
                    let re = videoUrl.split("/")[2];
                    videoUrl = videoUrl.replace(re + '/shikanshipin', 'jscdn.kunkunhome.xyz');
                    console.log("真实地址:", videoUrl);
                    /* 3.移除试看 */
                    player.__vue__.player?.hls?.destroy();
                    /* 4.播放正片 */
                    play_video(videoUrl, document.querySelector(" div#mse") || document.querySelector("div.play_video_1 div.dplayer"), document.querySelector("div.move_name") || document.querySelector("div.play_main_1"));
                    /* 5.停止定时器 */
                    clearInterval(my_timer); console.log("停止定时器！");
                }
                else {
                    console.log("[红杏]视频页面，未获取到地址，继续尝试...");
                }
            }
            /* 红杏，手机短视频 */
            else if (location.href.match("https://.*?/#/shotVideoList") != null) {
                player = document.querySelector("div.shout_list");
                if(!document.querySelector("button#pojie")){
                    /* 1. 显示地址 */
                    var mydiv = document.createElement('div');
                    mydiv.innerHTML = `<p id="my_add_dizhi" style="color:red;font-size:14px"><button id="pojie">点此破解</button>后，视频标题前会出现“✔”字样，点击标题将打开新页面看视频！</p>`;
                    document.querySelector("div.van-nav-bar__content").after(mydiv);
                }
                else if(player && player.__vue__.playList1){
                    /* 2.点解破解 */
                    document.querySelector("button#pojie").onclick = function(){
                        let videoUrl_list = player.__vue__.playList1; console.log("直播地址:", videoUrl_list);
                        let divlist = document.querySelectorAll("div.box_left div.box_public div.box_public_1_2 ");
                        let len = (videoUrl_list.length > divlist.length) ? divlist.length : videoUrl_list.length;
                        for (var i = 0; i < len; i++) {
                            divlist[i].innerHTML = `<p><a href="https://jscdn.lordzhang.xyz/${videoUrl_list[i].sn}/10000kb/hls/index.m3u8" target="_blank">✔${divlist[i].innerText}</a></p>`;
                        }
                        /* 右边的 */
                        videoUrl_list = player.__vue__.playList2; console.log("直播地址:", videoUrl_list);
                        divlist = document.querySelectorAll("div.box_right div.box_public div.box_public_1_2 ");
                        len = (videoUrl_list.length > divlist.length) ? divlist.length : videoUrl_list.length;
                        for (i = 0; i < len; i++) {
                            divlist[i].innerHTML = `<p><a href="https://jscdn.lordzhang.xyz/${videoUrl_list[i].sn}/10000kb/hls/index.m3u8" target="_blank">✔${divlist[i].innerText}</a></p>`;
                        }
                    };
                    /* 3.停止定时器 */
                    clearInterval(my_timer);
                }
            }
            /* 含羞草视频 ，兼容手机 + PC */
            else if (location.href.match("/play/video/") != null) {
                shikan = document.querySelector(".van-icon-play-circle-o") || document.querySelector("div.cursor-pointer.flex-center.space-x-1"); /* 前面为手机。后面为PC */
                player = document.querySelector("div#videoContentPlayer") || document.querySelector("#v_prism");
                ads = document.querySelector(".fixedTryWatchShowButtonLine");
                if (shikan) {
                    /* 1.点击试看 */
                    shikan.click(); console.log("点击试看！");
                }
                else if (player?.__vue__?.videoUrl) {
                    /* 2.解析真实地址 */
                    videoUrl = player.__vue__.videoUrl.split(/start.*?sign/).join('sign'); console.log("真实地址:", videoUrl);
                    /* 3.移除试看、广告 */
                    player.__vue__.videoObj && player.__vue__.videoObj.hls && player.__vue__.videoObj.hls.destroy();
                    ads && (ads.style.display = "none");
                    /* 4.播放正片 */
                    play_video(videoUrl, player, document.querySelector("div.publicVideoInfoBox p.name") || document.querySelector("div.infoAreaBox"));
                    /* 5.停止定时器 */
                    clearInterval(my_timer); console.log("停止定时器！");
                }
                else {
                    console.log("[含羞草]视频页面，未获取到地址，继续尝试...");
                }
            }
            /* 含羞草，PC端，直播 */
            else if (location.href.match("/live/") != null) {
                player = document.querySelector("div.VideoAuthAdminBg") || document.querySelector("div#livePlayer");
                videoUrl = player.__vue__.videoUrl || player.__vue__.videoContent.pull; console.log("直播地址:", videoUrl);
                play_video(videoUrl, player, document.querySelector("div.userInfo p.name"));
                clearInterval(my_timer);
            }
            /* 含羞草，手机端，直播 */
            else if (location.href.match("//h5.*?/live") != null) {
                player = document.querySelector("div#publicLiveListModule");
                let videoUrl_list = player.__vue__.list; console.log("直播地址:", videoUrl_list);
                let divlist = document.querySelectorAll("ul.liveListBg li .bottom");
                let len = (videoUrl_list.length > divlist.length) ? divlist.length : videoUrl_list.length;
                for (var i = 0; i < len; i++) {
                    divlist[i].innerHTML += '<p><a href="' + videoUrl_list[i].pull + '" target="_blank">' + videoUrl_list[i].pull + '</a></p>';
                }
                clearInterval(my_timer);
                /* 1. 显示地址 */
                mydiv = document.createElement('div');
                mydiv.innerHTML = '<p id="my_add_dizhi" style="color:red;font-size:14px">提示：彦祖们，请点击图片下方的链接看破解后的直播视频！</p>';
                document.querySelector("div.topBannerBg").after(mydiv);
            }
            else {
                /* 麻豆TV */ /* 91TV */
                localStorage.setItem("vip_level", '1');//todo:加地址提示
                //console.log("地址未匹配，停止定时器!");//麻豆TV每次刷新后会将vip_level更新为0
                //clearInterval(my_timer);
            }
        }
        catch (err) {
            console.log(`${err}`);
            show_err_log(err);
        }
    }
 
    let my_timer = setInterval(get_videourl, 2000);
 
    var oldhref = location.href;
    setInterval(function () {
        if (location.href != oldhref) {
            console.log("监听到地址变化,再次启动【获取视频定时器】!");
            oldhref = location.href;
            err_cnt = 0;
            my_timer = setInterval(get_videourl, 2000);
        }
        if(today != localStorage.getItem('today_is_show') && Math.abs(new Date().getMinutes() - min) > 3 ){//今天在当前站点没弹过，且在当前页面停留3分钟以上时
            localStorage.setItem("today_is_show", today);
            console.log("支持作者弹窗!");
            //show_support_author();
        }
    }, 1000);
 
})();
