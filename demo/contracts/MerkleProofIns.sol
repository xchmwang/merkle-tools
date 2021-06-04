pragma solidity >=0.4.21 <0.6.0;
import "./MerkleProof.sol";

contract MerkleProofIns {

  event VerifyFailed();
  function verify(bytes32[] memory proof, bytes32 root, bytes32 leaf) public returns (bool) {
    bool ret = MerkleProof.verify(proof, root, leaf);
    if (!ret) {
      emit VerifyFailed();
    }
    return ret;
  }
}
