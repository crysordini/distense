const DIDToken = artifacts.require('./DIDToken.sol')
const Distense = artifacts.require('./Distense.sol')
const GitTool = artifacts.require('./GitTool.sol')
const PullRequests = artifacts.require('./PullRequests.sol')
const Tasks = artifacts.require('./Tasks.sol')

module.exports = deployer => {
  deployer
    .deploy(DIDToken)
    .then(() => {
      return deployer.deploy(Distense, DIDToken.address)
    })
    .then(() => {
      return deployer.deploy(Tasks, DIDToken.address, Distense.address)
    })
    .then(() => {
      return deployer.deploy(PullRequests, Tasks.address)
    })
    .then(() => {
      deployer.deploy(GitTool)
    })
}
