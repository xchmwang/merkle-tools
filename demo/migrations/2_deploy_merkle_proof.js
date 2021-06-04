const MerkleProof = artifacts.require("MerkleProof");
const MerkleProofIns = artifacts.require("MerkleProofIns");

async function performMigration(deployer) {
  await deployer.deploy(MerkleProof);
  await deployer.link(MerkleProof, MerkleProofIns);
  await deployer.deploy(MerkleProofIns);
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

