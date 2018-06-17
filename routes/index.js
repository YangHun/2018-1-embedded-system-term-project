const express = require('express');
const router = express.Router();

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://52.78.219.223:8123'));

const util = require('util');

/* GET home page. */
router.get('/', function (req, res, next) {

    web3.eth.getAccounts(function (err, accounts) {
        const account = accounts[2];

        const contract_raw = '[ { "constant": false, "inputs": [ { "name": "addr", "type": "address" } ], "name": "DropoutUser", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "numLogs", "outputs": [ { "name": "", "type": "uint256", "value": "3" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" }, { "name": "idx", "type": "uint256" } ], "name": "getLog", "outputs": [ { "name": "", "type": "string", "value": "2018-06-13T23:23:fucking blockchain ho peter in" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "addr", "type": "address" }, { "name": "str", "type": "string" }, { "name": "time", "type": "string" } ], "name": "AddLog", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "addr", "type": "address" }, { "name": "time", "type": "string" } ], "name": "RegisterUser", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_users", "type": "uint256" }, { "indexed": true, "name": "_addr", "type": "address" }, { "indexed": false, "name": "_logs", "type": "uint256" }, { "indexed": false, "name": "_logmsg", "type": "string" } ], "name": "dmsg", "type": "event" } ]';
        const contract_object = JSON.parse(contract_raw);
        const contract_address = '0x4701dB4Ca28F37560192D0Ea043091bfc0C2D8C2';
        const contract = new web3.eth.Contract(contract_object, contract_address);

        contract.methods.numLogs(account).call().then(function (logNum) {
            let results = Array();

            let i;
            for (i = 0; i < logNum; i++) {
                contract.methods.getLog(account, i).call().then(function (result) {
                    results.push(result);
                    if (results.length == logNum) {
                        res.json(results);
                    }
                });
            }

            if (logNum == 0) {
                res.json([]);
            }
        });
    });
});

router.post('/', function (req, res, next) {
    const content = req.body.content;
    const time = req.body.time;

    console.log('content : ' + content);
    console.log('time : ' + time);

    web3.eth.getAccounts(function (err, accounts) {
        const account0 = accounts[0];
        const account1 = accounts[2];

        const contract_raw = '[ { "constant": false, "inputs": [ { "name": "addr", "type": "address" } ], "name": "DropoutUser", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "numLogs", "outputs": [ { "name": "", "type": "uint256", "value": "3" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" }, { "name": "idx", "type": "uint256" } ], "name": "getLog", "outputs": [ { "name": "", "type": "string", "value": "2018-06-13T23:23:fucking blockchain ho peter in" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "addr", "type": "address" }, { "name": "str", "type": "string" }, { "name": "time", "type": "string" } ], "name": "AddLog", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "addr", "type": "address" }, { "name": "time", "type": "string" } ], "name": "RegisterUser", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_users", "type": "uint256" }, { "indexed": true, "name": "_addr", "type": "address" }, { "indexed": false, "name": "_logs", "type": "uint256" }, { "indexed": false, "name": "_logmsg", "type": "string" } ], "name": "dmsg", "type": "event" } ]';
        const contract_object = JSON.parse(contract_raw);
        const contract_address = '0x4701dB4Ca28F37560192D0Ea043091bfc0C2D8C2';
        const contract = new web3.eth.Contract(contract_object, contract_address);

        web3.eth.personal.unlockAccount(account0, '1234')
            .then((response) => {

                const options = { from: account0, gasPrice: '72000000000', gas: '180000' };

                contract.methods.AddLog(account1, content, time).send(options, function (error, result) {
                    if (error) {
                        res.json('error2 : ' + error);
                    } else {
                        console.log('result : ' + result);
                        res.json(result);
                    }
                });
            }).catch((error) => {
            res.json('error1 : ' + error);
        });
    });
});

module.exports = router;
