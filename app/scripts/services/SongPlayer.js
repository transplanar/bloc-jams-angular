(function(){
//  function SongPlayer(Fixtures) {
  function SongPlayer(Fixtures, Utilities) {
    /**
     * @desc Object that will store the SongPlayer singleton
     * @type {Object}
   */
    var SongPlayer = {};
    
    /**
     * @desc Stores the current album
     * @type {Object}
   */
    var currentAlbum = Fixtures.getAlbum();

    /**
     * @desc Stores the last song that was selected by the user
     * @type {Object}
   */
    SongPlayer.currentSong = null;
    
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
        SongPlayer.currentSong.playing = false; //NOTE should this be null? Why?
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      SongPlayer.currentSong = song;
    };
    
    /**
     * @function getSongIndex
     * @desc Returns the index of song argument
     * @param {Object} song
     * @return {Object} integer
   */
    var getSongIndex = function(song){
      return currentAlbum.songs.indexOf(song);
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
     * @function play
     * @desc Manages behavior of the play button to toggle between pause and play states
     * @param {Object} song
   */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      
      if(SongPlayer.currentSong !== song){
        setSong(song);  
        playSong(song);
        
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }      
      
    };
    
    /**
     * @function pause
     * @desc Managed behavior of the pause button
     * @param {Object} song
   */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;

      currentBuzzObject.pause();
      song.playing = false;
    };
    
    /**
     * @function navigateAlbum
     * @desc Navigates to the next or previous song based on the value of forward
     * @param {Boolean} forward
   */
    SongPlayer.navigateAlbum = function(forward){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      
//      currentSongIndex = loopIndex(currentSongIndex, currentAlbum.songs, forward);
      currentSongIndex = Utilities.loopIndex(currentSongIndex, currentAlbum.songs, forward);
      
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    };

    return SongPlayer;
  }
  
  //TODO move this to a global utility service
//  var loopIndex = function(index, collection, forward){
//    var increment = forward ? 1 : -1;
//    var newIndex;
//
//    if( index >= (collection.length-1) && forward ){
//      newIndex = 0;
//    }else if (index <= 0 && !forward){
//      newIndex = collection.length-1;
//    }else {
//      newIndex = index + increment;
//    }
//
//    return newIndex;
//  }
  
  /**
     * @desc initialize SongPlayer as an Angular Factory Service
   */
  
  angular
    .module('blocJams')
//    .factory('SongPlayer', ['Fixtures', SongPlayer]);
    .factory('SongPlayer', ['Fixtures', 'Utilities', SongPlayer]);
})();