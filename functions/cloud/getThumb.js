var config = require('../environments/environment');
var admin = require("firebase-admin");
var videoEditor = require('./helpers/videoEditor');

// var serviceAccount = require("../dride-2384f-firebase-adminsdk-m1piu-fa5e93f5d8.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   apiKey: "AIzaSyDi0egNqUM-dZDjIiipjW-aSRYuXlFc3Ds",
//   authDomain: "dride-2384f.firebaseapp.com",
//   databaseURL: "https://dride-2384f.firebaseio.com",
//   projectId: "dride-2384f",
//   storageBucket: "dride-2384f.appspot.com",
//   messagingSenderId: "802741428178"
// });


getThumb = {
  dridifyVideo: function (uid, filename) {
    return new Promise((resolve, reject) => {
      /* 
       * get filename and token and generate a thumbnail for uploaded video
       * This api call generated by cloud function from Firebase
       */
	  filename = filename + '.mp4';
	  const path =  '/tmp/'
      var promises = [];

	  var video = new videoEditor(uid, filename, path);
	  

      var timestamp = filename.split('.')[0]
      var bucketName = 'dride-2384f.appspot.com';

      var filePath = 'clips/' + uid + '/' + filename

      //download video file
      const bucket = admin.storage().bucket();



      bucket.file(filePath).download({
        destination: path + uid + '__' + filename
      }, function (err) {
        if (err) {
			reject(err)
		}
		
        video.prepareVideoToCloud().then(res => {

			promises.push(
				video.uploadToBucket(path + uid + '_' + timestamp + '.jpg', 'thumbs/' + uid + '/' + timestamp + '.jpg'),
				video.uploadToBucket(path + uid + '_' + timestamp + '.mp4', 'clips/' + uid + '/' + timestamp + '.mp4')
			)

		  Promise.all(promises).then(values => { 
			resolve();
		  });


        }, error => {
          reject(error)
        });


      })
    })
  }
}

module.exports = getThumb;
