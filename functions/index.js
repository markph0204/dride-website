var functions = require('firebase-functions');
var admin = require('firebase-admin');
var express = require('express');
var request = require('request');
admin.initializeApp(functions.config().firebase);

// grab the Mixpanel factory
var Mixpanel = require('mixpanel');

// create an instance of the mixpanel client
var mixpanel = Mixpanel.init('eae916fa09f65059630c5ae451682939');



var FCM = require(__dirname + '/FCM/subscribe.js');
var mailer = require(__dirname + '/mailer/send.js');
var anonymizer = require(__dirname + '/user/anonymizer.js');
var cloud = require(__dirname + '/cloud/cloud.js');


/*
 * Add updated cmntsCount to threads & update the description for the thread with the latest post
 */
exports.cmntsCount = functions.database.ref('/conversations/{threadId}/{conversationId}')
    .onWrite(event => {

        if (!event.params.threadId) {
            console.log('not enough data');
            return null;
        }

        // Only process data when it is first created.
        if (event.data.previous.exists()) {
            return;
        }

        return event.data.adminRef.root.child("threads").child(event.params.threadId).child("slug").once('value').then(function(slug) {


            var conv = event.data.val()

            event.data.adminRef.root.child("pushTokens").child(conv.autherId).child('value').once('value').then(function(pushToken) {
                FCM.subscribeUserToTopic(pushToken.val(), slug.val());
                mailer.subscribeUserToTopic(conv.autherId, event.params.threadId);

                return event.data.adminRef.root.child("conversations").child(event.params.threadId).once('value').then(function(conversation) {

                    //dispatch notifications
                    FCM.sendToTopic(slug.val(), pushToken.val());
                    //dispatch email
                    mailer.sendToTopic(event.params.threadId, event.params.threadId, conv);
                    
                    var resObj = {
                        cmntsCount: conversation.numChildren(),
                        description: conv.body
                    }
                    if (conversation.numChildren() > 1 ) delete resObj['description'];

                    return event.data.adminRef.root.child("threads").child(event.params.threadId).update(resObj);

                });


            });


           
        });
    });
/*
 * Add updated cmntsCount to clips
 */
exports.cmntsCountVideo = functions.database.ref('/conversations_video/{uid}/{videId}/{conversationId}')
    .onWrite(event => {

        if (!event.params.videId || !event.params.uid || !event.params.conversationId) {
            console.log('not enough data');
            return null;
        }


        event.data.adminRef.root.child("conversations_video/" + event.params.uid + '/' + event.params.videId).once('value').then(function(conversationVideo) {

            event.data.adminRef.root.child("clips/" + event.params.uid + '/' + event.params.videId + "/cmntsCount").set(conversationVideo.numChildren());
            var r = {}
            r[event.params.conversationId] = event.data.val()
            event.data.adminRef.root.child("clips/" + event.params.uid + '/' + event.params.videId + "/comments").set(r);

        });


        return event.data.adminRef.root.child('clips').child(event.params.uid).child(event.params.videId).child('lastUpdate').set((new Date).getTime());



    });


/*
*   Save users data upon register
*/
exports.saveNewUserData = functions.auth.user().onCreate(event => {


    const user = event.data; // The Firebase user.
    var usersRef = admin.database().ref("userData").child(event.data.uid);

    return usersRef.set({
            'name': user.displayName,
            'pic': user.photoURL
        }).then(function(){
            // create a user in Mixpanel Engage
            mixpanel.people.set(user.displayName, {
                $first_name: user.displayName.split(' ')[0],
                $last_name: user.displayName.split(' ')[1],
                $created: (new Date()).toISOString(),
                email: user.email,
                distinct_id: event.data.uid
            });


        });
    

});

/*
 * Anonymise a user upon request
 */
exports.anonymizer = functions.database.ref('/userData/{uid}/anonymous')
    .onWrite(event => {

        if (!event.params.uid) {
            console.log('not enough data');
            return null;
        }
        var anonymStatus = event.data.val()

        return anonymizer.start(anonymStatus, event.params.uid)

    });



/*
 * remove clips on event
 */
exports.deleteVideo = functions.database.ref('/clips/{uid}/{videoId}/deleted')
    .onWrite(event => {

        if (!event.params.uid || !event.params.videoId) {
            console.log('not enough data');
            return null;
        }
        var clipDeleteStatus = event.data.val()
        if (clipDeleteStatus)
            return cloud.remvoeClip(event.params.videoId, event.params.uid)

    });


/*
 * move clip to the homePage
 */
exports.copyToHP = functions.database.ref('/clips/{uid}/{videoId}')
    .onWrite(event => {

        // Exit when the data is deleted.
        if (!event.data.exists()) {
            return;
        }

        if (!event.params.uid || !event.params.videoId) {
            console.log('not enough data');
            return null;
        }
        console.log('copy ' + event.params.videoId)
        var clip = event.data.val()
        if (clip.homepage)
            return cloud.copyToHP(event.params.videoId, event.params.uid, clip, clip.hpRef)

    });






// /*
//  * push clip to HP if marked as HP ready
//  */
// exports.populateHP = functions.database.ref('/HPclips/{videId}/')
//     .onWrite(event => {

//         if (!event.params.videId) {
//             console.log('not enough data');
//             return null;
//         }

//         console.log(event.data);
//         // event.data.adminRef.root.child("clips/" + event.params.videId + '/' + event.params.videId).once('value').then(function(conversationVideo) {

//         //     event.data.adminRef.root.child("clips/" + event.params.uid + '/' + event.params.videId + "/cmntsCount").set(conversationVideo.numChildren());
//         //     var r = {}
//         //     r[event.params.conversationId] = event.data.val()
//         //     event.data.adminRef.root.child("clips/" + event.params.uid + '/' + event.params.videId + "/comments").set(r);

//         // });


//         //return event.data.adminRef.root.child('clips').child(event.params.uid).child(event.params.videId).child('lastUpdate').set((new Date).getTime());



//     });








/*
 *   Call cloud-analyser to push new thumbnail and CV extracted data to DB.
 */

var gcs = require('@google-cloud/storage')();
var request = require('request');

exports.generateThumbnail = functions.storage.object().onChange(event => {

    // Exit if this is triggered on a file that is not an image.
    if (!event.data.contentType.startsWith('video/')) {
        console.log('This is not an video.');
        return;
    }
    // Exit if this is a move or deletion event.
    if (event.data.resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return;
    }

    //find uid & timestamp from filename
    n = event.data.name.split('/');
    uid = n[1];
    filename = n[2];

    var cloudAnalyserUrl = 'http://54.246.250.130:9000/api/getThumb';

    var formData = {
        // Pass a simple key-value pair 
        uid: uid,
        filename: filename

    };
    return request.get({ url: cloudAnalyserUrl + '?uid=' + uid + '&filename=' + filename }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err + '--' + httpResponse);
        }
        console.log('Upload successful!  Server responded with:', body);
    });

});


// // Load zone.js for the server.
// require('zone.js/dist/zone-node');

// // Import renderModuleFactory from @angular/platform-server.
// var renderModuleFactory = require('@angular/platform-server').renderModuleFactory;

// // Import the AOT compiled factory for your AppServerModule.
// // This import will change with the hash of your built server bundle.
// var AppServerModuleNgFactory = require('./dist-server/main.114c1fd7c5fe0c95b677.bundle').AppServerModuleNgFactory;

// // Load the index.html file.
// var index = require('fs').readFileSync('./src/index.html', 'utf8');

// // Render to HTML and log it to the console.
// renderModuleFactory(AppServerModuleNgFactory, {document: index, url: '/'}).then(html => console.log(html));
// app.get('/forum', (request, response) => {
//   response.send("Hello from Express on Firebase with CORS!")
// })

// exports.forum = functions.https.onRequest(app);

