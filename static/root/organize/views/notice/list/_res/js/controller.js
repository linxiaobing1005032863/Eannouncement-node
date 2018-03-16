var app = angular.module('cenCtrlM', ['toastr','ng-pagination']);
app.controller('listCtrl',function($scope,noticeSer,toastr,$stateParams,$state){
    if($scope.InfoAreaLists) return;
    //获取搜索 
    $scope.numbers = $stateParams.numbers?$stateParams.numbers:'';
    $scope.classifys = $stateParams.classifys?$stateParams.classifys:'';
    $scope.authors = $stateParams.authors?$stateParams.authors:'';
    $scope.publishDate = $stateParams.publishDate?$stateParams.publishDate:'';
    if($stateParams.numbers || $scope.classifys || $scope.authors || $scope.publishDate){
        $scope.$emit('isId', false);
        $scope.isView = false;
    }else{
        $scope.$emit('isId', true);
    }
    //搜索
    $scope.search = function(){
        var publishDate = angular.element('.publishDate').val();
        $state.go('root.announcement.notice.list[12]',{numbers:$scope.numbers,classifys:$scope.classifys,authors:$scope.authors,publishDate:publishDate});
    }
    
    $scope.titles = ['编号','分类','作者','发布日期'];
    //列表
    function activatePage(page) {
        var publishDate = angular.element('.publishDate').val() || $scope.publishDate;
        var listData = {
            page:page || 1,
            numbers:$scope.numbers || "",
            classifys:$scope.classifys || "",
            authors:$scope.authors || "",
            publishDate:$scope.publishDate || ""
        };
        noticeSer.noticeList(listData).then(function (response) {
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
        noticeSer.countnotice(listData).then(function(response){
            if(response.data.code==0){
                $scope.custom.itemsCount = response.data.data;
                $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;
            }else{
                toastr.error(response.data.msg, '温馨提示');
            }
        });
    }
    //分页 插件
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };
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
                $scope.congeal = true;
                break;
        }
    }
    $scope.cancel = function () {  //取消删除
        $scope.delShow = false;
        $state.go('root.organize.views.notice.list[12]',{id:null,name:null});
    };
    $scope.shop = function(){ //取消冻结
        $scope.congeal = false;
        $state.go('root.organize.views.notice.list[12]',{id:null,name:null});
    };
    //确认删除
    $scope.delFn = function(){//确认删除
        var data = {
            id:$stateParams.id
        };
        noticeSer.deletenotice(data).then(function(response){
            if(response.data.code==0){
             /*   count++;*/
                toastr.info( "信息已删除", '温馨提示');
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                $state.go('root.organize.views.notice.list[12]',{id:null,name:null});
               /* if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.organize.views.notice.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.organize.views.notice.list[12]',{id:null,name:null,page:$location.search().page-1});
                }*/
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    //冻结
    $scope.closeFn = function(){
        var da = {
            id :$stateParams.id
        };
        noticeSer.noticeCongel(da).then(function(response){
            if(response.data.code==0){
                toastr.info( "信息已冻结", '温馨提示');
                $scope.$emit('changeId', null);
                $scope.retShow = false;
                $state.go('root.organize.views.notice.list[12]',{id:null,name:null});
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        })
    };
    //解冻
    $scope.thaw = function(event){
        var data = {
            id :event.id
        };
        noticeSer.noticeThaw(data).then(function(response){
            if(response.data.code==0){
                event.status = "NORMAL"
            }else {
                toastr.error( response.data.msg, '温馨提示');
            }
        })
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

//自定义过滤器
app.filter('notice', function(){
    return function(val){
        var result;
        switch(val){
            case "FREEZE":
                result = "冻结";
                break;
            case "NORMAL":
                result = "正常";
                break;
        }
        return result;
    }

})