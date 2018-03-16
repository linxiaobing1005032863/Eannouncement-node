var app = angular.module('rangeSer',[]);
app.factory('rangeSer',function ($http) {
    return {
        InfoAreaList : InfoAreaList,
        addRangeList : addRangeList,
        getRangeData : getRangeData,
        editRange:editRange,
        deleteRange: deleteRange,
        closeRange : closeRange,
        resetRange : resetRange,
    };
    function InfoAreaList(data) {                    //列表
        return $http.get('/workRange/flat/list',{
            params:data
        })
    }
    function addRangeList(data) {                   //添加
        return $http.post('/workRange/flat/add',data)
    }
    function getRangeData(data){                   //获取数据
        return $http.get('/workRange/findByid',{
            params:data
        })
    }
    function editRange(data) {    //编辑
        return $http.post('/workRange/flat/edit',data)
    }
    function deleteRange(data) {                    //删除
        return $http.get('/workRange/delete',{
            params:data
        })
    }
    function closeRange(data) {                      //关闭
        return $http.post('/workRange/close',data)
    }
    function resetRange(data) {                         //重启
        return $http.post('/workRange/reset',data)
    }
});
