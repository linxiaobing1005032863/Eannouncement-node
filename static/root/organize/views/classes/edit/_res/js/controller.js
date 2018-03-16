var app = angular.module('editCtrlM', ['toastr']);
app.controller('editCtrl', function($scope, classesSer,$stateParams,$state,toastr,){
    var infoEdit ={id: $stateParams.id}
    $scope.ath = null;
    classesSer.findclassesId(infoEdit).then(function (response) {
        if(response.data.code==0){
            $scope.edit = response.data.data;
            console.log( response.data.data)
        }else{
            toastr.error(response.data.msg,'温馨提示')
        }
    });
    $scope.editFun = function () {

        var data = {
            id:$stateParams.id,
            name :$scope.vm.name,
            description : $scope.vm.description,
        };
        classesSer.editclasses(data).then(function (response) {
            if(response.data.code == 0){
                $state.go('root.organize.views.classes.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






