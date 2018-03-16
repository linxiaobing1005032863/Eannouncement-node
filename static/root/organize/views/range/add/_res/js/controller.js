var app = angular.module('addCtrlM', ['toastr']);
app.controller('addCtrl', function($scope,rangeSer,$state,toastr){
    //科目
    $scope.projectFlatTOs = [{classifyFlatTOs:[{workRangeListTOs:[{}]}]}];
    $scope.addObj = function () {
        var obj = {classifyFlatTOs:[{workRangeListTOs:[{}]}]};
        $scope.projectFlatTOs.push(obj);
    };
    $scope.delObj = function (flag) {
        if( $scope.projectFlatTOs.length == 1) return;
        $scope.projectFlatTOs.splice(flag,1);
    };
    //专业分类
    $scope.addObj1 = function (index) {
        var obj1 = {workRangeListTOs:[{}]};
        $scope.projectFlatTOs[index].classifyFlatTOs.push(obj1);
    };
    $scope.delObj1 = function (index,flag) {
        console.log($scope.projectFlatTOs[index].classifyFlatTOs.length);
        if($scope.projectFlatTOs[index].classifyFlatTOs.length == 1) return;
        $scope.projectFlatTOs[index].classifyFlatTOs.splice(flag,1)
    };
    //工作范围
    $scope.addObj2 = function (i,index) {
        var obj2 = {};
        $scope.projectFlatTOs[i].classifyFlatTOs[index].workRangeListTOs.push(obj2);
        console.log($scope.projectFlatTOs[i].classifyFlatTOs[index].workRangeListTOs);
    };
    $scope.delObj2 = function (i,index,flag) {
        if($scope.projectFlatTOs[i].classifyFlatTOs[index].workRangeListTOs.length == 1) return;
        $scope.projectFlatTOs[i].classifyFlatTOs[index].workRangeListTOs.splice(flag,1);
    };
    $scope.addFun = function () {
        var data = {
            id:$scope.add.id,
            projectFlatTOs: angular.copy($scope.projectFlatTOs)
        };
        var addData = converFormData(data);
        rangeSer.addRangeList(addData).then(function (response) {
            if(response.data.code == 0){
            $state.go('root.organize.views.range.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    }
});
//数据类型转换工具
function converFormData() {
    var objToFormData = function (obj, obj2, sec, flag) {
        if (obj) {
            var count = 0;
            for (var name in obj) {
                var val = obj[name];
                if (val instanceof Array) {
                    val.forEach(function (item, index) {
                        for (var name2 in item) {
                            var val2 = item[name2];
                            if (val2 instanceof Array) {
                                val2.forEach(function (dItem, dIndex) {
                                    for (var name3 in dItem) {
                                        var val3 = dItem[name3];
                                        if (val3 instanceof Array) {
                                            val3.forEach(function (sItem, sIndex) {
                                                objToFormData(sItem, obj, name + '[' + index + '].' + name2 + '[' + dIndex + '].' + name3, sIndex);
                                            })
                                        }else {
                                            if((typeof val3) != 'function'){
                                                obj[name + '[' + index + '].' + name2+'['+dIndex+'].'+name3] = val3;
                                            }
                                        }
                                    }
                                });
                            } else {
                                if ((typeof val2) != 'function') {
                                    obj[name + '[' + index + '].' + name2] = val2;
                                }
                            }
                        }
                    });
                    delete obj[name];
                } else if (sec) {
                    if ((typeof val) != 'function') {
                        obj2[sec + '[' + flag + '].' + name] = val;
                        count++;
                    }
                } else if (typeof val == 'object') {
                    for (var key in val) {
                        obj[name + '.' + key] = val[key];
                    }
                    delete obj[name];
                }
            }
        }
    }
    var _obj = $.extend(true, {}, arguments[0]);
    objToFormData(_obj);
    return _obj;
}





