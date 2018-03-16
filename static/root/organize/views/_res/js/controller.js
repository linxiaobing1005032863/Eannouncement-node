var app = angular.module('views', [{
    files:[
        "root/organize/views/_res/js/service.js"
    ]
}]);
app.controller('viewsCtrl',function ($scope,$state) {
    if ($state.current.url == '/views') {//默认加载列表
        $state.go('root.organize.views.classes');
    }
    //父 Ctrl 监听到事件，向下广播
    $scope.$on('changeId',function(event,msg){
        $scope.$broadcast('listId',msg)
    });
}).controller('viewMenuCtrl',function($scope,$state,$rootScope,$location){
    $scope.navCla='classes';
    var active =$location.path().split('/')[3];
    // $scope.navCla=active?active:'views';
    $scope.navCla=active?active:'classes';
    $scope.navClass= function(name){
        $scope.navCla = name;
    };
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass=urlName+"Menu";
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
    if($location.path().split('/').slice(-1)=='list'){
            $scope.menuClass = 'listMenu';
        }
    });
    //监听到父Ctrl后改变事件
    // $scope.$on("listId", function(event, msg){
    //     $scope.idList = msg;
    // });
    //父 Ctrl 监听到事件，向下广播

    // $scope.$on("getCustomer", function(event, num){
    //     $scope.customerNum = num;
    // });

    $scope.login = function(){
        var absurl = $location.absUrl();
        ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes' });
        location.href="http://localhost/login";//部署到线上时要改为登录域名
    };
});

