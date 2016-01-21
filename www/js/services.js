/**
 * Created by Ramesh on 12/14/2015.
 */
angular.module('hommy.sevices',[])
    .service('HOMMYInteceptor',function() {

    })
    .filter('getRatings',function() {
        return function (a) {
            if (a < 3) {
                return 'star-light';
            } else if (a < 4) {
                return 'star-green-ex-light';
            } else if (a < 4.6) {
                return 'star-green-light';
            } else if (a <= 5)
                return 'star-green-dark';
        }
    })
    .filter('addarrays',function() {
        return function (a) {
            var _b = '';
            /*angular.forEach(a, function (e, i) {
                var cus = Parse.Object.extend("cuisines");
                var Query = new Parse.Query(cus);
                Query.equalTo("objectId", e);
                Query.find(function(r){
                    _b += r[0].attributes.cuisine+ ', '
                });
            });*/
            return 'Cuisines';
        }
    });