var admin = require('firebase-admin');
var config = require('config');

var Mailchimp = require('mailchimp-api-v3')
var marked = require('marked');


var mailchimp = new Mailchimp(
							  config.get('keys.mailchimp')
							 );


subscriber = {


    /*
     * Subscribe user to a the mailing list
     */
    subscribeUser: function(email) {

		mailchimp.request({
			method : 'get|post|put|patch|delete',
			path : '/3.0/lists/a0b1ee944d/members/',
			path_params : {
							"email_address": "email",
							"status": "subscribed"
						}
			})
    }

}


module.exports = subscriber;
