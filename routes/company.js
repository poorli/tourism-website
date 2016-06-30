var express = require('express');
var Company = require('../moudels/company');
var Tourist = require('../moudels/tourist');

var router = express.Router();

var newCompany = new Company();
var newTourist = new Tourist();

router.route('/')
.get(function(req, res, next) {
	res.render('company');
})

router.route('/add')
.get(function(req, res, next) {
	// newTourist.deleteSight({name:"天安门"});
	var sightList;
	//找出所有景点供选择路线
	newTourist.findSight({}, function(sight){
		if (sight.join()) {
			// console.log('景点存在');
			console.log(sight);
			// req.session.sightList = sight;
			// res.redirect('/tourist/add');
			res.render('company_add', {
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
.post(function (req, res, next) {
	console.log(req.body);
	var lineName = {
		name: req.body['name']
	}
	var newLine = req.body;
	newCompany.findLine(lineName, function(line){
		//路线存在
		if (line.join()) {
			res.redirect('/company/add');
		} else {
			newCompany.insertLine(newLine, function (result) {
				res.redirect('/company/add');
			})
		}
	})
})

router.route('/delete')
.get(function(req, res, next) {
	var sightList;
	//找出所有景点供删除路线
	newCompany.findLine({}, function(line){
		if (line.join()) {
			console.log(line);
			res.render('company_delete', {
				lineList: line
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
	};
	newCompany.findLine(deleteKey, function(line){
		if (line.join()) {
			newCompany.deleteLine(deleteKey, function(result) {
				console.log('删除线路成功');
				// console.log(result)
				res.redirect('/company/delete');
			})
		} else {
			console.log('景点不存在');
			req.session.error = "景点不存在";
		}
	})
})


router.route('/modify')
.get(function(req, res, next) {
	var sightList;
	newCompany.findLine({}, function(line){
		if (line.join()) {
			// console.log('景点存在');
			console.log(line);
			// req.session.lineList = line;
			// res.redirect('/tourist/add');
			res.render('company_modify', {
				lineList: line
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
	var formerLine = {
		name: req.body['former_name']
	}
	var newLine = {
		name: req.body['name'],
		// address: req.body['address'],
		price: parseInt(req.body['price']),
		sight: req.body['sight_name'],
		// introduce: req.body['introduce']
	};
	console.log(newLine);
	// Update the document using an upsert operation, ensuring creation if it does not exist
	newCompany.modifyLine(formerLine, newLine, function(result) {
		res.redirect('/company/modify');
	});
})

router.route('/line')
.get(function(req, res, next) {
    console.log(req.query.name);
    var findKey = {
        name: req.query.name
    }
    newCompany.findLine(findKey, function(line) {
    	// console.log(line);
        if (line.join()) {
            console.log(line);
            var oldLine = line[0];
            //找出所有景点供选择路线
            newTourist.findSight({}, function(sight) {
                if (sight.join()) {
                    // console.log('景点存在');
                    console.log(sight);
                    res.render('line', {
                        sightList: sight,
                        line: oldLine
                    });
                } else {
                    // newTourist.insert(Sight, function(result) {
                    console.log('添加景点成功');
                    // res.redirect('/tourist/add');
                    // })
                }
            })
        } else {
            // newTourist.insert(line, function(result) {
            console.log('添加景点成功');
            // res.redirect('/tourist/add');
            // })
        }
    })
})


module.exports = router;