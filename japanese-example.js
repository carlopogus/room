//https://blog.hinablue.me/css3-matrix3d-yu-rotate3d-zhi-dao-di-zai-zhuan-shi-mo-gui/

      angular.module('gyroApp', [])
      .controller('gyroController', ['$scope', '$window', '$timeout', '$http', '$sce', '$log', function($scope, $window, $timeout, $http, $sce, $log) {

        // https://en.wikipedia.org/wiki/Rotation_matrix
        $scope.rotation = function(vector, axis, angle) {
          var c = Math.cos(angle * Math.PI / 180.0),
              s = Math.sin(angle * Math.PI / 180.0),
              x = axis[0],
              y = axis[1],
              z = axis[2];

          var rm = [
            [[],[],[],],
            [[],[],[],],
            [[],[],[],],
          ];

          rm[0][0] =    c + x*x * (1-c);
          rm[1][0] =  z*s + y*x * (1-c);
          rm[2][0] = -y*s + z*x * (1-c);
          rm[0][1] = -z*s + x*y * (1-c);
          rm[1][1] =    c + y*y * (1-c);
          rm[2][1] =  x*s + z*y * (1-c);
          rm[0][2] =  y*s + x*z * (1-c);
          rm[1][2] = -x*s + y*z * (1-c);
          rm[2][2] =    c + z*z * (1-c);

          return [
            rm[0][0] * vector[0] + rm[0][1] * vector[1] + rm[0][2] * vector[2],
            rm[1][0] * vector[0] + rm[1][1] * vector[1] + rm[1][2] * vector[2],
            rm[2][0] * vector[0] + rm[2][1] * vector[1] + rm[2][2] * vector[2]
          ];
        };

        $scope.rotate = {};
        $scope.getTransform = function() {
          return $scope.rotate;
        };

        $scope.faces = [
          {name: 'front'},
          {name: 'front'},
          {name: 'front'},
          {name: 'front'},
          {name: 'front'},
          {name: 'front'},
        ];

        var alpha = 0, beta = 0, gamma = 0;

        window.ondeviceorientation = function(event) {
          alpha = Math.floor(event.alpha);
          beta = Math.floor(event.beta);
          gamma = Math.floor(event.gamma) * -1;
        };

        window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
        })();

        if (window.DeviceMotionEvent === undefined) {
          $log.info('no support');
        } else {
          var draw = function() {
            if (!$scope.$$phase) {
              $scope.$apply(function() {
                var default_vector = {
                  z: [0, 0, 1],
                  x: $scope.rotation([1, 0, 0], [0, 0, 1], 0),
                  y: $scope.rotation([0, 1, 0], [0, 0, 1], 0)
                };

                var axis = { x: 0, y: 0, z: 0};
                axis.y = default_vector.y;
                axis.x = $scope.rotation(default_vector.x, axis.y, gamma);
                axis.z = $scope.rotation($scope.rotation(default_vector.z, axis.y, gamma), axis.x, beta);

                $scope.rotate = {
                  transform: 'rotate3d(' + axis.z[0] + ', ' + axis.z[1] + ', ' + axis.z[2] + ', ' + alpha + 'deg) ' + 'rotate3d(' + axis.x[0] + ', ' + axis.x[1] + ', ' + axis.x[2] + ', ' + beta + 'deg) ' + 'rotate3d(' + axis.y[0] + ', ' + axis.y[1] + ', ' + axis.y[2] + ', ' + gamma + 'deg) ' + 'rotateZ(90deg)'
                }
              });
            }
          };

          var animate = function() {
            requestAnimFrame( animate );
            draw();
          };

          animate();
        }
      }]);
