angular.module('formatTime',[])
  .filter('secondsToTime', [function(){
    return function(time){
      if( Number.isNaN(Number.parseFloat(time)) ){
        return '-:--';
      }else{
        return buzz.toTimer(time);
      }
    }
  }]);