const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers');
const { expect } = require('chai');
const MerkleProof = artifacts.require("MerkleProof");
const MerkleProofIns = artifacts.require("MerkleProofIns");
const MerkleDrop = artifacts.require("MerkleDrop");

contract('TESTMerkleDrop', (accounts) => {

	context('init', async () => {
    it('init', async()=>{
      mp_ins = await MerkleProofIns.deployed();
      mp_drop = await MerkleDrop.deployed();

      root = '0xdbda379fa896ef4fb04cb9cc9a5f00bc527d59acc08c5adc36d8219268f4505e';
      leaf0 = '0xcd1a6ed212d15afce6d263c521861374de25b13457e36ea0737e9d505eac1363'
      leaf1 = '0xbf85cbf377c1fe0086f84501573e11691bab67265fe3384355a39724a0e9d0ab'
      await mp_drop.change_merkle_root(root);
    })

    it('test verify', async()=>{
      tx = await mp_ins.verify([leaf1], root, leaf0);
      // `makeTree` in merkletools.js does not match `verify` function in MerkleProof.sol
      // function `verify` assumes that nodes in each level of merkle tree is in ASC order
      console.log(tx.logs[0].event);
    })

    it('test display', async()=>{
      tx = await mp_drop.display_leaf('0x0000000000000000000000000000000000000000', 123);
      assert.equal(leaf0, tx.logs[0].args.leaf)
    })

	})

});

