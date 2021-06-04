
var assert = require('assert')
var crypto = require('crypto')
var MerkleTools = require('../merkletools.js')
var keccak256 = require('js-sha3').keccak_256
var web3utils = require('web3-utils');

var merkleTools = new MerkleTools({
  hashType: 'KECCAK-256'
})

function add_leaf(obj) {
  keccak256_enpacked = web3utils.soliditySha3(
      {t:"address", v:obj.address}, {t:"uint", v:obj.amount});
  keccak256_enpacked_n = keccak256_enpacked.substring(2);
  console.log(keccak256_enpacked_n);
  merkleTools.addLeaf(keccak256_enpacked_n, false);
  return keccak256_enpacked_n;
}

add_leaf({
  'address':'0x0000000000000000000000000000000000000000',
  'amount':123
});
add_leaf({
  'address':'0x0000000000000000000000000000000000000000',
  'amount':456
});

merkleTools.makeTree();
const root = merkleTools.getMerkleRoot();
console.log('root: ', root.toString('hex'));

for (var i = 0; i < merkleTools.getLeafCount(); i++) {
  var p = merkleTools.getProof(i);
  var l = merkleTools.getLeaf(i);
  console.log(p, l.toString('hex'))
  var flag = merkleTools.validateProof(p, l, root, false);
  console.log('Is varlidate proof %s? %s', i, flag);
}

