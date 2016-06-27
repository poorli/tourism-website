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
		address: req.body['address'],
		price: parseInt(req.body['price']),
		time: req.body['time'],
		introduce: req.body['introduce']
	};

	newTourist.findSight(findKey, function(sight){
		if (sight.join()) {
			console.log('景点存在');
			req.session.error = "景点存在";
			res.redirect('/tourist/add');
		} else {
			newTourist.insert(Sight, function(result) {
				console.log('添加景点成功');
				res.redirect('/tourist/add');
			})
		}
	})
})

router.route('/delete')
.get(function(req, res, next) {
	// newTourist.deleteSight({name:"天安门"});
	var sightList;
	newTourist.findSight({}, function(sight){
		if (sight.join()) {
			// console.log('景点存在');
			console.log(sight);
			// req.session.sightList = sight;
			// res.redirect('/tourist/add');
			res.render('tourist_delete', {
				sightList: sight
			});
		} else {
			// newTourist.insert(Sight, function(result) {
				console.log('添加景点成功');
				// res.redirect('/tourist/add');
			// })
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
				console.log('删除景点成功');
				res.redirect('/tourist/delete');
			})
			// res.redirect('/tourist/add');
		} else {
			console.log('景点不存在');
			req.session.error = "景点不存在";
		}
	})
})

router.route('/modification')
.get(function(req, res, next) {
	var sightList;
	newTourist.findSight({}, function(sight){
		if (sight.join()) {
			// console.log('景点存在');
			console.log(sight);
			// req.session.sightList = sight;
			// res.redirect('/tourist/add');
			res.render('tourist_modification', {
				sightList: sight
			});
		} else {
			// newTourist.insert(Sight, function(result) {
				console.log('添加景点成功');
				// res.redirect('/tourist/add');
			// })
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
		res.redirect('/tourist/');
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
			res.render('sight', {
				sight: sight[0]
			});
		} else {
			// newTourist.insert(Sight, function(result) {
				console.log('添加景点成功');
				// res.redirect('/tourist/add');
			// })
		}
	})

})

module.exports = router;