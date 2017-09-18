(function() {
      function SongPlayer($rootScope, Fixtures, $stateParams) {
       var SongPlayer = {};

       var currentAlbum = Fixtures.getAlbum($stateParams.title);
       console.log("songplayer " + currentAlbum);
          /**
            * @desc Buzz object audio file
            * @type {Object}
            */
          var currentBuzzObject = null;

          /**
            * @desc holds the volume level so that unmuting returns to the previous volume
            * @type {Number}
            */
          var userVolume = null;

          /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
           var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
              $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();

                  var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                  var currentSongLength = currentAlbum.songs[currentSongIndex].duration;

                  if(SongPlayer.currentTime == currentBuzzObject.getDuration()){
                    SongPlayer.next();
                  }
              });
          });

          currentBuzzObject.bind("volumechange", function (){
            $rootScope.$apply(function() {
                SongPlayer.volume = currentBuzzObject.getVolume();
            });
          });

            SongPlayer.currentSong = song;
         };

         /**
          * @function playSong
          * @desc plays audiofile and sets song.playing to true
          * @param {Object} song
          */
         var playSong = function(song) {

            currentBuzzObject.play();
            song.playing = true;

         };

         /**
          * @function getSongIndex
          * @desc returns index of song from currentAlbum
          * @param {Object} song
          * @returns {Object} song
          */

         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
         * @function stopSong
         * @desc stops song playing and sets playing to null
         * @param {Object} song
         */
         var stopSong = function(){
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
         }
         /**
           * @desc Active song object from list of songs
           * @type {Object}
           */
           SongPlayer.currentSong = null;
          /**
            * @desc Current playback time (in seconds) of currently playing song
            * @type {Number}
            */
            SongPlayer.currentTime = null;

            /**
              * @desc Current volume
              * @type {Number}
              * set to 80 as this is the Buzz default
              */
            SongPlayer.volume = 80;
            userVolume = SongPlayer.volume;

         /**
          * @function play
          * @desc sets song object, sets song.playing to true, plays song
          * @param {Object} song
          */
          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
              setSong(song);
              playSong(song);


           }else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                 //currentBuzzObject.play();
                 playSong(song);
             }
            }
    };
    /**
     * @function pause
     * @desc pauses audiofile and sets song.playing to false
     * @param {Object} song
     * @returns {Object} SongPlayer
     */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
     * @function previous
     * @desc sets current song index to previous track
     */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);

       }else{
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
      }
    };
    /**
     * @function next
     * @desc sets current song index to next track
     */
     SongPlayer.next = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex++;

       if (currentSongIndex >= currentAlbum.songs.length) {

         stopSong(SongPlayer.currentSong);
        }else{
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
       }
     };

     /**
      * @function mute
      * @desc mutes or unmutes volume
      */
      SongPlayer.mute = function() {
        //1. as a user i want to unmute the song and have it play at the previous volume
          if(currentBuzzObject.getVolume() > 0){
            SongPlayer.volume = 0;
            currentBuzzObject.setVolume(0);
          }else{
            SongPlayer.volume = userVolume;
            currentBuzzObject.setVolume(userVolume);
          }
      };

     /**
      * @function setCurrentTime
      * @desc Set current time (in seconds) of currently playing song
      * @param {Number} time
      */
      SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
              currentBuzzObject.setTime(time);

          }
      };

      /**
       * @function timeInMins
       * @desc convert time in seconds to time in minutes
       * @param {Number} time
       * @returns {Number} time.toTimer
       */
      SongPlayer.timeInMins = function(time){
        return currentBuzzObject.toTimer(time);
      }

      /**
       * @function setVolume
       * @desc sets the volume
       * @param {Number} vol
       */
       SongPlayer.setVolume = function(volume) {
           if (currentBuzzObject) {
               currentBuzzObject.setVolume(volume);
               userVolume = volume;
           }
       };

       /**
        * @function getIcon
        * @desc returns correct speaker icon depending on whether player is muted
        * @story  as a user i want to see that a song is muted by a change to the speaker icon
        */
        SongPlayer.getIcon = function() {
          if(currentBuzzObject){
            if (currentBuzzObject.getVolume() === 0) {
                return "icon ion-volume-mute";
            }
            else{
              return "icon ion-volume-high"
          }
         }
        };
          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope','Fixtures', '$stateParams', SongPlayer]);
 })();
