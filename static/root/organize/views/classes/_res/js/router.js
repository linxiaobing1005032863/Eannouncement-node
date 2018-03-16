var app = angular.module('classes', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.organize.views.classes", {
        url : "/classes",
        views : {
            "content@root.organize.views":{
                templateUrl : "root/organize/views/classes/_res/html/index.html",
                controller:"classesCtrl"
            },"menu@root.organize.views.classes":{
                templateUrl : "root/organize/views/classes/_res/html/menu.html",
                controller:"classesMenuCtrl"
            }
        }
    }).state("root.organize.views.classes.list[12]",{
        url:"/list[12]?id=&name=&page",
        views:{
            "content@root.organize.views.classes":{
                templateUrl : "root/organize/views/classes/list/_res/html/index.html",
                controller:'listCtrl'
            }
        }
    }).state("root.organize.views.classes.edit[12]",{
        url:"/edit[12]?id=",
        views:{
            "content@root.organize.views.classes":{
                templateUrl : "root/organize/views/classes/edit/_res/html/index.html",
                controller:'editCtrl'
            }
        }
    }).state("root.organize.views.classes.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.organize.views.classes":{
                templateUrl : "root/organize/views/classes/add/_res/html/index.html",
                controller:'addCtrl'
            }
        }
    })
});

