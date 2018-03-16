var app = angular.module('organize',[]);
app.config(function ($provide, $stateProvider) {
    $stateProvider.state("root.organize", {
        url: "/organize",
        views: {
            "content@root": {
                templateUrl: "root/organize/_res/html/index.html",
                controller: "organizeCtrl"
            },"nav@root": {
                templateUrl: "root/organize/_res/html/nav.html",
                controller:"navCtrl"
            }
        }
    })
})


