/*
 *
 */


angular.module('wscene.controllers', []).controller('HomeController',

        function($scope, $location, $timeout, $activityIndicator, preloader, $http, IssuePostService, audioService) {

            'use strict';
            var prefix = (function() {
                var styles = window.getComputedStyle(document.documentElement, ''),
                    pre = (Array.prototype.slice
                        .call(styles)
                        .join('')
                        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                    )[1],
                    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
                return {
                    dom: dom,
                    lowercase: pre,
                    css: '-' + pre + '-',
                    js: pre[0].toUpperCase() + pre.substr(1)
                };
            })();


            $scope.isLoading = true;
            $scope.isSuccessful = false;
            $scope.percentLoaded = 0;
            $scope.style = {}
            $scope.TOUCH = 'end'
            $scope.transform = prefix.css + "transform"
            $scope.pagnum = 0
            $scope.pageanmi = []

            //$scope.imageLocations = [
            //("./img/01.png?v=1&cache=" + (new Date()).getTime()), ("./img/02.png?v=1&cache=" + (new Date()).getTime())
            //"./img/arrow_down.png", 
            //];


            $scope.title = 'ngView content';
            $activityIndicator.startAnimating();

            $scope.resize = function() {

                $scope.style.pageH = document.documentElement.clientHeight + 3
                $scope.style.pageW = document.documentElement.clientWeight
                    //$scope.style.main = {height:$scope.style.pageH*$scope.pagecount+'px'}
                $scope.style.mainH = ($scope.style.pageH) * $scope.pagecount + 'px'
                $scope.style.transform = 'translate3d(0px, 0px, 0px)'
                console.log($scope.style.pageH)

            }

            if (!IssuePostService.issuePost) {
                console.log(IssuePostService.issuePost)

                //init(IssuePostService.issuePost)

            } else {

                $http.get("data/data.json")
                    .success(function(response) {


                        init(response.issues[0])


                    });
            }



            function init(response) {

                $scope.imageLocations = response.preloadimages

                preloader.preloadImages($scope.imageLocations).then(
                    function handleResolve(imageLocations) {

                        // Loading was successful.
                        $scope.isLoading = false;
                        $scope.isSuccessful = true;
                        $scope.isActive = true;
                        $timeout(function() {
                            $activityIndicator.stopAnimating();
                        }, 500)
                        console.info("Preload Successful");

                    },
                    function handleReject(imageLocation) {

                        // Loading failed on at least one image.
                        $scope.isLoading = false;
                        $scope.isSuccessful = false;

                        console.error("Image Failed", imageLocation);
                        console.info("Preload Failure");

                    },
                    function handleNotify(event) {

                        $scope.percentLoaded = event.percent;

                        console.info("Percent loaded:", event.percent);

                    }
                );









                $scope.datas = response.page;
                //load music
                if (response.music) {

                    $scope.audio = audioService;
                    $scope.audio.load(response.music)
                    $scope.audioable = true

                    $scope.audio_control = function() {

                        if ($scope.audio.playing) {
                            $scope.audio.stop();
                        } else {
                            $scope.audio.play();
                        }
                    }
                }

                wx.ready(function() {

                    wx.checkJsApi({
                        jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                        success: function(res) {
                            // 以键值对的形式返回，可用的api值true，不可用为false
                            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                            console.log('ok')
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: '武汉百安居团签会', // 分享标题
                        desc: '2016年5月28日诚邀您参加武汉百安居团签会。', // 分享描述
                        link: '', // 分享链接
                        imgUrl: 'http://www.bnq.com.cn/dc/img/logo.png', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            // 用户确认分享后执行的回调函数


                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareTimeline({
                        title: '武汉百安居团签会', // 分享标题
                        link: '', // 分享链接
                        imgUrl: 'http://www.bnq.com.cn/dc/img/logo.png', // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                })

                $scope.pagecount = $scope.datas.length
                $scope.resize()
                $scope.pageanmi[$scope.pagnum] = '{init:false}'

            }







            /*preloader.preloadImages($scope.imageLocations).then(
                function handleResolve(imageLocations) {

                    // Loading was successful.
                    $scope.isLoading = false;
                    $scope.isSuccessful = true;
                    $scope.isActive = true;
                    $timeout(function() {
                        $activityIndicator.stopAnimating();
                    }, 500)
                    console.info("Preload Successful");

                },
                function handleReject(imageLocation) {

                    // Loading failed on at least one image.
                    $scope.isLoading = false;
                    $scope.isSuccessful = false;

                    console.error("Image Failed", imageLocation);
                    console.info("Preload Failure");

                },
                function handleNotify(event) {

                    $scope.percentLoaded = event.percent;

                    console.info("Percent loaded:", event.percent);

                }
            );*/






        }


    )
    .controller('IndexController',

        function($scope, $location, $timeout, $activityIndicator, $rootScope) {

            'use strict';
            $scope.isActive = true;
            console.log($rootScope.currentUser)
        }
    )
    .controller('AdminCtrl', function($scope, $location, $timeout, $activityIndicator, $rootScope) {

        'use strict';
        $scope.isActive = true;
        console.log($rootScope.currentUser)
    })
    .controller('userListController',

        function($scope, UserService, $state) {

            'use strict';
            $scope.isActive = true;
            $scope.userlist = UserService.userlist;
            $scope.newpassword = '***********';

            $scope.sel = function(n, v) {
                $scope.userlist[n].role = v
            }

        }
    ).controller('UserInfoController',

        function($scope, UserService, $state) {

            'use strict';
            $scope.isActive = true;
            $scope.user = UserService.user;
            $scope.newpassword = '';
            $scope.repeatpassword = '';



            $scope.save = function() {
                if ($scope.newpassword == '') {

                } else {

                    if ($scope.newpassword == $scope.repeatpassword) {
                        user.newpassword = $scope.newpassword
                    } else {
                        alert('两次输入密码不一致')
                    }
                }
                UserService.update($scope.user)
            }

            $scope.quit = function() {
                $state.go("list");
            }
        }
    ).controller('OverController',

        function($scope, $location, $timeout, $activityIndicator) {

            'use strict';
            $scope.isActive = true;
        }
    ).controller('ListController', ['$scope',
        'IssuePostService', '$modal', 'Auth', '$rootScope', '$state',

        function($scope, IssuePostService, $modal, Auth, $rootScope, $state) {

            'use strict';
            $scope.isActive = true;
            $scope.issuePostService = IssuePostService;
            $scope.logout = Auth.logout

            $scope.edit = function(n) {

                $state.go("edit", {
                    issueid: n
                });

            }

            $scope.info = function() {

                $state.go("userinfo");

            }


            $scope.userlist = function() {

                $state.go("userlist");

            }

            $scope.delete = function(n) {
                $scope.issuePostService.delIssuePost(n)
            }


            //$rootScope.userService = UserService;
            $scope.broadcastBtnEvent = function(event) {
                $rootScope.$broadcast(event);
            };

        }
    ])
    .controller('EditController', ['$scope',
        'IssuePostService', "issueService", 'Auth',

        function($scope, IssuePostService, issueService, Auth) {

            'use strict';
            $scope.isActive = true;
            $scope.issuePostService = IssuePostService;
            $scope.logout = Auth.logout
            $scope.del = function(index) {
                $scope.issuePostService.issuePost.page.splice(index, 1)
            }
            $scope.add = function() {
                var addPage = new issueService.page()
                console.log($scope.issuePostService.issuePost)
                $scope.issuePostService.issuePost.page.push(addPage)
                console.log($scope.issuePostService.issuePost.page)
            }
            $scope.save = function() {

                if ($scope.issuePostService.issuePost.id == 'temp') {
                    $scope.issuePostService.addIssuePost($scope.issuePostService.issuePost)

                } else {
                    console.log($scope.issuePostService.issuePost)
                    $scope.issuePostService.updateIssuePost($scope.issuePostService.issuePost)
                }

            }

        }
    ])
    .controller('EditPageController', ['$scope',
        '$stateParams', 'issueService', '$modal', 'FileUploader',

        function($scope, $stateParams, issueService, $modal, FileUploader) {

            'use strict';
            $scope.isActive = true;
            $scope.pageid = $stateParams.pageid;
            //$scope.main={}
            //$scope.main.bg= $scope.issuePostService.issuePost.page[$stateParams.pageid].csstext
            //$scope.main.child=$scope.issuePostService.issuePost.page[$stateParams.pageid].child
            $scope.selectItem = 0;
            console.log($scope.issuePostService.issuePost.page[$scope.pageid])

            $scope.selected = function(index) {
                $scope.selectItem = index;
            };

            $scope.del = function(key, object) {
                //object.splice(key,1)
                if (Array.isArray(object)) object.splice(key, 1)
                else delete object[key]
                    //delete $scope.issuePostService.issuePost.page[$scope.pageid].child[$scope.selectItem].csstext[key]
                    //console.log( $scope.issuePostService.issuePost.page[$scope.pageid].child[$scope.selectItem].csstext)
            }
            $scope.addMC = function() {
                var addPage = new issueService.mc()
                console.log($scope.pageid)
                $scope.issuePostService.issuePost.page[$scope.pageid].child.push(addPage)
            }

            $scope.addCss = function() {
                var modalInstance = $modal.open({
                    templateUrl: 'templates/addcss.html',
                    controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
                        $scope.ok = function(css) {
                            //console.log( $scope.issuePostService.issuePost.page[$scope.pageid].child)
                            //$scope.issuePostService.issuePost.page[$scope.pageid].child[$scope.selectItem].csstext.push('{'+css.name+':'+css.val+'}')
                            if (css && css.name) $scope.issuePostService.issuePost.page[$scope.pageid].child[$scope.selectItem].csstext[css.name] = css.val
                            $modalInstance.close()
                        }


                    }],
                    scope: $scope,
                    size: 'sm'
                })

            }

            //$scope.addImg=function(){

            //}

            $scope.upload = function(obj) {

                console.log(obj)
                setTimeout(function() {
                    document.getElementById('uploadinput').click()
                        //$scope.clicked = true;
                }, 0);
            }

            var uploader = $scope.uploader = new FileUploader({
                url: 'data/api_1.php/rest/uploadimage/',
                autoUpload: 'true'
            });

            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
                console.info(response)
            };


        }
    ])
    .directive('signup', ['$http', function($http) {

        return {
            restrict: "AE",
            replace: true,
            scope: {
                name: "=",
                phone: "=",
                url: "@"
            },
            link: function(scope, element, attrs) {

                element[0].querySelector('.name').addEventListener('touchend', function(event) {
                    /* Act on the event */
                    this.focus()
                    event.preventDefault()
                });

                element[0].querySelector('.phone').addEventListener('touchend', function(event) {
                    /* Act on the event */
                    this.focus()
                    event.preventDefault()
                });

                element[0].querySelector('.submit').addEventListener('touchend', function(event) {
                    /* Act on the event */
                    if (check()) {
                        $http({
                            method: 'POST',
                            url: scope.url,
                            data: { name: scope.name, phone: scope.phone }
                        }).success(function(data) {
                            console.log('报名成功');
                        }).
                        error(function(data) {
                            console.log(data)
                            return data;
                        });
                    }
                    event.preventDefault()
                });


                function check() {

                    if (!scope.name || !scope.phone || scope.name == '' || scope.phone == '') {
                        alert('请输入正确信息')
                        return false
                    }
                    if (scope.phone.length < 11) {
                        alert('请输入11位手机号码！');
                        element[0].querySelector('.phone').focus()
                        return false;
                    }

                    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                    if (!myreg.test(scope.phone)) {
                        alert('请输入有效的手机号码！');
                        element[0].querySelector('.phone').focus()
                        return false;
                    }
                    return true
                }


            },
            template: "<dl class=\"signup\">" +
                "<input type=\"text\" ng-model=\"name\" class=\"name\">" +
                "<input type=\"number\" ng-model=\"phone\" class=\"phone\"/>" +
                "<dd class='submit' ng-click=\"rollService.dataPost()\"></dd>" +
                "</dl>"
        }

    }])
    .directive('touch', function() {
        return {
            controller: function($scope, $element, $attrs, $timeout, $location) {

                var t = 0,
                    r = 0,
                    n = 0,
                    u = $scope.pagecount * $scope.style.pageH;
                $scope.$watch('style.pageH', function(newVal, oldVal) {
                    u = $scope.pagecount * $scope.style.pageH;
                });

                $scope.data = {}

                $scope.onTouchstart = function($event) {
                    console.log($scope.TOUCH)
                    if ($scope.TOUCH == "false") return
                    var s = 0
                    $scope.TOUCH = 'start'
                        //var n=getTransform($scope.style.transform)
                    r = parseInt(get_transform_value($scope.style.transform, "translate3d", 1))
                    var i = $event.targetTouches || $event.changedTouches;
                    if (!!i) {
                        var s = i[0];
                        t = parseInt(s.pageY)

                    }
                    $event.preventDefault()
                }


                $scope.onTouchmove = function($event) {

                    if ("start" != $scope.TOUCH && "move" != $scope.TOUCH) return;
                    $event.preventDefault()
                    var s = $event.targetTouches || $event.changedTouches;
                    if (!!s) {
                        var o = s[0];
                        n = parseInt(o.pageY - t)
                        $scope.style.transform = "translate3d(0," + (r + n) + "px,0)"
                    }
                    $scope.TOUCH = 'move'

                }

                $scope.onTouchend = function($event) {
                    if ("start" == $scope.TOUCH && o != 0) return;
                    $event.preventDefault()
                    var s = parseInt(get_transform_value($scope.style.transform, "translate3d", 1)) || r,
                        o = s - r,
                        f = $scope.pagnum;
                    if (Math.abs(o) > 80) {

                        o > 0 && r < 0 ? f = $scope.pagnum - 1 : o < 0 && Math.abs(r - $scope.style.pageH) < u && (f = $scope.pagnum + 1), console.log("f=" + f), $scope.gotoPage($scope.pagnum, f);
                        return
                    }
                    if (0 == o) return;
                    $element.toggleClass("restore")
                    $scope.style.transform = "translate3d(0,-" + $scope.pagnum * $scope.style.pageH + "px,0)",
                        $timeout(function() {
                            $element.removeClass("restore")
                        }, 200)
                    $scope.TOUCH = "end"

                }

                $scope.turnto = function(t, n, r) {
                    if ($scope.TOUCH != 'start') return
                    $scope.gotoPage(t, n, r)
                }

                $scope.gourl = function(href) {
                    if ($scope.TOUCH != 'start') return
                    console.log('gourl')
                        //$location.path('http://'+href)
                    window.location.href = ('http://' + href);
                }

                $scope.modal = function(url) {
                    $scope.data.modalimg = url
                    $scope.data.modal = true


                }

                $scope.modalhide = function() {

                    $scope.data.modal = false
                }

                $scope.gotoPage = function(t, n, r) {


                    var s = r ? "without_keep" : "keep",
                        d = $scope.pageanmi,
                        e = $element,
                        o = r ? 0 : 600;
                    e.toggleClass(s)
                    $scope.style.transform = "translate3d(0,-" + n * $scope.style.pageH + "px,0)"
                    $scope.TOUCH = "false"
                    $timeout(function() {

                        if (t != n) {
                            //d[t] = '{init:false}'
                            //d[n] = '{init:true}'

                            //console.log(n + ":" + d[n])
                            //console.log(t + ":" + d[t])
                        }
                        e.removeClass(s)
                        $scope.pagnum = n
                        $scope.TOUCH = "true"
                    }, o)



                }


            }
        }
    }).directive("init", function() {
        return {
            controller: function($scope, $element, $attrs, $timeout) {


                var watch = $scope.$watch('pagnum', function(newValue, oldValue, scope) {

                    console.log('page' + $scope.pagnum)
                    init()

                });




                //var a = parseInt($element.parent().attr('class'))


                var init = function() {

                    var a = parseInt($element.parent().parent().attr('class').split('sec')[1])
                    if ($scope.pagnum == a) {

                        var b = $attrs.addclass

                        if ($attrs.delay) {
                            var a = $attrs.delay
                            $timeout(function() {
                                $element.toggleClass(b)
                            }, a)
                        } else {
                            $element.toggleClass(b)
                        }
                    } else {
                        var b = $attrs.addclass
                        $element.removeClass(b)
                    }
                }

                //$scope.wam = wam
                /*if ($scope.pageanmi[$scope.pagnum] && $scope.pageanmi[$scope.pagnum].init && $attrs.addclass) {
                    var b = $attrs.addclass

                    if ($attrs.delay) {
                        var a = $attrs.delay
                        $timeout(function() {
                            $element.toggleClass(b)
                        }, a)
                    } else {
                        $element.toggleClass(b)
                    }
                }*/
            }
        }
    }) //.controller('ModalInstanceCtrl',ModalInstanceCtrl)

//angular.module('demo', []).controller('ModalInstanceCtrl',ModalInstanceCtrl)






function getTransform(e) {

    var results = e.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);

    if (!results) return [0, 0, 0];

    if (results[1] == '3d') return results.slice(2, 5);

    results.push(0);
    return results.slice(5, 8);
}

function get_transform_value(e, t) {
    t = t.replace(/\-/g, "\\-");
    var n = [0];
    if (arguments.length > 2)
        for (var r = 2; r < arguments.length; ++r) n[r - 2] = arguments[r];
    if ("none" == e || "" == e) return null;
    var i = new RegExp(t + "\\(([^\\)]+)\\)", "ig"),
        s = e.match(i),
        o = [],
        u = [];
    if (s && s.length > 0) {
        s = s[0],
            o = s.replace(i, "$1").split(",");
        for (var r = 0; r < n.length; ++r) u.push(o[n[r]])
    }
    return u.length == 1 && (u = u[0]),
        u
}

/*
 */




/*
    .directive("hideMe", function( $log, $animateCss ) {
    return function(scope, element, attrs) {
        
        scope.$watch(attrs.hideMe, function(newVal) {          
          
                        $animateCss(element,{
              // BUG - If I set `from` I expect it to assign those values immediately and 
              //       then animate to the `to` values. This does NOT happen!
              
              //  from    : {opacity: !!newVal ? 0 : 1},
              to      : {opacity:   newVal ? 0 : 1},
              duration: 1,
            })
            .start()
            .then( onComplete );                  

                        function onComplete() { 
              $log.debug('Done Hide = '+ newVal ); 
            };          
        });
    };
  
});*/

function AppController($scope, $rootScope, $http, $timeout) {

    // grid(0), list (1)
    $scope.layoutMode = 0;
    $scope.list = [];
    $scope.currentAnimation;
    $scope.isShow = true;
    $scope.animations = ["toggle",
        "spin-toggle",
        "scale-fade",
        "scale-fade-in",
        "bouncy-scale-in",
        "flip-in",
        "slide-left",
        "slide-right",
        "slide-top",
        "slide-down",
        "bouncy-slide-left",
        "bouncy-slide-right",
        "bouncy-slide-top",
        "bouncy-slide-down",
        "rotate-in"
    ];

    $scope.addItem = function(animation) {
        $scope.animation = animation;
        for (var i = 0; i < 6; i++) {
            $timeout(function() {
                $scope.list.push({
                    title: "item"
                });
            }, 100 * i);
        };
    }

    $scope.removeItem = function(item) {
        var index = $scope.list.indexOf(item);
        $scope.list.remove(index);
    }

    $scope.cleanList = function() {
        for (var i = 0; i < $scope.list.length; i++) {
            $timeout(function() {
                $scope.list.pop();
            }, 100 * i);
        };
    }

    // Play all animation, it will auto clean item list.
    $scope.autoPlayAnimation = function(index) {
        var animation = $scope.animations[index];
        if (animation) {
            $scope.currentAnimation = animation;
            $scope.addItem(animation);
            $timeout(function() {
                $scope.cleanList();
            }, 1000);
            $timeout(function() {
                $scope.autoPlayAnimation(++index);
            }, 2000);
        } else {
            $scope.currentAnimation = undefined;
        }
    }

    $scope.switchGridMode = function() {
        $scope.layoutMode = 0;
    }

    $scope.switchListMode = function() {
        $scope.layoutMode = 1;
    }

    $scope.toggle = function() {
        $scope.isShow = !$scope.isShow;
    }
}
