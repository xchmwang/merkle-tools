const SafeMath = artifacts.require("SafeMath");
const MerkleProof = artifacts.require("MerkleProof");
const MerkleDrop = artifacts.require("MerkleDrop");

async function performMigration(deployer) {
  await deployer.deploy(SafeMath);
  await MerkleProof.deployed();
  await SafeMath.deployed();
  await deployer.link(SafeMath, MerkleDrop);
  await deployer.link(MerkleProof, MerkleDrop);
  await deployer.deploy(MerkleDrop, '0x0000000000000000000000000000000000000000000000000000000000000000');
}

module.exports = function(deployer){
deployer
    .then(function() {
      return performMigration(deployer)
    })
    .catch(error => {
      console.log(error)
      process.exit(1)
    })
};

