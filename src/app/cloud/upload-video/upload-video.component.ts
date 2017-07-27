import { Component, OnInit, Inject } from '@angular/core';
import { Http } from "@angular/http";

import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// remove this when we will have native storage wrapper
import { FirebaseApp } from 'angularfire2';


@Component({
	selector: 'app-upload-video',
	templateUrl: './upload-video.component.html',
	styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {

	public uploadStarted = false
	public timestamp: any
	public process: number = 0
	public firebaseUser: any;

	constructor(private db: AngularFireDatabase,
				public af: AngularFireDatabase,
				private auth: AuthService,
				private afAuth: AngularFireAuth,
				private http: Http,
				firebaseApp: FirebaseApp) {


	// get Auth state
	afAuth.authState.subscribe(user => {
		if (!user) {
		this.firebaseUser = null;
		}
		this.firebaseUser = user;

	});



}

	handleFileSelect = function (evt) {
		evt.stopPropagation();
		evt.preventDefault();

		const files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files; // FileList object; // FileList object.

		const file = files[0];

		// Create the file metadata
		const metadata = {
			contentType: file.type
		};

		const storageRef = this.firebaseApp.storage().ref();


		// Upload file and metadata to the object 'images/mountains.jpg'
		this.timestamp = (new Date).getTime();
		const extensions = file.name.split('.')
		const filename = this.timestamp + '.' + extensions[extensions.length - 1];



		if ((extensions[extensions.length - 1]).toLowerCase() != 'mp4') {
			alert('bad ' + extensions[extensions.length - 1].toLowerCase())
			return;
		}

	const uploadTask = storageRef.child('clips/' + this.firebaseUser.uid + '/' + filename).put(file, metadata);

	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(this.firebaseApp.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		function (snapshot) {
		this.uploadStarted = true;
		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log('Upload is ' + this.progress + '% done');
		switch (snapshot.state) {
			case this.firebaseApp.storage.TaskState.PAUSED: // or 'paused'
			console.log('Upload is paused');
			break;
			case this.firebaseApp.storage.TaskState.RUNNING: // or 'running'
			console.log('Upload is running');
			break;
		}


		},
		function (error) {

		// A full list of error codes is available at
		// https://firebase.google.com/docs/storage/web/handle-errors
		switch (error.code) {
			case 'storage/unauthorized':
			// User doesn't have permission to access the object
			break;

			case 'storage/canceled':
			// User canceled the upload
			break;

			case 'storage/unknown':
			// Unknown error occurred, inspect error.serverResponse
			break;
		}
		},
		function () {
			// Upload completed successfully, now we can get the download URL
			var downloadURL = uploadTask.snapshot.downloadURL;
			//push to db
			this.firebaseApp.database().ref('clips/' + this.firebaseUser.uid + '/' + this.timestamp).set({
				clips: { 'src': downloadURL },
				thumbs: { 'src': 'https://firebasestorage.googleapis.com/v0/b/dride-2384f.appspot.com/o/assets%2Fplaceholder.png?alt=media&token=07c50ad0-781b-4266-a0c7-8cfcbd421c91' },
				views: 0,
				cmntsCount: 0
			});

		});



	}


	openUploadBox = function(){
	document.getElementById("files").click();
	}

	ngOnInit() {

		// Setup the dnd listeners.
		const dropZone = document.getElementById('drop_zone');
		dropZone.addEventListener('dragleave', e => {

		dropZone.classList.remove('hoveredFile');

		});

		dropZone.addEventListener('dragenter', e => {
		dropZone.classList.add('hoveredFile');
		});

		dropZone.addEventListener('dragover', e => {
		dropZone.classList.add('hoveredFile');
		e.stopPropagation();
		e.preventDefault();
		})

		dropZone.addEventListener('drop', e => {
		dropZone.classList.remove('hoveredFile');
		this.handleFileSelect(e);
		});

		document.getElementById('files').addEventListener('change', e => {
		dropZone.classList.remove('hoveredFile');
		console.log(e)
		this.handleFileSelect(e);
		}, false);




	}

}
