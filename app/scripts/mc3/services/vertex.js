'use strict';

angular.module('mctApp')
  .factory('Vertex', function (Vector3, Vector4) {
    var Vertex = function () {
      this.position = new Vector3();
      this.positionWorld = new Vector3();
      this.positionScreen = new Vector4();

      this.visible = true;
    };

    Vertex.prototype.copy = function (vertex) {
      this.positionWorld.copy(vertex.positionWorld);
      this.positionScreen.copy(vertex.positionScreen);
    };
    return Vertex;
  });
