(function() {
    function Fixtures($firebaseArray) {
        var Fixtures = {};

        var ref = firebase.database().ref().child('albums');
        var albumCollection = $firebaseArray(ref);



        Fixtures.getAlbum = function(albumID) {
             var result = albumCollection.$loaded().then(function(el){                
                return el.$getRecord(albumID);
              })
              return result;
          };

    Fixtures.getCollection = function(numberOfAlbums){
      return albumCollection;
    };

        return Fixtures;
    }

    angular
        .module('blocJams')
        .factory('Fixtures', ['$firebaseArray', Fixtures]);
})();
