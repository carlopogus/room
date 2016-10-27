
function rotateMatrix(vector, axis, angle) {
  var sc = Math.cos(angle * Math.PI / 180.0),
      sq = Math.sin(angle * Math.PI / 180.0),
      x = axis[0],
      y = axis[1],
      z = axis[2];

  var rm = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ];

  rm[0][0] = sc + x*x * (1-sc);
  rm[1][0] = z*sq + y*x * (1-sc);
  rm[2][0] = -y*sq + z*x * (1-sc);
  rm[0][1] = -z*sq + x*y * (1-sc);
  rm[1][1] = sc + y*y * (1-sc);
  rm[2][1] = x*sq + z*y * (1-sc);
  rm[0][2] = y*sq + x*z * (1-sc);
  rm[1][2] = -x*sq + y*z * (1-sc);
  rm[2][2] = sc + z*z * (1-sc);

  return [
    rm[0][0] * vector[0] + rm[0][1] * vector[1] + rm[0][2] * vector[2],
    rm[1][0] * vector[0] + rm[1][1] * vector[1] + rm[1][2] * vector[2],
    rm[2][0] * vector[0] + rm[2][1] * vector[1] + rm[2][2] * vector[2]
  ];
}

var default_vector = {
  x: [1, 0, 0],
  y: [0, 1, 0],
  z: [0, 0, 1],
};

window.ondeviceorientation = function(event) {
  // var alpha = Math.floor(event.alpha),
  //     beta = Math.floor(event.beta),
  //     gamma = Math.floor(event.gamma) * -1;
  var alpha = event.alpha,
  beta = event.beta,
  gamma = event.gamma * -1;

  var axis = { x:0, y: 0, z: 0 };

  axis.y = default_vector.y;
  axis.x = rotateMatrix(default_vector.x, axis.y, gamma);
  axis.z = rotateMatrix(rotateMatrix(default_vector.z, axis.y, gamma), axis.x, beta);

  $('#box').css({
    'transform':
    'rotate3d(' +
    axis.z[0] + ', ' +
    axis.z[1] + ', ' +
    axis.z[2] + ', ' +
    alpha + 'deg) ' +
    'rotate3d(' +
    axis.x[0] + ', ' +
    axis.x[1] + ', ' +
    axis.x[2] + ', ' +
    beta + 'deg) ' +
    'rotate3d(' +
    axis.y[0] + ', ' +
    axis.y[1] + ', ' +
    axis.y[2] + ', ' +
    gamma + 'deg)'
  });


};
