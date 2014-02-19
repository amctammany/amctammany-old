'use strict';

angular.module('mctApp')
  .factory('Renderer', function (Matrix4, Vector3, Projector, Mesh) {
    var Renderer = function (canvas) {
      this.canvas = canvas;
      this.width = canvas.width;
      this.height = canvas.height;
      this.ctx = canvas.getContext('2d');


      this.projector = new Projector();

      this.viewMatrix = new Matrix4();
      this.viewProjectionMatrix = new Matrix4();
      this.modelViewProjectionMatrix = new Matrix4();
    };

    Renderer.prototype.render = function (world, camera) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.vertices = [];
      //var renderData = this.projector.projectWorld(world, camera);
      //console.log(renderData)
      if (world.autoUpdate === true) { world.updateMatrixWorld();}
      if (camera.parent === undefined) { camera.updateMatrixWorld();}

      this.viewMatrix.copy(camera.matrixWorldInverse.getInverse(camera.matrixWorld));
      this.viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, this.viewMatrix);

      for (var i = 0, l = world.children.length; i < l; i++) {
        var mesh = world.children[i];
        if (mesh instanceof Mesh) {
          this.worldMatrix = mesh.matrixWorld;
          this.modelViewProjectionMatrix.multiplyMatrices(this.viewProjectionMatrix, mesh.matrixWorld);
          for (var j = 0, vl = mesh.vertices.length; j < vl; j++) {
            var v = new Vector3();
            var vertex = mesh.vertices[j];
            v.copy(vertex).applyProjection(this.modelViewProjectionMatrix);
            this.vertices.push(v);
            this.drawVertex(v);
          }
          var v1 = new Vector3();
          var v2 = new Vector3();
          for (var k = 0, ll = mesh.lines.length; k < ll; k++) {
            var line = mesh.lines[k];
            v1.copy(line.start).applyProjection(this.modelViewProjectionMatrix);
            v2.copy(line.end).applyProjection(this.modelViewProjectionMatrix);
            this.drawLine(v1, v2);
          }
        }
      }
    };
    Renderer.prototype.drawLine = function (v1, v2) {
      var x1 = v1.x * this.width + this.width / 2;
      var y1 = v1.y * this.height + this.height / 2;

      var x2 = v2.x * this.width + this.width / 2;
      var y2 = v2.y * this.height + this.height / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    };
    Renderer.prototype.drawVertex = function (v) {
      var x = v.x * this.width + this.width / 2;
      var y = v.y * this.height + this.height / 2;
      //this.ctx.fillRect(x, y, 4, 4);
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, 6.28, 0);
      this.ctx.closePath();
      this.ctx.fill();
    };
    //Renderer.prototype.project = function (coord, transformMatrix) {
      //console.log(coord);
      //var pt = Vector3.TransformCoordinates(coord, transformMatrix);
      //console.log(pt);
      //var x = pt.x * this.width / 4 + this.width / 2.0  >> 0;
      //var y = pt.y * this.height / 4 + this.height / 2.0 >> 0;
      //return {
        //x: x,
        //y: y,
      //};
    //}

    //Renderer.prototype.drawPoint = function (pt) {
      //this.ctx.fillRect(pt.x, pt.y, 5, 5);
    //}
    //Renderer.prototype.render = function (camera, meshes) {
      //this.ctx.clearRect(0, 0, this.width, this.height);
      //this.viewMatrix.lookAt(camera.position, camera.target, camera.up);
      //this.projectionMatrix = Matrix4.PerspectiveFov(78, this.width / this.height, 0.01, 100.0);

      //var mesh;
      //for (var i = 0, l = meshes.length; i < l; i++) {
        //mesh = meshes[i];
        //this.worldMatrix = Matrix4.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z).multiply(Matrix4.Translation(mesh.position.x, mesh.position.y, mesh.position.z));
        //this.transformMatrix = this.worldMatrix.multiply(this.viewMatrix).multiply(this.projectionMatrix);

        //for (var j = 0, vl = mesh.vertices.length; j < vl; j++) {
          //var v = mesh.vertices[j];

          //var pt = this.project(v, this.transformMatrix);
          //console.log(pt);
          //this.drawPoint(pt);
        //}

      //}
    //};
    return Renderer;
  });
