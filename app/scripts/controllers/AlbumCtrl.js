(function() {

  function AlbumCtrl(Fixtures, SongPlayer, $stateParams) {

        Fixtures.getAlbum($stateParams.title).then((res) => {
            this.albumData = res;          
        });
        this.songPlayer = SongPlayer;
      }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', '$stateParams', AlbumCtrl]);
})();
