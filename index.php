<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx0d22c68013d0d0fc", "1ba4ce91b943a93b61f387b3bd8bc3f3");
$signPackage = $jssdk->GetSignPackage();
?>
<!doctype html>
<html ng-app="wscene">

<head>
    <title>angular-deckgrid</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <meta content="width=640,user-scalable=no,minimal-ui,target-densitydpi=device-dpi" name="viewport">
    <link rel="stylesheet" href="styles/animate.css">
    <link rel="stylesheet" href="styles/ngActivityIndicator.css">
    <link rel="stylesheet" href="styles/index.css">
   
</head>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
    wx.config({
        debug: false,
        appId: '<?php echo $signPackage["appId"]; ?>',
        timestamp: '<?php echo $signPackage["timestamp"]; ?>',
        nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
        signature: '<?php echo $signPackage["signature"]; ?>',
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ]
    });
</script>

<script src="//cdn.bootcss.com/angular.js/1.4.3/angular.min.js"></script>
<script src="//cdn.bootcss.com/angular.js/1.4.3/angular-animate.min.js"></script>
<script src="lib/angular-ui-router.min.js"></script>
<script src="lib/angular-resource.js"></script>
<script src="lib/ngTouch.min.js"></script>
<script SRC="js/ngActivityIndicator.js"></script>
<script src="js/app.js"></script>
<script src="js/directives/ccpreload.js"></script>
<script src="js/service/service.js"></script>
<script src="js/controllers/index.js"></script>
<body class="demo">
    <div ng-activity-indicator='SpinnerWhite' class="loader"></div>
    <div class="view-animate" ui-view></div>
</body>
</html>
