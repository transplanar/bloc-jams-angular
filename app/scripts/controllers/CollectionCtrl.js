(function(){
  function CollectionCtrl(){
    this.albums = [];
    
    var times = 12;
    
    while(times--){
      this.albums.push(angular.copy(albumPicasso));
    }
   
  }
  
  angular
    .module('blocJams')
    .controller('CollectionCtrl', CollectionCtrl);
})();