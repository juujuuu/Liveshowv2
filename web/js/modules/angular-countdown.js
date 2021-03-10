(function () {
    var app = angular.module('countdown', ['ngSanitize', 'ui', 'ui.filters', 'ui.bootstrap', 'ui.router']).config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
    var countdown;
    var target;
    app.controller('CountdownController', function ($scope, $attrs, $window) {
        $scope.day, $scope.hour, $scope.minute, $scope.second;
        $scope.startup = function (time) {
            console.log(time);
            target = time;
            setInterval(checkTime, 1000);
        }
        function checkTime (){
            var destination_time;
            const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;
            let arr = target.split("/");
            destination_time = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]).getTime();
            let now = new Date().getTime();
            countdown = destination_time - now;
            
            $scope.$apply(function () {
                $scope.day = Math.floor(countdown / day);
                $scope.hour = Math.floor((countdown % (day)) / (hour));
                $scope.minute = Math.floor((countdown % (hour)) / (minute));
                $scope.second = Math.floor((countdown % (minute)) / second);
            });
        }
    });
})();