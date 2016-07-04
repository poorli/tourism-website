var express = require('express');
var Tourist = require('../moudels/tourist');

var router = express.Router();

var newTourist = new Tourist();

router.route('/')
.get(function(req, res, next) {
	authentication(req, res)
	res.render('tourist');
})

router.route('/add')
.get(function(req, res, next) {
	authentication(req, res)
	res.render('tourist_add');
})
.post(function(req, res, next) {
	authentication(req, res)
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
			req.session.error = "景点已存在";
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
	authentication(req, res)
	// newTourist.deleteSight({name:"天安门"});
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
				console.log('添加景点成功');
				// req.session.error = "无景点信息，请添加景点";
				// req.session.error = "无景点信息，请添加景点";
				req.session.error = "请先添加景点";
				res.redirect('/tourist')
		}
	})
})
.post(function(req, res, next) {
	authentication(req, res)
	var deleteKey = {
		name: req.body['name']
	}

	newTourist.findSight(deleteKey, function(sight){
		if (sight.join()) {
			newTourist.deleteSight(deleteKey, function(result) {
				console.log('删除景点成功');
				req.session.error = "删除景点成功";
				res.redirect('/tourist/delete');
			})
		} else {
			console.log('景点不存在');
			req.session.error = "景点不存在";
			req.redirect('/tourist');
		}
	})
})

router.route('/modification')
.get(function(req, res, next) {
	authentication(req, res)
	var sightList = {
		tourist: req.session.tourist.username
	};
	newTourist.findSight(sightList, function(sight){
		if (sight.join()) {
			console.log(sight);
			// req.session.error = "修改景点成功";
			res.render('tourist_modification', {
				sightList: sight
			});
		} else {
				console.log('修改景点失败');
				req.session.error = "请先添加景点成功";
				res.redirect('/tourist');
		}
	})
})
.post(function(req, res, next ) {
	authentication(req, res)
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
		req.session.error = "修改景点成功";
		res.redirect('/tourist');
	});
})

router.route('/sight')
.get(function(req, res, next) {
	authentication(req, res)
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
				console.log('添加景点成功');
				// res.redirect('/tourist/add');
			// })
		}
	})

})

function authentication(req, res) {
    if (!req.session.tourist) {
        console.log(req.session);
        //直接访问 home page 时，进行身份验证
        req.session.error = "您没有访问权限，请先登录";
        return res.redirect('/login');
    }
}

module.exports = router;