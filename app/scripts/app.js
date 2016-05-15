(function(){
  function config($stateProvider, $locationProvider){
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('landing',{
        url: '/',
        controller: 'LandingCtrl as landing',
        templateUrl: '/templates/landing.html'
      })
      .state('album',{
        url: '/album',
        controller: 'AlbumCtrl as album',
        templateUrl: '/templates/album.html'
      })
      .state('collection',{
        url: '/collection',
        controller: 'CollectionCtrl as collection',
        templateUrl: '/templates/collection.html'
      });
  }
  
  
  angular
//    .module('blocJams', ['ui.router'])
    .module('blocJams', ['formatTime', 'ui.router'])
    .config(config)
    .factory('Utils', function(){
      return {
        loopIndex: function(index, collection, forward){
            var increment = forward ? 1 : -1;
            var newIndex;

            if( index >= (collection.length-1) && forward ){
              newIndex = 0;
            }else if (index <= 0 && !forward){
              newIndex = collection.length-1;
            }else {
              newIndex = index + increment;
            }

          return newIndex;
        }
      }
    })
  .run(function($rootScope, Utils){
    $rootScope.helpers = Utils;
  })
})();
