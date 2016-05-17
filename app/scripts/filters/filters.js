angular.module('formatTime',[])
  .filter('secondsToTime', [function(){
    return function(time){
      if( Number.isNaN(Number.parseFloat(time)) ){
        return '-:--';
      }
      
      var minutes = Math.floor(time / 60);
      var seconds  = Math.floor(time % 60);

      if(seconds < 10){
        seconds = '0' + seconds;
      }

      return minutes + ":" + seconds;
    }
  }]);