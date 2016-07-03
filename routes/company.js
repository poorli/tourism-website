var express = require('express');
var Company = require('../moudels/company');
var Tourist = require('../moudels/tourist');

var router = express.Router();

var newCompany = new Company();
var newTourist = new Tourist();

router.route('/')
.get(function(req, res, next) {
	authentication(req, res);
	res.render('company');
})

router.route('/add')
.get(function(req, res, next) {
	authentication(req, res);
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
	authentication(req, res);
	console.log(req.body);
	var lineName = {
		name: req.body['name']
	}
	var newLine = req.body;
	newLine.company = req.session.company.username;
	newCompany.findLine(lineName, function(line){
		if (line.join()) {
			req.session.error = "添加线路成功";
			res.redirect('/company/add');
		} else {
			newCompany.insertLine(newLine, function (result) {
				req.session.error = "添加线路成功";
				res.redirect('/company/add');
			})
		}
	})
})

router.route('/delete')
.get(function(req, res, next) {
	authentication(req, res);
	var lineList = {
		company: req.session.company.username
	}
	//找出所有线路供删除
	newCompany.findLine(lineList, function(line){
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
	authentication(req, res);
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
	authentication(req, res);
	var lineList = {
		company: req.session.company.username
	}
	newCompany.findLine(lineList, function(line){
		if (line.join()) {
			console.log(line);
			res.render('company_modify', {
				lineList: line
			});
		} else {
				console.log('无线路，请添加');
				req.session.error = "无线路，请添加";
				res.redirect('/tourist/');
		}
	})
})
.post(function(req, res, next ) {
	authentication(req, res);
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
	authentication(req, res);
    console.log(req.query.name);
    var findKey = {
        name: req.query.name
    }
    newCompany.findLine(findKey, function(line) {
        if (line.join()) {
            var oldLine = line[0];
            //找出所有景点供选择路线
            newTourist.findSight({}, function(sight) {
            	console.log(sight);
            	console.log(oldLine.sight);
                if (sight.join()) {
                    res.render('line_modify', {
                        sightList: sight,
                        line: oldLine
                    });
                } else {
                    // newTourist.insert(Sight, function(result) {
                    console.log('添加景点成功');
                    // res.redirect('/company_looktourist/add');
                    // })
                }
            })
        } else {
            console.log('未找到景点');
        }
    })
})

router.route('/order')
.get(function(req, res, next) {
	authentication(req, res);
	orderLine = {
		company: req.session.company.username
	}
    newCompany.findLine(orderLine, function(line){
        if (line.join()) {
            res.render('line_order', {
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

router.route('/user')
.get(function(req, res, next) {
	authentication(req, res);
	Line = {
		line: req.query.name
	}
    newCompany.findLineOrder(Line, function(order){
        if (order.join()) {
            res.render('company_user_info', {
                orderList: order
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
    if (!req.session.company) {
        console.log(req.session);
        //直接访问 home page 时，进行身份验证
        req.session.error = "请先登录";
        return res.redirect('/login');
    }
}

module.exports = router;