angular.module('Services', []).

/**
 * IssuePostService
 */
factory('IssuePostService', [
    '$http',
    '$state',

    function($http, $state) {
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
])
