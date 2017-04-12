'use strict';


// Initialize the Firebase SDK
var config = {
  apiKey: "AIzaSyDi0egNqUM-dZDjIiipjW-aSRYuXlFc3Ds",
  authDomain: "dride-2384f.firebaseapp.com",
  databaseURL: "https://dride-2384f.firebaseio.com",
  storageBucket: "dride-2384f.appspot.com",
  messagingSenderId: "802741428178"
};
firebase.initializeApp(config);


/**
 * @ngdoc overview
 * @name drideApp
 * @description
 * # drideApp
 *
 * Main module of the application.
 */
angular
  .module('drideApp', [
    'ngAnimate',
    'ngRoute',
    'angularVideoBg',
    'swipe',
    'ui.bootstrap',
    'firebase',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.poster',
    'hljs',
    'ngTouch',
    'analytics.mixpanel',
    'yaru22.angular-timeago',
    'markdown',
    'infinite-scroll'
  ])
   .run(function($rootScope, $location, $anchorScroll, $mixpanel, $uibModal, $http, login, Auth) {

        $rootScope.haveSideBar = false;



        $rootScope.$on('$locationChangeSuccess', function(event){
                  $rootScope.currentPage = '/' + $location.path().split('/')[1];
                  $rootScope.showOverlay = false;
                  $rootScope.haveSideBar = $rootScope.haveSideBarF()
                  $rootScope.collapse = '';
                  $anchorScroll();
        })

        

        $rootScope.showOverlay =  false;
      

        $rootScope.auth = Auth;

        console.log($rootScope.auth)

        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
        });

        $rootScope.toggleOverlay = function(){
          $rootScope.showOverlay =  !$rootScope.showOverlay;
          $rootScope.collapse =  !$rootScope.collapse;
        }

        $rootScope.haveSideBarF = function(){

          if ($rootScope.currentPage == '/features' || $rootScope.currentPage == '/documentation' || $rootScope.currentPage.indexOf('/c')!=-1){
            return true;
          }else
            return false;

        }

        $rootScope.needForum = function(){

          if ($rootScope.currentPage == '/forum' || $rootScope.currentPage == '/documentation' || $rootScope.currentPage.indexOf('/c')!=-1){
            return true;
          }else
            return false;

        }

        $rootScope.login = function($state){
        
          login.openLogin($state);

        }

        $rootScope.logOut = function(){
        
          login.logOut();

        }

        $rootScope.goTo = function(state){
          $location.path(state);
        }

        $rootScope.initBuyProcess = function(){


                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modals/subscribe.html',
                    controller: ['$uibModalInstance', '$rootScope', '$scope', '$location', function($uibModalInstance, $rootScope, $scope, $location) {


                        $scope.closeModal = function() {

                            $uibModalInstance.dismiss('cancel');
                        };

                        $scope.goToPurchase = function(email){

                            $http({
                                  method: 'GET',
                                  url: 'https://api.dride.io/validator/subscribe.php?email=' + email
                            });

                            $uibModalInstance.dismiss('cancel');

                            $mixpanel.track('subscribe ' + email);
                            
                            $location.path('/buy');
                            //location.href = "https://www.kickstarter.com/projects/1969971763/dride-connected-dashcam-with-safety-alerts-and-app?ref=7wieq3"
                        }

                    }]
                });

            


        }
     
  })
  .factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
      return $firebaseAuth();
    }
  ])
  .config(function ($routeProvider, $locationProvider, $sceDelegateProvider, hljsServiceProvider, $mixpanelProvider) {

    hljsServiceProvider.setOptions({
      // replace tab with 4 spaces
      tabReplace: '    '
    });
    
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'https://dride-2384f.firebaseio.com/**',
      'https://api.reddit.com/hot?after**'
    ]);

    $mixpanelProvider.apiKey('eae916fa09f65059630c5ae451682939');

    $routeProvider

      // .when('/', {
      //   templateUrl: 'views/cloud.html',
      //   controller: 'CloudCtrl',
      //   controllerAs: 'cloud'
      // })


      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/page-not-found', {
        templateUrl: 'views/page-not-found.html',
        controller: 'PageNotFoundCtrl',
        controllerAs: 'pageNotFound'
      })
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl',
        controllerAs: 'blog'
      })
      .when('/features', {
        templateUrl: 'views/features.html',
        controller: 'FeaturesCtrl',
        controllerAs: 'features'
      })
      .when('/docs', {
        templateUrl: 'views/docs.html',
        controller: 'DocsCtrl',
        controllerAs: 'docs'
      })
      .when('/documentation', {
        templateUrl: 'views/documentation.html',
        controller: 'DocumentationCtrl',
        controllerAs: 'documentation'
      })
      .when('/profile/:uid/:videoId', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/c/:pageTtl', {
        templateUrl: 'views/innercontentpage.html',
        controller: 'InnercontentpageCtrl',
        controllerAs: 'innerContentPage'
      })
      .when('/buy', {
        templateUrl: 'views/buy.html',
        controller: 'BuyCtrl',
        controllerAs: 'buy'
      })
      .when('/forum', {
        templateUrl: 'views/forum.html',
        controller: 'ForumCtrl',
        controllerAs: 'forum'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })

      .when('/cloud', {
        templateUrl: 'views/cloud.html',
        controller: 'CloudCtrl',
        controllerAs: 'cloud'
      })
      .when('/uploadToCloud', {
        templateUrl: 'views/uploadtocloud.html',
        controller: 'UploadtocloudCtrl',
        controllerAs: 'uploadToCloud'
      })
      .when('/thread/:threadId', {
        templateUrl: 'views/thread.html',
        controller: 'ForumThreadCtrl',
        controllerAs: 'thread'
      })

      .when('/invoice', {
        templateUrl: 'views/invoice.html',
        controller: 'InvoiceCtrl',
        controllerAs: 'invoice'

      })
      .otherwise({
        redirectTo: '/page-not-found'
      });

      $locationProvider.html5Mode(true).hashPrefix('!');
  });
