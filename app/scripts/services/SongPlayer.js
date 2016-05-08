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
        SongPlayer.stopSong(SongPlayer.currentSong);        
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
    
    SongPlayer.stopSong = function(song){
      currentBuzzObject.stop();
      //NOTE review this
      song.playing = false; //Should this be null? Why?
    }
    
    /**
     * @function navigateAlbum
     * @desc Navigates to the next or previous song of current playlist/album
     * @param {String} direction (only values of 'forward' or 'backward' are valid)
   */
    SongPlayer.navigateAlbum = function(direction){
      if(direction == 'forward' || direction == 'backward'){
        var forward = (direction == 'forward');
      }else{
        throw('Invalid input \"' + direction + '\" passed to navigateAlbum');
        return null;
      }
      
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      
      currentSongIndex = Utilities.loopIndex(currentSongIndex, currentAlbum.songs, forward);
      
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    };

    return SongPlayer;
  }
  
  /**
     * @desc initialize SongPlayer as an Angular Factory Service
   */
  
  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', 'Utilities', SongPlayer]);
})();