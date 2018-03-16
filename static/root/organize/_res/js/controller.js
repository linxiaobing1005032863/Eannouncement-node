var app = angular.module('organize', []);
app.controller('organizeCtrl', function ($scope,$state) {
    if ($state.current.url == '/organize') {//默认加载列表
        $state.go('root.organize.views');
    }
}).controller('navCtrl',function($scope,$state,$location){
  /*  var active =$location.path().split('/')[4];
    console.log($location.path().split('/')[1]);
    $scope.navCla=active?active:'views';
    $scope.navClass= function(name){
       $scope.navCla=name
    };*/

/*    $scope.isSelected = true;*/
    //左边导航变色
    $scope.menuClass = 'knowMenu';
    $scope.hideDaf = function ($event) {
        $event.stopPropagation();
    };
    //中间导航变色
    $scope.changMenu='masMenu';
    $scope.masClass= function(color){
        $scope.changMenu=color;
    };
    $scope.home = function (name) {
        $scope.menuClass = 'homeMenu';
    };
    $scope.home = function (name) {
        $scope.menuClass = 'announMenu';
    };
    // $scope.home = function (name) {
    //     $scope.menuClass = 'annMenu';
    // };
    $scope.notice = function () {
        $scope.menuClass = 'noticeMenu';
    };
    $scope.know = function () {
        $scope.menuClass = 'knowMenu';
    };
    $scope.archives = function () {
        $scope.menuClass = 'archivesMenu';
    };
    $scope.sudden = function () {
        $scope.menuClass = 'suddenMenu';
    };
    $scope.bonus = function () {
        $scope.menuClass = 'bonusMenu';
    };
    $scope.commendable = function () {
        $scope.menuClass = 'commendableMenu';
    };
    $scope.ambition = function () {
        $scope.menuClass = 'ambitionMenu';
    };
    $scope.contract = function () {
        $scope.menuClass = 'contractMenu';
    };
    $scope.business = function () {
        $scope.menuClass = 'businessMenu';
    };
    $scope.budget = function () {
        $scope.menuClass = 'budgetMenu';
    };
    $scope.fund = function () {
        $scope.menuClass = 'fundMenu';
    };
    $scope.accounting = function () {
        $scope.menuClass = 'accountingMenu';
    };
    $scope.follow = function () {
        $scope.menuClass = 'followMenu';
    };
    $scope.centripetal = function () {
        $scope.menuClass = 'centripetalMenu';
    };
        /*资质管理*/
    $scope.aptitude = function () {
        $scope.navClass = 'aptitudeMenu';
        if( $scope.navClass == 'aptitudeMenu'){
            $scope.oulShow = false;
        }
    };
    $scope.synopsis = function () {
        $scope.navClass = 'synopsisMenu';
    };
    $scope.company = function () {
        $scope.navClass = 'companyMenu';
    };
    $scope.organize = function () {
        $scope.navClass = 'organizeMenu';
    };
    $scope.personnel = function () {
        $scope.navClass = 'personnelMenu';
    };
    $scope.toggle = false;
    $scope.toggle4 = false;
    
    $scope.toggle4  = function () {
        /*alert('111')*/
    }

});


