'use strict';

angular.module('mctApp')
  .factory('Projector', function (Matrix4, Mesh, Vertex, RenderableObject) {
    var Projector = function () {


      this.objectPool = [];
      this.objectPoolLength = 0;
      this.objectCount = 0;

      this.vertexPool = [];
      this.vertexPoolLength = 0;
      this.vertexCount = 0;
      this.viewMatrix = new Matrix4();
      this.viewProjectionMatrix = new Matrix4();

      this.modelViewProjectionMatrix = new Matrix4();
      this.renderData = {
        objects: [],
        sprites: [],
        lights: [],
        elements: [],
      };

    };



    Projector.prototype.getObject = function (object) {
      var _object = this.getNextObjectInPool();
      _object.id = object.id;
      _object.object = object;


    };
    Projector.prototype.getNextObjectInPool = function () {
      if (this.objectCount === this.objectPoolLength) {
        var object = new RenderableObject();
        this.objectPool.push(object);
        this.objectPoolLength ++;
        this.objectCount ++;
        return object;
      }
      return this.objectPool[this.objectCount ++];
    };

    Projector.prototype.getNextVertexInPool = function () {
      if (this.vertexCount === this.vertexPoolLength) {
        var vertex = new Vertex();
        this.vertexPool.push(vertex);
        this.vertexPoolLength ++;
        this.vertexCount ++;
        return vertex;
      }

      return this.vertexPool[this.vertexCount ++];
    };
    Projector.prototype.projectVertex = function (vertex) {
      var position = vertex.position;
      var positionWorld = vertex.positionWorld;
      var positionScreen = vertex.positionScreen;

      positionWorld.copy(position).applyMatrix4(this.modelMatrix);
      positionScreen.copy(positionWorld).applyMatrix4(this.viewProjectionMatrix);
    };
    Projector.prototype.projectObject = function (object) {
      if (object instanceof Mesh) {
        this.renderData.objects.push(object);
        //for (var i = 0, l = object.vertices.length; i < l; i++) {
          //var v = object.vertices[i];
          //this.renderData.vertices.push(this.projectVertex(v));
        //}
      }
      for (var i = 0, l = object.children.length; i < l; i++) {
        this.projectObject(object.children[i]);
      }
    };

    Projector.prototype.projectGraph = function (root) {
      this.objectCount = 0;
      this.renderData.objects.length = 0;
      this.renderData.sprites.length = 0;
      this.renderData.lights.length = 0;
      this.projectObject(root);
      return this.renderData;

    };
    Projector.prototype.projectWorld = function (world, camera) {
      if (world.autoUpdate === true) { world.updateMatrixWorld();}
      if (camera.parent === undefined) { camera.updateMatrixWorld();}

      this.viewMatrix.copy(camera.matrixWorldInverse.getInverse(camera.matrixWorld));
      this.viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, this.viewMatrix);

      this.renderData = this.projectGraph(world);
      return this.renderData;
    };

    return Projector;
  });
