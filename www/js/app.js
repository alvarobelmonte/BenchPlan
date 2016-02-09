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
    .state('tabs.players', {
      url: '/players',
      views: {
        'players-tab' : {
          templateUrl: 'views/players/players.html',
          controller:'playersController'
        }
      }
    }) 
    .state('tabs.addPlayer', {
      url: '/players/addPlayer',
      views: {
        'players-tab' : {
          templateUrl: 'views/addPlayer/addPlayer.html',
          controller:'addPlayerController'
        }
      }
    }) 
    .state('tabs.playerDetail', {
      url: '/players/:aId',
      views: {
        'players-tab' : {
          templateUrl: 'views/playerDetail/playerDetail.html',
          controller:'playerDetailController'
        }
      }
    })
    .state('tabs.lineups', {
      url: '/lineups',
      views: {
        'lineups-tab' : {
          templateUrl: 'views/lineups/lineups.html',
          controller:'lineupsController'
        }
      }
    })
    .state('tabs.addLineup', {
      url: '/lineups/addLineup',
      views: {
        'lineups-tab' : {
          templateUrl: 'views/addLineup/addLineup.html',
          controller:'addLineupController'
        }
      }
    })
    .state('tabs.lineupDetail', {
      url: '/lineups/:aId',
      views: {
        'lineups-tab' : {
          templateUrl: 'views/lineupDetail/lineupDetail.html',
          controller:'lineupsController'
        }
      }
    })
    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab' : {
          templateUrl: 'views/calendar/calendar.html',
          controller:'calendarController'
        }
      }
    })
    .state('tabs.addEvent', {
      url: '/calendar/addEvent',
      views: {
        'calendar-tab' : {
          templateUrl: 'views/addEvent/addEvent.html',
          controller:'addEventController'
        }
      }
    })
    .state('tabs.eventDetail', {
      url: '/calendar/:aId',
      views: {
        'calendar-tab' : {
          templateUrl: 'views/eventDetail/eventDetail.html',
          controller:'calendarController'
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

