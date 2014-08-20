module.exports = function(grunt){

    var base = __dirname + "/public/";
    var jsdir = base + "js/";
    var fs = require("fs");
    var exec = require("child_process").exec;


    /**
     * The main files we want to watch
     */
    var files = [
        jsdir + "/Main.js",
        jsdir + "/services/*.js",
        jsdir + "/directives/*.js",
        jsdir + "/controllers/*.js",
        jsdir + "/filters/*.js",
        jsdir + "*.js"
    ];

    /**
     * Libraries we're using
     */
    var libs = [
        base + "bower_components/angular/angular.js",
        base + "bower_components/angular-ui-router/release/angular-ui-router.js",
            base + "bower_components/angular-local-storage/LocalStorage.js",

        jsdir + "/libs/plugins/CSSPlugin.js",
        jsdir + "libs/TweenMax.js"
    ];

    grunt.initConfig({
        pkg:grunt.file.readJSON("package.json"),
        uglify:{
            dev:{
                options:{
                    compress:true,
                    mangle:false,
                    beautify:true
                    // banner:"/** \nSiberia.io main js files\n*/\n\n"
                },

                files:{
                    "./public/build/all.min.js":files
                }

            },
            libs:{
                options:{
                    compress:true,
                    mangle:false,
                    beautify:true
                    // banner:"/** \nAll the libs for the site. \n*/\n\n"
                },

                files:{
                    "./public/build/libs.min.js":libs
                }

            },

        },

        compass: {
            dist: {
                options: {
                    basePath:__dirname + "/public",
                    sassDir:"scss",
                    cssDir: "css"
                }

            }
        },
        watch: {
            options: {
                livereload: true
            },

            js:{
                files: [
                    files,
                    libs
                ],
                tasks:["uglify:dev"]
            },

            compass:{
                files:[
                        __dirname +"/public/scss/*.scss",
                        __dirname + "/public/scss/templates/*.scss"
                ],
                tasks:['compass:dist']
            }

        }
    })

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks('grunt-contrib-compass');

    //builds everything
    grunt.registerTask( 'default', ['uglify:dev','compass:dist']);
    grunt.registerTask('libs',['uglify:libs']);





};//end gruntfile
