var express = require('express');
var Company = require('../moudels/company');

var router = express.Router();

var newCompany = new Company();

router.route('/')
.get(function(req, res, next) {
	res.render('company');
})

router.route('/add')
.get(function(req, res, next) {
	res.render('company_add');
})

module.exports = router;