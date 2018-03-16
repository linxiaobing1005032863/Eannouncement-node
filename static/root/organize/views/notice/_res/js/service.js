var app = angular.module('noticeServer',[]);
app.factory('noticeSer',function ($http) {
    return {
        noticeList : noticeList,
        menuPermission : menuPermission,
        addnotice:addnotice,
        editnotice:editnotice,
        findnoticeId:findnoticeId,
        countnotice:countnotice,
        allNumbers:allNumbers,
        allAuthors:allAuthors,
        deletenotice:deletenotice,
        noticeCongel:noticeCongel,
        noticeThaw:noticeThaw,
        getClass:getClass,
        findMails:findMails,
        getuuid:getuuid,
        getUserList:getUserList,
        getallClass:getallClass,
        getallUsers:getallUsers

    };


    //菜单权限
    function menuPermission(data) {
        return $http.get('/notice/guidePermission/'+data);
    }
    //列表
    function noticeList(data) {
        return $http.get('/notice/list',{
            params: data
        })
    }

    //添加
    function addnotice(data){
        return $http.post('/notice/add',data)
    }

    //编辑
    function editnotice(data){
        return $http.post('/notice/edit',data)
    }
    //id查询
    function findnoticeId(data){
        return $http.get('/notice/getOneById',{
            params:data
        })
    }
    //分页总条数
    function countnotice(data){
        return $http.get('/notice/count',{params:data})
    }
    //冻结
    function noticeCongel(data){
        return $http.get('/notice/noticeCongel',{params:data})
    }
    //解冻
    function noticeThaw(data){
        return $http.get('/notice/noticeThaw',{params:data})
    }
    //删除
    function deletenotice(data){
        return $http.get('/notice/delete',{
            params: data

        })
    }
    //获取 查找所有分类(添加的）
    function getallClass(){
        return $http.get('/classes/allClass')
    }
    //获取发布对象
    function getallUsers(){
        return $http.get('/announcement/receipter/list')
    }
    //获取 查找所有分类
    function getClass(){
        return $http.get('/notice/getClass')
    } 
    //获取 查找所有编号
    function allNumbers(){
        return $http.get('/notice/allNumbers')
    } 
    //获取 查找所有作者
    function allAuthors(){
        return $http.get('/notice/allAuthors')
    } 
    //查找所有公共邮箱
    function findMails(){
        return $http.get('/notice/findMails')
    }
    //生成id
    function getuuid(){
        return $http.get('/notice/uuid')
    }
    function getUserList(){
        return $http.get('/notice/getUserList')
    }
});
