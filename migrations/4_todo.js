var ToDo = artifacts.require('./ToDo.sol');

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
	_deployer.deploy(ToDo);
};
