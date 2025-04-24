require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    blocktopus: {
      url: "https://60df3bbba02e4cc48c0f41434128bddb-rpc.prod.bloctopus.io", // replace this
      accounts: ["ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"] // will add this next
    }
  }
};