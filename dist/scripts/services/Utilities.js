(function(){
  function Utilities(){
    var Utilities = {};
    
    Utilities.loopIndex = function(index, collection, forward){
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

    Utilities.indexToNumber = function(item) {
      return item + 1;
    };

    return Utilities;
  };
  
  angular
    .module('blocJams')
    .factory('Utilities', Utilities);
})();