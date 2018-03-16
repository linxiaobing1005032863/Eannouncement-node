var app = angular.module('views', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.organize.views", {
        url : "/views",
        views : {
            "content@root.organize" : {
                templateUrl : "root/organize/views/_res/html/index.html",
                controller:"viewsCtrl"
            },"menu@root.organize.views" : {
                templateUrl : "root/organize/views/_res/html/menu.html",
                controller:"viewMenuCtrl"
            }
        }
    })
});

