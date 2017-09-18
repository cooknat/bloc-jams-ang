(function() {
    function PlayerBarCtrl(Fixtures, SongPlayer, $stateParams) {
        this.albumData = Fixtures.getAlbum($stateParams.title);
        this.songPlayer = SongPlayer;
        console.log("player control " + this.albumData);
    }

    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', '$stateParams', PlayerBarCtrl]);
})();
