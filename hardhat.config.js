require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    arbitrum: {
      url: "https://21eb2a0357bb4e2383796a6ec22dc6d2-rpc.prod.bloctopus.io",  // ✅ paste the new RPC URL from Blocktopus
      chainId: 2615866, // ✅ or whatever Chain ID Blocktopus shows (this is Arbitrum testnet default)
      accounts: ["0x7d693de64287762eb2f808ca8c1859e8e9e327524974a235fabc1b1862ee0b67"] // ✅ wallet must have test ETH on this network
    }
  }
};