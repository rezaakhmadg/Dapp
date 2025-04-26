// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Greeter contract...");

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello from Blocktopus!"); // initial greeting

  console.log("📦 Waiting for contract to be deployed...");
  await greeter.waitForDeployment();

  const contractAddress = await greeter.getAddress();
  console.log(`✅ Greeter deployed successfully at address: ${contractAddress}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});