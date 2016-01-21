angular.module('hommy.controllers', ['hommy.sevices'])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout,$state) {
        $scope.changeLocation = function () {
            $state.go('app.location');
        };
        $scope.username = 'Hommy';
    })

    .controller('getChefs', function ($scope, $state,$stateParams,$window,$http) {

        $scope.homeFilter = {
            veg:undefined,
            delivery:undefined
        };

        $scope.filter = {
            veg:false,
            quick:false
        };

        $scope.filterByVeg = function(){
            if($scope.filter.veg){
                $scope.filter.veg = false;
                $scope.homeFilter.veg = undefined
            }else{
                $scope.filter.veg = true;
                $scope.homeFilter.veg= true;
            }
        };

        $scope.filterByQuick = function(){
            if($scope.filter.quick){
                $scope.filter.quick = false;
                $scope.homeFilter.delivery = undefined
            }else{
                $scope.filter.quick = true;
                $scope.homeFilter.delivery= 90;
            }
        };

        var kit = Parse.Object.extend("kitchens");
        var query = new Parse.Query(kit);

        $scope.chefs = [];
        query.find({
            success: function (r) {
                $scope.$apply(function () {
                    angular.forEach(r, function (e, i) {
                        e.attributes.objectId = e.id;
                        $scope.chefs.push(e.attributes);
                    });
                });
                console.log($scope.chefs);
            }
        });
        $scope.lolcation = null;
        $scope.position = null;
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function () {
                var a = position.coords.latitude + ',' + position.coords.longitude;
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + a + '&sensor=true')
                    .then(function (res) {
                        if ($stateParams.location != 'mylocation') {
                            return $scope.lolcation = $stateParams.location;
                        } else {
                            return $scope.lolcation = res.data.results[0].formatted_address;
                        }
                    });
            });
        });
        if($stateParams.location != 'mylocation'){
            $scope.lolcation = $stateParams.location;
        }
        $scope.getKitchen = function (id) {
            $state.go('app.kitchen', {chefId: $scope.chefs[id].objectId,name:$scope.chefs[id].name});
        };
    })
    .controller('getDishes', function ($scope, $stateParams) {

        $scope.kitchenName = $stateParams.name;

        $scope.dishes = [];

        var kit = Parse.Object.extend("kitchens");

        var dis = Parse.Object.extend("dishes");

        var kitQuery = new Parse.Query(kit);

        kitQuery.equalTo("objectId", $stateParams.chefId);

        var disQuery = new Parse.Query(dis);

        disQuery.matchesQuery("chef", kitQuery);

        disQuery.find({
            success: function (r) {
                $scope.$apply(function () {
                    angular.forEach(r, function (e, i) {
                        e.attributes.dishId = e.id;
                        $scope.dishes.push(e.attributes);
                        console.log(e.attributes);
                    });
                });
            },
            error: function (error) {
                // error is an instance of Parse.Error.
            }
        });

        $scope.increase = function (index) {
            $scope.dishes[index].cartCount++;
        };
        $scope.decrease = function (index) {
            $scope.dishes[index].cartCount--;
        };
    })

    .controller('getLocation',function($scope,$state,$ionicViewService,$ionicHistory) {

        $scope.myScopeVar = '';

        $scope.autocompleteOptions = {
            componentRestrictions: {
                country: 'IND'
            },
            types: ['geocode']
        };

        $scope.$on('g-places-autocomplete:select', function (place) {
            console.log(place);
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.kitchens', {location: place.targetScope.model.formatted_address});
        });

        $scope.goBack = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.kitchens', {location: 'mylocation'});
        }

    });