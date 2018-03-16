var app = angular.module('range', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.organize.views.range", {
        url : "/range",
        views : {
            "content@root.organize.views":{
                templateUrl : "root/organize/views/range/_res/html/index.html",
                controller:"rangeCtrl"
            },"menu@root.organize.views.range":{
                templateUrl : "root/organize/views/range/_res/html/menu.html",
                controller:"rangeMenuCtrl"
            }
        }
    }).state("root.organize.views.range.list[12]",{
        url:"/list[12]?id=&name=&page",
        views:{
            "content@root.organize.views.range":{
                templateUrl : "root/organize/views/range/list/_res/html/index.html",
                controller:'listCtrl'
            }
        }
    }).state("root.organize.views.range.edit[12]",{
        url:"/edit[12]?id=",
        views:{
            "content@root.organize.views.range":{
                templateUrl : "root/organize/views/range/edit/_res/html/index.html",
                controller:'editCtrl'
            }
        }
    }).state("root.organize.views.range.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.organize.views.range":{
                templateUrl : "root/organize/views/range/add/_res/html/index.html",
                controller:'addCtrl'
            }
        }
    })
});

