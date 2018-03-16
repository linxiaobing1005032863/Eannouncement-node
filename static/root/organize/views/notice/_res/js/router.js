var app = angular.module('notice', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.organize.views.notice", {
        url : "/notice",
        views : {
            "content@root.organize.views":{
                templateUrl : "root/organize/views/notice/_res/html/index.html",
                controller:"noticeCtrl"
            },"menu@root.organize.views.notice":{
                templateUrl : "root/organize/views/notice/_res/html/menu.html",
                controller:"noticeMenuCtrl"
            }
        }
    }).state("root.organize.views.notice.list[12]",{
        url:"/list[12]?id=&name=&page",
        views:{
            "content@root.organize.views.notice":{
                templateUrl : "root/organize/views/notice/list/_res/html/index.html",
                controller:'listCtrl'
            }
        }
    }).state("root.organize.views.notice.edit[12]",{
        url:"/edit[12]?id=",
        views:{
            "content@root.organize.views.notice":{
                templateUrl : "root/organize/views/notice/edit/_res/html/index.html",
                controller:'editCtrl'
            }
        }
    }).state("root.organize.views.notice.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.organize.views.notice":{
                templateUrl : "root/organize/views/notice/add/_res/html/index.html",
                controller:'addCtrl'
            }
        }
    })
});

