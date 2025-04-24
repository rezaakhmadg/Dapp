const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy();

  console.log(`Greeter deployed to: ${greeter.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});