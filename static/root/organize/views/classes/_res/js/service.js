var app = angular.module('classesServer',[]);
app.factory('classesSer',function ($http) {
    return {
        classesList : classesList,
        menuPermission : menuPermission,
        addclasses:addclasses,
        editclasses:editclasses,
        findclassesId:findclassesId,
        countclasses:countclasses,
        deleteclasses:deleteclasses,
        getAllClass:getAllClass
    };
    //菜单权限
    function menuPermission(data) {
        return $http.get('/classes/guidePermission/'+data);
    }
    //列表
    function classesList(data) {
        return $http.get('/classes/list',{
            params: data
        })
    }

    //添加
    function addclasses(data){
        return $http.post('/classes/save',data)
    }

    //编辑
    function editclasses(data){
        return $http.post('/classes/edit',data)
    }
    //id查询
    function findclassesId(data){
        return $http.get('/classes/classes',{
            params:data
        })
    }
    //分页总条数
    function countclasses(data){
        return $http.get('/classes/count',{params:data})
    }

    //删除
    function deleteclasses(data){
        return $http.get('/classes/delete',{
            params: data

        })
    }
    //查找所有分类
    function getAllClass(data){
        return $http.get('/classes/allClass',{
            params: data

        })
    }
});
