(function(){
  function SongPlayer() {
    var SongPlayer = {};
    
    SongPlayer.play = function(song) {
      console.log('attempting to play song');
      var currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.play();    
      console.log('playing song');
    };
    
    return SongPlayer;
  }
  
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();