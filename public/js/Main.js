/**
 * the main initialization file for the app.
 */

var app = angular.module("FirefoxMarket",[
    "ui.router",
    "LocalStorageModule"
]);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider,$httpProvider) {
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);

    //Enable cross domain calls
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

    /**
     * Home page
     */
    $stateProvider.state("home",{
        url:"/",
        templateUrl:"/build/templates/home.html"
    });


    /**
     * 404 page
     */
    $stateProvider.state("AppNotFound",{
        url:"/app/notfound",
        templateUrl:"/templates/apps/404.jade"
    });

    /**
     * Detail view of the app
     */
    $stateProvider.state("AppView",{
        url:"/app/:name",
        templateUrl:function(urlattr){
            return "/build/templates/apps/appview.html";
        },
        controller:"AppViewController"
    });

    /**
     * TODO decide what this ought to do? Was thinking it'd just show all the categories
     */
    $stateProvider.state("CategoryView",{
        url:"/category/:name",
        templateUrl:function(urlattr){
            return "/build/templates/apps/catview.html";
        },
        controller:"CategoryViewController"
    });


    /**
     * View to see a list of all the apps a developer has made
     */
    $stateProvider.state("AppDeveloperView",{
        url:"/developer/:name",
        templateUrl:function(urlattr){
            return "/build/templates/apps/appDevView.html";
        },
        controller:"AppDeveloperController"
    });

    delete $httpProvider.defaults.headers.common["X-Requested-Width"];
});


app.controller("main",function($window,$rootScope,API,localStorageService,$http,$scope) {
    $rootScope.menuOpen = false;
    /**
     * Check to see if the user is logged in
     */
    if (localStorageService.get("loggedin")) {
        var val = localStorageService.get("loggedin");
        $rootScope.loggedin = true;
    }

    /**
     * Starts the login process.
     */
    $scope.login = function() {
        navigator.id.request();
    }; //end login


    navigator.id.watch({
        loggedInUser:"",

        onlogin:function(assertation) {

            //TODO change to angular method?
            $.post("https://marketplace.firefox.com/api/v1/account/login/",{
                assertion:assertation,
                audience: window.location.origin
            },function(data) {
                $rootScope.USER = data;
                console.log(data);

                var username = document.querySelector("#username");

                TweenMax.to(username,1,{
                    opacity:0,
                    onComplete:function(){
                        //change the username
                        username.innerHTML = data.settings.display_name;

                        TweenMax.to(username,1, {
                            opacity: 1
                        });
                    }
                });


            });
        },
        onlogout:function(){
            $rootScope.USER = null;
        }
    });

    /**
     *  $.ajax({
                type:"POST",
                url:"https://marketplace.firefox.com/api/v1/account/login",
                data:{
                    assertation:assertation,
                    audience:"http://localhost:3000"
                },

                success:function(){
                    console.log("success")
                }
            });
     */

    /**
     * This hides the loader once content has been loaded.
     * @param delay
     */
    $rootScope.loaded = function(callback){

        //get rid of the loader
        TweenMax.to(document.querySelector("#loader"),0.2,{
            opacity:0,
            onComplete:function(){
                if(callback){
                    callback();
                }
            }
        });


    };

    /**
     * opens the user menu
     */
    $rootScope.openMenu = function(e){
        // if(localStorageService.getItem("loggedin") != "true"){
        var el = 0;
        var menu = 0;
        if($rootScope.menuOpen === false){

            if(e.target.tagName == "DIV"){
                el = e.target.children[0];
                TweenMax.to(el,1,{
                    css:{
                        rotation:180
                    }
                });
            }else{
                el = e.target;
                TweenMax.to(el,1,{
                    css:{
                        rotation:180
                    }
                });
            }


            menu = document.querySelector("#user-details");
            menu.className = "open";
            TweenMax.to(menu,1,{
                height:500
            });

            $rootScope.menuOpen = true;
        }else{

            if(e.target.tagName == "DIV"){
                el = e.target.children[0];
                TweenMax.to(el,1,{
                    css:{
                        rotation:-180
                    }
                });
            }else{
                el = e.target;
                TweenMax.to(el,1,{
                    css:{
                        rotation:-180
                    }
                });
            }


            menu = document.querySelector("#user-details");
            menu.className = "";
            TweenMax.to(menu,1,{
                height:45
            });


            $rootScope.menuOpen = false;

        }
    };

    /**
     * For some things, like bringing down the search pane,
     * we need to prevent scrolling
     */
    $rootScope.lockBody = function(){
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
    };

    $rootScope.unlockBody = function(){
        document.getElementsByTagName("html")[0].style.overflow = "scroll";
    };


});