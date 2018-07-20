(function () {
  'use strict';
  angular
    .module('App')
    .factory('Camara', Camara);

  function Camara($q, $cordovaCamera) {

    var pictureUrl;
    var galleryPictureUrl;

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      console.log(navigator.camera);
    }

    var camara = {
      takePicture: takePicture,
      getPicture: getPicture,
      getPictureUrl: function () {
        return pictureUrl;
      },
      getGalleryPictureUrl: function () {
        return galleryPictureUrl;
      }
    };

    return camara;

    function takePicture() {
      /*document.addEventListener("deviceready", function () {

				    var options = {
				      destinationType: Camera.DestinationType.DATA_URL,
				      encodingType: Camera.EncodingType.JPEG,
				      targetWidth: 350,
				      targetHeight: 350
				    };
				    $cordovaCamera.getPicture(options)
				      .then(function(data){
				        console.log('camera data is: ' + angular.toJson(data));

						    pictureUrl = 'data:image/jpeg;base64,' + data;


				        alert('pictureUrl:'+pictureUrl);
				      }, function(error){
				        console.log('camera error is: ' + angular.toJson(data));
				      });

				     alert('pictureUrl de foto tomada:'+pictureUrl);
				     return pictureUrl;

			    }, false);*/

      var deferred = $q.defer();

      if (ionic.Platform.isWebView()) {
        var options = {
          /*quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          encodingType: Camera.EncodingType.JPEG*/
          destinationType: Camera.DestinationType.FILE_URI,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 350,
          targetHeight: 350,
        };

        $cordovaCamera.getPicture(options).then(
          function (result) {
            deferred.resolve(result)
          },
          function (err) {
            deferred.reject(err)
          });
      } else {
        deferred.reject('Uploading not supported in browser');
      }
      return deferred.promise;
    }

    function getPicture() {
      /*document.addEventListener("deviceready", function () {
				    var options = {
				      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
				      destinationType: Camera.DestinationType.DATA_URL,
				      encodingType: Camera.EncodingType.JPEG,
				      targetWidth: 500,
				      targetHeight: 500
				    };
				    $cordovaCamera.getPicture(options)
				      .then(function(data){
				        console.log('camera data is: ' + angular.toJson(data));
				        galleryPictureUrl = 'data:image/jpeg;base64,' + data;

				      }, function(error){
				        console.log('camera error is: ' + angular.toJson(data));
				      });
				    return galleryPictureUrl;
			    }, false);*/
      var deferred = $q.defer();

      if (ionic.Platform.isWebView()) {
        var options = {
          /*quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          encodingType: Camera.EncodingType.JPEG*/
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          encodingType: Camera.EncodingType.JPEG
        };

        $cordovaCamera.getPicture(options).then(
          function (result) {
            deferred.resolve(result)
          },
          function (err) {
            deferred.reject(err)
          });

      } else {
        deferred.reject('Uploading not supported in browser');
      }

      return deferred.promise;
    }
  }
})();
