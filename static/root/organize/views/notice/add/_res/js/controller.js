var app = angular.module('addCtrlM', ['toastr','angularjs-dropdown-multiselect','ueditor.directive']);
// var app = angular.module('addCtrlM', ['toastr','angularjs-dropdown-multiselect']);
app.controller('addCtrl', function($scope,noticeSer,$state,toastr){
    $scope.condis= [];
    $scope.users= [];
    $scope.stringSettings = {template : '{{option.email}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.stringSetting = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.objLists = [];
    noticeSer.getallClass().then(function(response){//查找所有分类
        if(response.data.code == 0){
            $scope.allClass = response.data.data;
        }else {
            toastr.error( response.data.msg, '温馨提示');
        }
    });
    noticeSer.getallUsers().then(function(response){///获取所有未冻结用户
        if(response.data.code == 0){
            $scope.allUserList = response.data.data;
            $scope.allUser = [];
            for(var i=0;i<$scope.allUserList.length;i++){
                $scope.allUser.push($scope.allUserList[i].username);
            }
        }else {
            toastr.error( response.data.msg, '温馨提示');
        }
    });
    noticeSer.findMails().then(function(response){//查找所有公邮
        if(response.data.code == 0){
            $scope.allMails = response.data.data;
        }else {
            toastr.error( response.data.msg, '温馨提示');
        }
    });
    var vue = false;
    $scope.Eclick = function () {
        if(vue){
            return;
        }
        noticeSer.getuuid().then(function(response){//获取uuid
            if(response.data.code == 0){
                $scope.getuuid = response.data.data;
                $scope.setId($scope.getuuid);
                vue = true;
            }else {
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    }
    $scope.addFun = function () {
        $scope.notice.recipients = [];
        for( var i = 0; i<$scope.users.length;i++){
            for(var j = 0;j<$scope.allUserList.length;j++){
                var o = $scope.allUserList[j]
                if($scope.users[i] == o.username){
                    $scope.notice.recipients.push(o.username);
                    break;
                }
            }
        }
        var data = $scope.notice;
        data.uuid = $scope.getuuid;
        // data.publishContent=UE.getEditor('editor')
        data.publishContent = $scope.ueditorGetContent('Container');
        noticeSer.addnotice(data).then(function (response) {
            if(response.data.code == 0){
            $state.go('root.organize.views.notice.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    }
    $scope.getContent=function(id){  
        var content=$scope.ueditorGetContent(id);
    }
    $scope.setContent=function(){  
        $scope.ueditorSetContent("Container","111111");            
    }





    // var ue = $scope.getContent();
    // //对编辑器的操作最好在编辑器ready之后再做
    // // ue.ready(function() {
    // $scope.ready=function(){
    //     //设置编辑器的内容
    //     ue.setContent('hello');
    //     //获取html内容，返回: <p>hello</p>
    //     var html = ue.getContent();
    //     //获取纯文本内容，返回: hello
    //     var txt = ue.getContentTxt();
    // }
    // });
});