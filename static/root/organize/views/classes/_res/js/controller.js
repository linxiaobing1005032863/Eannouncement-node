var app = angular.module('classes', [{
    files:[
        "root/organize/views/classes/_res/js/service.js"
    ]
}]);
app.controller('classesCtrl',function ($scope,$state) {
    if ($state.current.url == '/classes') {//默认加载列表
        $state.go('root.organize.views.classes.list[12]');
    }
    $scope.$on("listId", function(event,dir){
        $scope.id = dir;
    });
}).controller('classesMenuCtrl',function($scope,$state,$rootScope,$location){
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass = urlName+"Menu";
    $scope.navClass= function(name){
        $scope.menuClass = name;
    };
    if (window.location.href.split('id=')[1]) {//如果是刷新进来的页面，没有经过list
        $scope.id = window.location.href.split('id=')[1];
        if($location.search().name){
            $scope.menuClass = $location.search().name + 'Menu'
        }
    }
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]'&& window.location.href.indexOf('id=') == -1){
            $scope.menuClass = 'listMenu';
        }
    });
    //监听到父Ctrl后改变事件
    $scope.$on("listId", function(event, msg){
        $scope.idList = msg;
    });
    $scope.$on("getCustomer", function(event, num){
        $scope.customerNum = num;
    });
    $scope.$on("listId", function(event,dir){
        $scope.id = dir;
    });

    $scope.delete = function(){
        if($scope.id){
            $state.go('root.organize.views.classes.list[12]',{id:$scope.id,name:'delete',page:$scope.page});
            $scope.menuClass = 'deleteMenu';
        }
    };
    $scope.close = function(){
        if($scope.id){
            $state.go('root.organize.views.classes.list[12]',{id:$scope.id,name:'close'});
            $scope.menuClass = 'closeMenu';
        }
    };
    $scope.reset = function(){
        if($scope.id){
            $state.go('root.organize.views.classes.list[12]',{id:$scope.id,name:'reset'});
            $scope.menuClass = 'resetMenu';
        }
    };
    $scope.edit = function(){
        if($scope.id){
            $state.go('root.organize.views.classes.edit[12]',{id:$scope.id});
            $scope.menuClass = 'editMenu'
        }
    };
    $scope.list = function(){
        $scope.menuClass = 'listMenu';
        $scope.id = null;
    };
    $scope.add = function(){
        $scope.menuClass = 'addMenu';
        $scope.id = null;
    };
});
