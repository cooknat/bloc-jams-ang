(function() {

  function AlbumCtrl(Fixtures, SongPlayer, $stateParams) {

        this.albumData = JSON.parse(Fixtures.getAlbum($stateParams.title));
        this.songPlayer = SongPlayer;
        console.log("album control " + this.albumData);


    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', '$stateParams', AlbumCtrl]);
})();
