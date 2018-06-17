var express = require('express');
var router = express.Router();

var Web3 = require('web3');
var web3 = new Web3();

var util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(web3);
  var body = util.inspect(web3);
  res.render('index', { title: 'BlockChain of Noverish!!!', body: body });
});

module.exports = router;
