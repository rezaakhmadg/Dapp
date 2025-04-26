const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy(["Hello world from Arbitrum!"]);
  await greeter.waitForDeployment();
  console.log("✅ Greeter deployed to:", await greeter.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  console.log("⚙️  Getting Greeter...");
  const Greeter = await hre.ethers.getContractFactory("Greeter");

  console.log("🚀 Deploying...");
  const greeter = await Greeter.deploy(["Hello from Arbitrum"]);

  await greeter.waitForDeployment();
  console.log("✅ Deployed at:", await greeter.getAddress());
}