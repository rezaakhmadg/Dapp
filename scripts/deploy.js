const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Greeter...");

  const GreeterFactory = await hre.ethers.getContractFactory("Greeter");
  const greeter = await GreeterFactory.deploy("Hello from Blocktopus!");
  await greeter.waitForDeployment();

  const address = await greeter.getAddress();
  console.log(`✅ Greeter deployed at: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});