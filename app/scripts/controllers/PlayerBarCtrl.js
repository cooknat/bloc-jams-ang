(function() {
    function PlayerBarCtrl(Fixtures, SongPlayer, $stateParams) {
        Fixtures.getAlbum($stateParams.title).then((res) => {
            this.albumData = res;
        });
        this.songPlayer = SongPlayer;

    }

    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', '$stateParams', PlayerBarCtrl]);
})();
