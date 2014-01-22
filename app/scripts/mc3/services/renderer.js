'use strict';

angular.module('mctApp')
  .factory('Renderer', function (Matrix4, Vector3) {
    var Renderer = function (canvas) {
      this.canvas = canvas;
      this.width = canvas.width;
      this.height = canvas.height;
      this.ctx = canvas.getContext('2d');


      this.viewMatrix = new Matrix4();
      this.projectionMatrix = new Matrix4();
    };

    Renderer.prototype.project = function (coord, transformMatrix) {
      console.log(coord);
      var pt = Vector3.TransformCoordinates(coord, transformMatrix);
      console.log(pt);
      var x = pt.x * this.width / 4 + this.width / 2.0  >> 0;
      var y = pt.y * this.height / 4 + this.height / 2.0 >> 0;
      return {
        x: x,
        y: y,
      };
    }

    Renderer.prototype.drawPoint = function (pt) {
      this.ctx.fillRect(pt.x, pt.y, 5, 5);
    }
    Renderer.prototype.render = function (camera, meshes) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.viewMatrix.lookAt(camera.position, camera.target, camera.up);
      this.projectionMatrix = Matrix4.PerspectiveFov(0.78, this.width / this.height, 0.01, 1.0);

      var mesh;
      for (var i = 0, l = meshes.length; i < l; i++) {
        mesh = meshes[i];
        this.worldMatrix = Matrix4.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z).multiply(Matrix4.Translation(mesh.position.x, mesh.position.y, mesh.position.z));
        this.transformMatrix = this.worldMatrix.multiply(this.viewMatrix).multiply(this.projectionMatrix);

        for (var j = 0, vl = mesh.vertices.length; j < vl; j++) {
          var v = mesh.vertices[j];

          var pt = this.project(v, this.transformMatrix);
          console.log(pt);
          this.drawPoint(pt);
        }

      }
    };
    return Renderer;
  });
