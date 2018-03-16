var app = angular.module('editCtrlM', ['toastr']);
app.controller('editCtrl', function($scope, rangeSer,$stateParams,$state,toastr,){
    var data = {id:$stateParams.id};
    $scope.ath = null;
    rangeSer.getRangeData(data).then(function (response) {
        if(response.data.code == 0){
            $scope.edit = response.data.data;
            $scope.arrList = [];
            angular.forEach($scope.edit,function (obj) {
                $scope.editM = obj;
                $scope.idEdit = obj.id;
                $scope.projectFlatTOs = obj.projectFlatBOs;
                angular.forEach($scope.projectFlatTOs,function (obj1) {
                    angular.forEach(obj1.classifyFlatBOs,function (obj2) {
                       angular.forEach(obj2.workRangeListBOs,function (obj3) {
                           var arrA = obj3.node;
                           var arrB = obj3.workRanges;
                           changT(arrA,arrB);
                      /*     console.log(arrA);
                           console.log(arrB);*/
                           // for(key in obj3){
                           //     for (var i = 0;i<obj3[key];i++){
                           //         var o = {};
                           //        o.name = obj3[key][i];
                           //         delete i;
                           //         var add = obj3[key].push(o);
                           //         console.log(add);
                           //     }
                           //
                           // // obj3[key].push({name:obj3[key][i]});
                           //
                           //     // $scope.arr.push({name:obj3[key]};
                           // }
                       })
                   })
                })
            });
        }
    });
    function changT(A,B) {
        $scope.arrC = [];
        $scope.arrD = [];
        for(var i=0;i<A.length;i++)
        {
            $scope.arrC.push({name:A[i]});
            $scope.arrD.push({name:B[i]})
        }
    }


   /* $scope.testList = [
        {node:[{name:'1'},{name:'2'}]},
        {workRanges:[{name:'3'},{name:'4'}]}
        ];
    console.log($scope.testList[0].node);
    for(var i =0;i<$scope.testList;i++){
        $scope.a = $scope.testLis.node;
        console.log($scope.a)
    }*/

  /*  var test1=["1","2","3"];
    var test2 = [];
    for(var i=0;i<test1.length;i++)
    {
        test2.name = test1[i];
        test2.push({name:test1[i]})
    }
    console.log(test2);*/

    //科目
    $scope.projectFlatTOs = [{classifyFlatBOs:[{workRangeListBOs:[{workRanges:[''],node:['']}]}]}];
    $scope.addObj = function () {
        var obj = {classifyFlatBOs:[{workRangeListBOs:[{workRanges:[''],node:['']}]}]};
        $scope.projectFlatTOs.push(obj);
    };
    $scope.delObj = function (flag) {
        if( $scope.projectFlatTOs.length == 1) return;
        $scope.projectFlatTOs.splice(flag,1);
    };
    //专业分类
    $scope.addObj1 = function (index) {
        var obj1 = {workRangeListBOs:[{workRanges:[''],node:['']}]};
        $scope.projectFlatTOs[index].classifyFlatBOs.push(obj1);
    };
    $scope.delObj1 = function (index,flag) {
        if($scope.projectFlatTOs[index].classifyFlatBOs.length == 1) return;
        $scope.projectFlatTOs[index].classifyFlatBOs.splice(flag,1)
    };

     //工作范围
     $scope.addObj2 = function (obj) {
         var o = {};
         o.name ='';
         obj.push(o);
     };
     $scope.delObj2 = function (obj,flag) {
         if(obj.length == 1) return;
         obj.splice(flag,1);
     };
        //工作界面版
    $scope.addObj3 = function (obj) {
        var p = {};
        p.name ='';
        obj.push(p);
    };
    $scope.delObj3 = function (obj,faz) {
        if(obj.length == 1) return;
        obj.splice(faz,1);
    };
    $scope.editFun = function () {

        var data = {
            idEdit:$scope.idEdit,
            status1:$scope.editM.status1,
            id:$scope.editM.id,
        };
        for(var i =0;i<$scope.projectFlatTOs.length;i++){
            var o = $scope.projectFlatTOs;
            var k = $scope.projectFlatTOs[i].classifyFlatBOs;
            data['projectFlatTOs['+i+']'+'.project'] =o[i].project;
            for(var j =0;j<$scope.projectFlatTOs[i].classifyFlatBOs.length;j++){
                data['projectFlatTOs['+i+']'+'.classifyFlatTOs['+j+']'+'.classify'] =k[j].classify;
                for(key in $scope.arrC){
                for(var e =0;e<$scope.arrC.length;e++){
                            var o = {};
                           o.name = $scope.arrC[e];
                           o.name = $scope.arrD[e];
                            delete e;
                        $scope.arrC.push(o);
                        $scope.arrD.push(o);
                    takeType($scope.arrC,$scope.arrD)
                  }

                }
                function takeType(c,d) {
                    $scope.arrE = c.join(',');
                    $scope.arrF = d.join(',');
                    data['projectFlatTOs['+i+']'+'.classifyFlatTOs['+j+']'+'.workRangeListTOs['+e+']'+'.workRange'] =$scope.arrE;
                    data['projectFlatTOs['+i+']'+'.classifyFlatTOs['+j+']'+'.workRangeListTOs['+e+']'+'.node'] = $scope.arrF;
                }
            }
        }
        rangeSer.editRange(data).then(function (response) {
            if(response.data.code == 0){
                $state.go('root.organize.views.range.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






