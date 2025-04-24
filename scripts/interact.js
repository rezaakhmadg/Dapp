const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");

  // ⬇️ Use your deployed contract address here
  const greeter = await Greeter.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

  // Read current greeting
  const currentGreeting = await greeter.getGreeting();
  console.log("Current Greeting:", currentGreeting);

  // Change greeting
  const tx = await greeter.setGreeting("Hello, Reza!");
  await tx.wait();

  const newGreeting = await greeter.getGreeting();
  console.log("Updated Greeting:", newGreeting);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});