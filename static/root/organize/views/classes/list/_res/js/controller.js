var app = angular.module('cenCtrlM', ['toastr','ng-pagination']);
app.controller('listCtrl',function($scope,classesSer,toastr,$stateParams,$state){
    if($scope.InfoAreaLists) return;
    //列表
    function activatePage(page) {
        if($scope.mailLists) return;
        var listData = {
            page:page || 1,
        };
        classesSer.classesList(listData).then(function (response) {
            if(response.data.code == 0){
                $scope.InfoAreaLists = response.data.data;
                if($stateParams.id){
                    if($stateParams.id.indexOf('&')){
                        $stateParams.id = $stateParams.id.split('&')[0];
                    }
                    angular.forEach($scope.InfoAreaLists,function(obj){
                        if(obj.id == $stateParams.id){
                            obj._selectList = true;
                        }
                    });
                    //向父Ctrl传递事件
                    $scope.$emit('changeId', $stateParams.id);
                }
            }else{
                toastr.error(response.data.msg, '温馨提示');
            }
        });
    }
    //分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };

    classesSer.countclasses().then(function(response){
        if(response.data.code==0){
            $scope.custom.itemsCount = response.data.data;
            $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;
        }else{
            toastr.error(response.data.msg, '温馨提示');
        }
    });
    $scope.myFn = function (name) {
        $scope.myClass = name;
    };
    //获取id
    if($stateParams.id){
        switch ($stateParams.name){
            case 'delete':
                $scope.delShow = true;
                break;
            case 'close':
                $scope.conShow = true;
                break;
            case 'reset':
                $scope.retShow = true;
                break;
        }
    }
    $scope.cancel = function () {  //取消删除
        $scope.delShow = false;
        $state.go('root.organize.views.classes.list[12]',{id:null,name:null});
    };
    //确认删除
    $scope.delFn = function(){//确认删除
        var data = {
            id:$stateParams.id
        };
        classesSer.deleteclasses(data).then(function(response){
            if(response.data.code==0){
             /*   count++;*/
                toastr.info( "信息已删除", '温馨提示');
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                $state.go('root.organize.views.classes.list[12]',{id:null,name:null});
               /* if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.organize.views.classes.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.organize.views.classes.list[12]',{id:null,name:null,page:$location.search().page-1});
                }*/
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    //点击改变列表颜色
    $scope.selectList = function(event){
        angular.forEach($scope.InfoAreaLists,function(obj){
            obj._selectList = false
        });
        event._selectList = true;
        $scope.id = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId',$scope.id);
    };
});

