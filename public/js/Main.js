var app = angular.module("FireFoxMarket",[
    "ui.router",
    "LocalStorageModule"
]);


app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider.state("home",{
        url:"/",
        templateUrl:"/templates/home.html"
    });
});


app.controller("main",function($window,$rootScope,API,localStorageService){

    /**
     * Check to see if the user is logged in
     */
    if(localStorageService.get("loggedin")){
       var val = localStorageService.get("loggedin");

        $rootScope.loggedin = true;
    };

    /**
     * Starts the login process.
     */
    $rootScope.login = function(){

    }; //end login

});