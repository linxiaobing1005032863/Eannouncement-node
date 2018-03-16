var app = angular.module('addCtrlM', ['toastr']);
app.controller('addCtrl', function($scope,classesSer,$state,toastr){
    
    $scope.addFun = function () {
        var addData = {
            name :$scope.vm.name,
            description :$scope.vm.description,
        };
        classesSer.addclasses(addData).then(function (response) {
            if(response.data.code == 0){
            $state.go('root.organize.views.classes.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    }
});