angular.module('Services', []).

/**
 * IssuePostService
 */
factory('IssuePostService', [
    '$http',

    function($http) {
        var restUrl = 'http://lumen.app/issues';
        var restConfig = {
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                //'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
            //,Credentials: true
        };
        return {
            issuePost: {},
            fetchIssuePost: function(issuePostId) {
                var self = this;

                return $http({
                    method: 'GET',
                    url: restUrl + '/' + issuePostId,
                }).
                success(function(data) {
                    return self.issuePost = data;
                }).
                error(function(data) {
                    console.log(data)
                    return data;
                });
            }

        };
    }
]).
factory('audioService', ['$rootScope', function($rootScope) {
    var audio = {
        playing: false,
        ready: false,
        _audio: null,
        play: function() {

            this.playing = true
            if (this._audio) this._audio.play();

        },
        load: function(src) {

            var options_audio = {
                loop: true,
                preload: "auto",
                src: src
            }
            this._audio = new Audio();

            for (var key in options_audio) {
                if (options_audio.hasOwnProperty(key) && (key in this._audio)) {
                    this._audio[key] = options_audio[key];
                }
            }
            this._audio.load();

            var self = this
            this._audio.addEventListener('play',
                function() {
                    self.playing = true;
                })
            this._audio.addEventListener('pause',
                function() {
                    self.playing = false;
                })

            this._audio.play();


        },
        stop: function() {
            this.playing = false
            if (this._audio) this._audio.pause();
        }
    }
    return audio;
}])
.factory('rollService',['$http', function($http){
        
        return {
            dataPost: function(data,url) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: data
                }).
                success(function(data) {
                    console.log('报名成功');
                }).
                error(function(data) {
                    console.log(data)
                    return data;
                });
            }
        }
    }
])
