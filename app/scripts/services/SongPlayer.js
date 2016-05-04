(function(){
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;
    
    /**
     * @desc Buzz object audio file
     * @type {Object}
   */
    var currentBuzzObject = null;
    
    /**
     * @function setSong
     * @desc Stops currently playing song and loads selected song as currentBuzzObject
     * @param {Object} song
   */
    var setSong = function(song){
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = false; //NOTE should this be null? Why?
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      currentSong = song;
    };

    //TODO missing resume play of current song
    SongPlayer.play = function(song) {
      if(currentSong !== song){
        setSong(song);  
        currentBuzzObject.play();
        
        song.playing = true;
        
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }      
    };
    
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }
  
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();