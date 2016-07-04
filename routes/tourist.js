var express = require('express');
var Tourist = require('../moudels/tourist');

var router = express.Router();

var newTourist = new Tourist();

router.route('/')
.get(function(req, res, next) {
	res.render('tourist');
})

router.route('/add')
.get(function(req, res, next) {
	res.render('tourist_add');
})
.post(function(req, res, next) {
	var findKey = {
		name: req.body['name']
	};
	var Sight = {
		name: req.body['name'],
		tourist: req.session.tourist.username,
		address: req.body['address'],
		price: parseInt(req.body['price']),
		time: req.body['time'],
		introduce: req.body['introduce']
	};

	newTourist.findSight(findKey, function(sight){
		if (sight.join()) {
			req.session.error = "sight already exist";
			res.redirect('/tourist/add');
		} else {
			newTourist.insertSight(Sight, function(result) {
				req.session.error = "添加景点成功";
				res.redirect('/tourist/add');
			})
		}
	})
})

router.route('/delete')
.get(function(req, res, next) {
	// newTourist.deleteSight({name:"Ìì°²ÃÅ"});
	var sightList = {
		tourist: req.session.tourist.username
	};
	newTourist.findSight(sightList, function(sight){
		if (sight.join()) {
			console.log(sight);
			res.render('tourist_delete', {
				sightList: sight
			});
		} else {
				console.log('Ìí¼Ó¾°µã³É¹¦');
				// req.session.error = "ÎÞ¾°µãÐÅÏ¢£¬ÇëÌí¼Ó¾°µã";
				// req.session.error = "ÎÞ¾°µãÐÅÏ¢£¬ÇëÌí¼Ó¾°µã";
				req.session.error = "ÓÃ»§Ãû»òÃÜÂë²»ÕýÈ·";
				res.redirect('/tourist')
		}
	})
})
.post(function(req, res, next) {
	var deleteKey = {
		name: req.body['name']
	}

	newTourist.findSight(deleteKey, function(sight){
		if (sight.join()) {
			newTourist.deleteSight(deleteKey, function(result) {
				console.log('É¾³ý¾°µã³É¹¦');
				req.session.error = "É¾³ý¾°µã³É¹¦";
				res.redirect('/tourist/delete');
			})
		} else {
			console.log('¾°µã²»´æÔÚ');
			req.session.error = "¾°µã²»´æÔÚ";
			req.redirect('/tourist');
		}
	})
})

router.route('/modification')
.get(function(req, res, next) {
	var sightList = {
		tourist: req.session.tourist.username
	};
	newTourist.findSight(sightList, function(sight){
		if (sight.join()) {
			console.log(sight);
			// req.session.error = "ÐÞ¸Ä¾°µã³É¹¦";
			res.render('tourist_modification', {
				sightList: sight
			});
		} else {
				console.log('ÐÞ¸Ä¾°µãÊ§°Ü');
				req.session.error = "ÇëÏÈÌí¼Ó¾°µã³É¹¦";
				res.redirect('/tourist');
		}
	})
})
.post(function(req, res, next ) {
	var formerSight = {
		name: req.body['former_name']
	}
	var newSight = {
		name: req.body['name'],
		address: req.body['address'],
		price: parseInt(req.body['price']),
		time: req.body['time'],
		introduce: req.body['introduce']
	};
	console.log(newSight);
	// Update the document using an upsert operation, ensuring creation if it does not exist
	newTourist.modifySight(formerSight, newSight, function(result) {
		req.session.error = "ÐÞ¸Ä¾°µã³É¹¦";
		res.redirect('/tourist');
	});
})

router.route('/sight')
.get(function(req, res, next) {
	console.log(req.query.name);
	var findKey = {
		name: req.query.name
	}
	newTourist.findSight(findKey, function(sight){
		if (sight.join()) {
			console.log(sight);
			res.render('sight_modify', {
				sight: sight[0]
			});
		} else {
			// newTourist.insert(Sight, function(result) {
				console.log('Ìí¼Ó¾°µã³É¹¦');
				// res.redirect('/tourist/add');
			// })
		}
	})

})

module.exports = router;