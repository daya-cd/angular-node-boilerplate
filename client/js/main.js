require.config({
  baseUrl: 'js/',
  urlArgs: "cachebuster=" + (new Date()).getTime(),
  waitSeconds: 200,
  paths: {
    'jquery': 'libs/jquery', // jQuery v2.1.3
    'angular': 'libs/angular', // AngularJS v1.4.0.1
    'angular-route': 'libs/angular-route',
    'angular-ui-router': 'libs/angular-ui-router', // angular-ui v0.2.14
    'angularAMD': 'libs/angularAMD', // angularAMD v0.2.1 - @doc : https://github.com/marcoslin/angularAMD
    'ngload': 'libs/ngload', 
    'angular-resource': 'libs/angular-resource', // angular-resource v1.2.16
    'bootstrap': 'libs/bootstrap',
    'ngAnimate': 'libs/angular-animate',
    'ui-bootstrap':'libs/angular-ui/ui-bootstrap-tpls-0.12.0.min',
    'angucomplete':'libs/angucomplete',
    'chart':'libs/chart',
    'html2canvas':'libs/html2canvas',
    'jspdf':'libs/jspdf'

  },

  shim: {    

    'angularAMD': ['jquery','angular' ],
    'angular-route': [ 'angular' ],
    'ngload': [ 'angularAMD' ],
    'angular-resource': [ 'angular' ],
    'angular-ui-router': [ 'angular' ],
    'bootstrap': [ 'jquery' ],
    'ngAnimate': [ 'angular', 'angularAMD' ],
    'angular-ui-router': [ 'angular' ],
    'ui-bootstrap': ['angular'],
    'angucomplete':['angular','angularAMD'],
    'chart': [ 'angular', 'angularAMD' ],
    'html2canvas':[ 'angular', 'angularAMD' ],
    'jspdf':[ 'angular', 'angularAMD' ],
    'app': ['angular','ui-bootstrap','angucomplete'],
  },

  // start application
  deps: ['app']
});