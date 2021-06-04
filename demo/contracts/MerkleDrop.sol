pragma solidity >=0.4.21 <0.6.0;
import "./SafeMath.sol";
import "./MerkleProof.sol";

contract MerkleDrop {
  using SafeMath for uint;

  uint public total_dropped;
  bytes32 public merkle_root;

  mapping(address => bool) private claim_status;

  constructor(bytes32 _merkle_root) public{
    total_dropped = 0;
    merkle_root = _merkle_root;
  }

  function change_merkle_root(bytes32 _merkle_root) public{
    merkle_root = _merkle_root;
  }

  event DisplayLeaf(bytes32 leaf);
  function display_leaf(address from, uint amount) public returns(bytes32){
    bytes32 leaf = keccak256(abi.encodePacked(from, amount));
    emit DisplayLeaf(leaf);
    return leaf;
  }

  function test_claim(address from, address to, uint amount, bytes32[] memory proof) public returns(bool){
    bytes32 leaf = keccak256(abi.encodePacked(from, amount));

    bool ret = MerkleProof.verify(proof, merkle_root, leaf);
    require(ret, "invalid merkle proof");

    emit DropToken(from, to, amount);
    return true;
  }

  event DropToken(address claimer, address to, uint amount);
  function claim(address to, uint amount, bytes32[] memory proof) public returns(bool){
    require(claim_status[msg.sender] == false, "you claimed already");

    bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));

    bool ret = MerkleProof.verify(proof, merkle_root, leaf);
    require(ret, "invalid merkle proof");

    claim_status[msg.sender] = true;
    total_dropped = total_dropped.safeAdd(amount);
    emit DropToken(msg.sender, to, amount);
    return true;
  }
}
