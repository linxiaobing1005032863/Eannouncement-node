var app = angular.module('app', ['ngVerify','ipCookie',
    'indexSerModule'
]);
app.controller('rootCtrl', function ($scope,$rootScope,$state,ipCookie,rootSer,$location) {
    if ($state.current.url == '/root') {//默认加载列表
        $state.go('root.organize');
    }
    $scope.username = ipCookie('username');
    if($scope.username==undefined){
        $scope.username="登录用户"
    }else {
        $scope.logined=true;
    }
    $scope.login = function(){
        var absurl = $location.absUrl();
        ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes' });
        location.href="http://localhost/login";//部署到线上时要改为登录域名
    };
    $scope.logout = function(){
        rootSer.logout().then(function(response){
            if(response.data.code==0){
                ipCookie.remove("username");
                $scope.username="登录用户";
                $scope.logined=false;
            }
        })
    }
});

/*增加滚动条*/
app.directive('resize', function ($window) {
    return function (scope,element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return { 'h': w.height() };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.style = function () {
                return {
                    'height': (newValue.h - 55) + 'px',
                };
            };
        }, true);
        w.bind('resize', function () {
            scope.$apply();
        });
    };
});