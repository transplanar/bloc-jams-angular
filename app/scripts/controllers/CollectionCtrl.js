(function(){
//  function CollectionCtrl(){
  function CollectionCtrl(Fixtures){
//    this.albums = [];
    this.albums = Fixtures.getCollection(12);
//    
//    var times = 12;
//    
//    while(times--){
//      this.albums.push(angular.copy(albumPicasso));
//    }
   
  }
  
  angular
    .module('blocJams')
//    .controller('CollectionCtrl', CollectionCtrl);
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();