var request = require('supertest');

var cfg = require('_/config');
var nock = require('nock');
var should = require('chai').should();



describe('Index response', function () {
	var app = require('_/app');

	it('load index page with the first video in the playlist api response' , function(done) {
		var playlistApi = nock('http://your rul')
			.get('')
			.replyWithFile(200, __dirname + '/some mock', {
				'Content-Type': 'application/json;charset=utf-8'
			});

		request(app)
			.get('/')
			.expect(200)
			.end(function(err, res){
				should.not.exist(err);
				res.text.should.include('something');

				//async test so we need the done
				done();
			});

	});


});
