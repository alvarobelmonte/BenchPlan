'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages', 'ngRoute'])
.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'views/tabs/tabs.html'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('tabs.plantilla', {
      url: '/plantilla',
      views: {
        'plantilla-tab' : {
          templateUrl: 'views/plantilla/plantilla.html',
          controller:'plantillaController'
        }
      }
    }) 
    .state('tabs.addPlayer', {
      url: '/plantilla/addPlayer',
      views: {
        'plantilla-tab' : {
          templateUrl: 'views/addPlayer/addPlayer.html',
          controller:'addPlayerController'
        }
      }
    }) 
    .state('tabs.detail', {
      url: '/plantilla/:aId',
      views: {
        'plantilla-tab' : {
          templateUrl: 'views/detalleJugador/detalleJugador.html',
          controller:'plantillaController'
        }
      }
    })
    .state('tabs.alineaciones', {
      url: '/alineaciones',
      views: {
        'alineaciones-tab' : {
          templateUrl: 'views/alineaciones/alineaciones.html',
          controller:'alineacionesController'
        }
      }
    })
    .state('tabs.addAlineacion', {
      url: '/alineaciones/addAlineacion',
      views: {
        'alineaciones-tab' : {
          templateUrl: 'views/addAlineacion/addAlineacion.html',
          controller:'addAlineacionController'
        }
      }
    })
    .state('tabs.detailAlineacion', {
      url: '/alineaciones/:aId',
      views: {
        'alineaciones-tab' : {
          templateUrl: 'views/detailAlineacion/detailAlineacion.html',
          controller:'alineacionesController'
        }
      }
    })
    .state('tabs.calendario', {
      url: '/calendario',
      views: {
        'calendario-tab' : {
          templateUrl: 'views/calendario/calendario.html',
          controller:'calendarioController'
        }
      }
    })
    .state('tabs.addEvento', {
      url: '/calendario/addEvento',
      views: {
        'calendario-tab' : {
          templateUrl: 'views/addEvento/addEvento.html',
          controller:'addEventoController'
        }
      }
    })
    .state('tabs.detailCalendario', {
      url: '/calendario/:aId',
      views: {
        'calendario-tab' : {
          templateUrl: 'views/detailCalendario/detailCalendario.html',
          controller:'calendarioController'
        }
      }
    });




$urlRouterProvider.otherwise("/login");
})
// Changue this for your Firebase App URL.
.constant('FURL', 'https://torrid-inferno-6199.firebaseio.com/')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });


  
});

