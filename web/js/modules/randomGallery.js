(function () {
    var app = angular.module('gallery', ['ui.router', 'ngAnimate']).run(function () {

    });
    //TODO-------------------------INDEX AND VALUE ARENT THE SAME THING - THINK ON THAT
    app.controller('randomGallery', function ($scope, $http) {
        //files currently in use on the ui
        var usageArray = [];

        //file refresh rate in seconds
        var cycleTime = 3;

        var displayLimit = 10;
        //set display limit and cyleTime
        $scope.initLimits = function (limit = 4, cycle = 1) {
            displayLimit = limit;
            cycleTime = cycle * 1000;
        }

        //gen a random index between 0 and src_list length
        function randomIndex() {
            return Math.floor(Math.random() * $scope.src_list.length);
        }

        //refactor usageArray from new path generated
        function refactorUsageArray(path) {
            usageArray[Math.floor(Math.random() * usageArray.length)] = path;
        }

        //true if file in use, false otherwise
        function fileInUse(index) {
            return usageArray.indexOf($scope.src_list[index]) > -1;
        }

        //return the path of a random file in src_list and refactor usageArray
        $scope.getRandom = function () {
            let path = "";
            let jackpot = 0;
            let loop = true;
            while (loop) {
                jackpot = randomIndex();
                loop = fileInUse(jackpot);
            }
            path = $scope.src_list[jackpot];
            refactorUsageArray(path);
            return path;
        }
        //Call infinitely.  Refreshes all files at once
        function refreshAllFiles() {
            setTimeout(function () {
                console.log("file refresh");

                $scope.files.forEach(function (file, index) {
                    $scope.files[index] = $scope.getRandom();
                });
                refreshAllFiles();
                $scope.$apply();
            }, cycleTime);
        }

        //Call infinitely.  Creeping refresh.
        function creepingFileRefresh(creepingIndex) {
            setTimeout(function () {
                console.log("Creeping Refresh " + creepingIndex);

                $scope.files[creepingIndex] = $scope.getRandom();
                
                if (creepingIndex >= $scope.files.length - 1) {
                    creepingIndex = 0;
                } else {
                    creepingIndex++;
                }
                creepingFileRefresh(creepingIndex);
                $scope.$apply();
            }, cycleTime);
        }

        //Call infinitely.  Creeping random refresh.
        function randomCreepingRefresh() {
            setTimeout(function () {
                console.log("Creeping Refresh random");
                let randIndex = Math.floor(Math.random() * $scope.files.length);
                $scope.files[randIndex] = $scope.getRandom();
                randomCreepingRefresh();
                $scope.$apply();
                //setTimeout(function(){}, 5000);
            }, cycleTime);
        }
        
        var dataUrl = "../getimagedirectory";
        $http({
            method: "get",
            url: dataUrl,
            responseType: "json",
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).success(function (out, status) {
            console.log("file list:");
            console.log(out);
            
            $scope.src_list = out;
            $scope.src_list.pop();
            $scope.files = [];
            let i = 0;
            for (i = 0; i < displayLimit; i++) {
                let file = $scope.getRandom();
                $scope.files.push(file);
                usageArray.push(file);
            }
            randomCreepingRefresh();
        });

    });

})()
