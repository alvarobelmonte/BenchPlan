(function() {
	'use strict';
	angular
		.module('App')
		.factory('Upload', Upload);

		function Upload($q, $cordovaCamera,$cordovaFileTransfer, $ionicLoading, CLOUDINARY_URI,CLOUDINARY_UPLOAD_PRESET) {
			var url = 'vacio2';
			var photo={
				select:select,
				uploadCloud:uploadCloud,
				getUrl: function() {
			        return url;
			    }
			};

			

			return photo;

			function select () {
			 	/*var deferred = $q.defer();

					if (ionic.Platform.isWebView()) {

						var options =   {
						    quality: 100, 
						    destinationType: Camera.DestinationType.FILE_URI, 
						    sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
						    encodingType: Camera.EncodingType.JPEG
						};

						$cordovaCamera.getPicture(options).then(
							function(result) {
								deferred.resolve(result)},
							function(err) {
								deferred.reject(err)
							});

					}
					else {
						deferred.reject('Uploading not supported in browser');
					};

					return deferred.promise;*/

				alert('geturl dentro');
				alert('url en select'+url)
		    	return url;

		     };


		    function uploadCloud (imageURI) {
		    	var deferred = $q.defer();
		    	//alert(imageURI);
				var fileSize;
				var percentage;
				var name;

				 
		    	/*
				uploadPhoto();

		        function uploadPhoto () {
		        	alert('uploadPhoto()');
		        	var uploadOptions = {
			          params : { 'upload_preset': CLOUDINARY_UPLOAD_PRESET}
			        };

		        	$cordovaFileTransfer.upload(CLOUDINARY_URI, imageURI, uploadOptions).then(
							function(result) {
								
								var response = JSON.parse(decodeURIComponent(result.response));
								url = response.url;
								alert('url: '+url);
								$cordovaCamera.cleanup();
								deferred.resolve(response);
								alert('foto subida');
							}, function(err) {
								$cordovaCamera.cleanup();
								deferred.reject(err);
								alert('error al subir');
							}, function (progress) {
				      
				          });

		        	
		        }

		       
		        return url; */
		        window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
			        fileEntry.file(function(fileObj) {
			          fileSize = fileObj.size;
			         
			          //loader.show('Uploading Picture : ' + 0 + '%');
			          uploadPhoto();
			        });
			      });

		        function uploadPhoto () {
		        	var uploadOptions = {
			          params : { 'upload_preset': CLOUDINARY_UPLOAD_PRESET}
			        };

		        	$cordovaFileTransfer.upload(CLOUDINARY_URI, imageURI, uploadOptions).then(
							function(result) {
								//loader.showTime('Upload Completed',1000);
								var response = JSON.parse(decodeURIComponent(result.response));
								$cordovaCamera.cleanup();
								deferred.resolve(response);
							}, function(err) {
								$cordovaCamera.cleanup();
								deferred.reject(err);
							}, function (progress) {
				            //percentage = Math.floor(progress.loaded / fileSize * 100);
				            $ionicLoading.show({
						      template: 'Loading...'
						    }).then(function(){
						       console.log("The loading indicator is now displayed");
						    });
				          });

		        	
		        }

		        return deferred.promise;
		       
		        
		      
		    };

			

		}	   
	
		
})();