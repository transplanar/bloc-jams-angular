(function(){
  function SongPlayer() {
    /**
     * @desc Object that will store the SongPlayer singleton
     * @type {Object}
   */
    var SongPlayer = {};

    /**
     * @desc Stores the last song that was selected by the user
     * @type {Object}
   */
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
    
    /**
     * @function playSong
     * @desc Plays the selected song and indicates the song is playing (via boolean)
     * @param {Object} song
   */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true; 
    }

    /**
     * @function setSong
     * @desc Manages behavior of the play button to toggle between pause and play states
     * @param {Object} song
   */
    SongPlayer.play = function(song) {
      if(currentSong !== song){
        setSong(song);  
        playSong(song);
        
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
  
  /**
     * @desc initialize SongPlayer as an Angular Factory Service
   */
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();