/**
 * 视频播放组件
 * fengchuantao@baidu.com
 * 7.20
 */
__inline('./video/sbbox');

define(['../util'], function(util){
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var player = require('./video/player');
    

    var bdPlayer;

    var build = function () {

        var _this = this;
        var _element = _this.element;

        _this.isBlank = false;

        if (_element.isRender) {
            return; 
        }
        _element.isRender = true;

        // for(var index = 0; index < _element.childNodes.length; index ++) {
        //     var node = _element.childNodes[index];

        //     if(node.nodeType == 1 && node.nodeName != 'MIP-IMG') {
        //         _this.applyFillContent(node, true); 
        //     }
        // }

        // var $childs = $(_element).children().not('mip-i-space');

        // $childs.map(function(i,ele) {
        //     if(ele.tagName.toLocaleLowerCase() == "mip-img") {
        //         g_this.applyFillContent(ele,true);       
        //     }
        // });

        _this.applyFillContent(_element, true);
        
        var me = _element;
        var $me = $(_element);

        _this.ext = {}; //数据存储
        getVideoInfo.call(_this);

<<<<<<< HEAD
        // console.log(_this);
=======
>>>>>>> 16f40fb03de04aa307d3b8680f04f777d81271e7


        _this.isBlank = isBlank.call(_this);

<<<<<<< HEAD
        // console.log(_this);
=======
>>>>>>> 16f40fb03de04aa307d3b8680f04f777d81271e7

        // var _Videoconfig = {}; //数据存储

        // _Videoconfig = getVideoInfo.call(_this);

        // _Videoconfig = getInfo.call(_element);
        // listdataValida();

        //本地打开或者外部页打开
        if(_this.isBlank) { //在本地打开
            playnowpage.call(_this)
        }else {
             _this.element.addEventListener('click', function() {
                toTranscoder.call(_this);
             });
        }


        

        //本页打开
        //该函数源于@赵雷
        function playnowpage() {
            var elem = this.element;

            $(this.element).on('click', function (event) {
                if(event.target.tagName == 'VIDEO') {
                    event.stopPropagation();
                    return false;
                }
                // 如果有视屏正在播放，则移除视屏
                bdPlayer && bdPlayer.remove();

                bdPlayer = new player({});

                // video容器  如果未设置的话  则传入me
                var container = $me.attr('container');
                if (container && $(container) && $(container).length) {
                    container = $(container);
                } else {
                    container = me;
                }

                // 广告数据信息
                var adInfo = [];
                var adInfoString = $me.attr('adInfo');
                if (adInfoString) {
                    try {
                        adInfo = new Function('return ' + adInfoString)()
                    } catch (e) {}
                }


                //过滤ios qq
                var userAgent = navigator.userAgent;
                var qqbrower = userAgent.indexOf("QQ")>0?true:false;
                var ios = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                
                //过滤ios7.0
                var agent = navigator.userAgent.toLowerCase() ;
                var version;
                if(agent.indexOf("like mac os x") > 0){
                    //ios
                    var regStr_saf = /os [\d._]*/gi ;
                    var verinfo = agent.match(regStr_saf) ;
                    version = (verinfo+"").replace(/[^0-9|_.]/ig,"").replace(/_/ig,".");
                }

                var version_str = version+"";
                if(version_str != "undefined" && version_str.length >0){
                    version=version.substring(0,1);
                }

                if((qqbrower&&ios)||version < 8) {
                    adInfo = [];
                }

                // 正片播放时 设置多type时 数据处理
                var sources = $me.find('source');
                var playInfo = [];
                sources.each(function () {
                    var src = $(this).attr('src');
                    var type = $(this).attr('type');
                    if (!src) {
                        return;
                    }
                    playInfo.push({
                        type: type,
                        src: src
                    });
                });
                // 加载视频、并播放
                bdPlayer.render({
                    // 播放器容器，必选
                    container: container,

                    height: $me.attr('height'),
                    width: $me.attr('width'),
                    src: $me.attr('src'),
                    type: $me.attr('type'),
                    poster: $me.attr('poster'),
                    autoplay: $me.attr('autoplay'),
                    controls: $me.attr('controls'),
                    loop: $me.attr('loop'),
                    muted: $me.attr('muted'),

                    android: {
                        playMode: $me.attr('android-mode') || ''
                    },
                    ios: {
                        playMode: $me.attr('ios-mode') || ''
                    },

                    // 广告数据信息
                    adInfo: adInfo,

                    // 正片视频数据信息
                    playInfo: playInfo
                    // src: 'http://v1.bdstatic.com/8aa369effe2cc6280c1bd413723ce0ac/mp4/8aa369effe2cc6280c1bd413723ce0ac.mp4'
                });
            });
        }

        //非本页打开
        function toTranscoder() {

            var _this = this;

            var allconfig = _this.ext;//getInfo.call(this);
            // allconfig.title = _this.title;

            var baiduappbox = recognitionClient();
            bdPlayer && bdPlayer.remove();

            bdPlayer = new player({});

            var configstr = baiduapp.call(_this);

            // return;

            //一下为判断终端是否手百,ios与Android
            if(baiduappbox.baiduboxapp) { //手百
                
                if(getOS() == "Android" && baiduappbox.version > "6.4") {

                    
                    var configstr = baiduapp.call(_this, true);
                    Box.android.invokeApp("Bdbox_android_capi_video","playVideo",[configstr]);
                
                } else if(getOS()=="IOS" && baiduappbox.version > "6.8") {

                     _this.ext.tn = 'nohead';
                   
                    var configstr = baiduapp.call(_this);

                  //  alert('dad'+ configstr);
                   try{        
                    Box.ios.invokeApp("video",{"action":"playVideo","params": configstr, "minver":"6.8.0.0"},"");
              }catch(e){alert(e)}  
                } else {
                    
                    superpage.call(_this);
                
                }
            
            } else {
                
                superpage.call(_this);

            }
        }

        //http承载页跳转
        function superpage() {
            
            top.location.href = alignment.call(this, 'dfdf')
            
            //console.log(alignment.call(this));        
        }

        /**
         * 手百调起数据组装
         * encode参数为ios与安卓的配置方式不同
         */
        function baiduapp(encode) {
            // alert(encode);
            var url = alignment.call(this);
<<<<<<< HEAD
            // alert(url)
=======
            
>>>>>>> 16f40fb03de04aa307d3b8680f04f777d81271e7
            // alert(url);

           // var geturl = alignment(allconfig)+"&tn=nohead"; //手百调取SF页面需要去掉SF页头部。
           // var URL = encode ? geturl : encodeURIComponent(geturl)
            var $jsonString = {
                "vid": +new Date(),
                "title": encodeURIComponent(_this.title),
                "src": encodeURIComponent(url),
                "cate": "tvplay",
                "pageUrl": location.href,
                "type": "other"
            }

            jsonString = JSON.stringify($jsonString);
            return jsonString;
        }

    };

    /**
     * 数据组装函数
     */
    function alignment() {

        var _this = this;
        var str = '';

        

        // _this.adInfo = str;

        var data = {
            'pd': 'mms_mipvideo',
            'title': _this.title,
            'dev_tpl': 'act_mip_video',
            'wd': '%E8%A7%86%E9%A2%91',
            'actname': 'act_mip_video',
            'ext': _this.ext
        };

        return getUrl(data);
    }


    function getUrl(params) {
        var url = 'http://cp01-sys-rath4-c32-qa270.cp01.baidu.com:8003/sf?'
        // var url = "http://transcoder.baidu.com/sf?";
        
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
<<<<<<< HEAD
                if(key == 'ext') {
                    url += getEXTString(params[key]);
                } else {
=======
                if(key!='ext') {
>>>>>>> 16f40fb03de04aa307d3b8680f04f777d81271e7
                    url += key + '=' + params[key] + '&';
                }
            }
        }

        var ext = params['ext'];
        url +="ext={";
        for(var i in ext) {
            url += i + '=' + ext[i] + '&';
        }

        return url+"}";
    }

    function getEXTString(param) {
        var str = '';
        var flag = false;

        for(var key in param) {
            if(param.hasOwnProperty(key)) {
                if(key == 'adInfo') {
                    var adStr = '';
                    for(var index = 0; index < param.adInfo.length; index ++) {
                        adStr += param[key][index][0].src + ',';
                    }
                }

                str += flag ? ',' + key + ':' + param[key] : key + ': ' + param[key]
                flag = true;
            }
        }

        return 'ext={' + str + '}&';
    }


    function getVideoInfo() {
        var _this = this;

        var poster = _this.element.getAttribute("poster") || '';
        var src = _this.element.getAttribute("src") || '';
        var adInfo = _this.element.getAttribute("adInfo") || '';
        var title = _this.element.getAttribute("title") || "视频";
        var iSrc = _this.element.getAttribute("iframeSrc") || '';
        var adInfoAry = [];
        var adInfoStr = '';

        //广告信息序列化
        
        if (adInfo && !isLtIOS8()) {
            try {
                adInfoAry = new Function('return ' + (adInfo))();
            } catch (e) {}
        }

        // adInfoAry.map(function(data, index) {
        //     if(index) {
        //         adInfoStr += ',';
        //     }
        //     adInfoStr += encodeURIComponent(data[0].src);
        // });


        _this.title = title;
        _this.ext = {
            poster : poster,
            src : src,
            adInfo : adInfoAry,
            iSrc: iSrc
        };

    }

    function isLtIOS8() {

        var agent = navigator.userAgent.toLowerCase() ;
        var version = '';
            
        if(agent.indexOf("like mac os x") > 0){
            
            version = agent.match(/os [\d._]*/gi).toString()
                        .replace(/[^0-9|_.]/ig,"")
                        .replace(/_/ig,".").toString();
        }

        if(version != "undefined" && version.length > 0){
            version = version.substring(0,1);
        }

        return version < 8;
    }


    function isBlank() {

        var _this = this;
        var info = _this.ext.adInfo;
        var flag = isHttps(_this.ext.src);

        for(var index = 0; index < info.length; index ++) {
            flag = flag && isHttps(info[index][0].src);
        }

        return flag;

    }


    function isHttps(url) {

        var reg = /^https:\/\//;
        return reg.test(url) || reg.test(location.protocol);

    }


    //判断是ios/Android
    function getOS() {
        var agent = navigator.userAgent;
        var isAdr = agent.match(/(Android)|(Adr)/g);
        var isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 

        return isAdr ? "Android" : (isIOS ? "IOS" : "other");

    }  


    /**
         * 客户端验证-短线方案
         * 主要验证手百,以提供调起服务
         */
        function recognitionClient() {
            var userAgentconfig = {};
            var userAgent = navigator.userAgent;
            var baiduboxapp = userAgent.indexOf('baiduboxapp')>0?true:false;

            if(baiduboxapp) {
                userAgentconfig.version = Number(parseFloat(Box.version));
                userAgentconfig.baiduboxapp = baiduboxapp;
            }
            return userAgentconfig;
        }  

    customElem.prototype.init = function(){
        this.build = build; 
    };

    return customElem;

});



