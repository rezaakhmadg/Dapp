import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xfAebdEdf07A9493Bd42330C9102Ba6346eF21DcE";
const CONTRACT_ABI = [
  "function getGreeting() public view returns (string)",
  "function setGreeting(string memory _greeting) public"
];

export async function getGreeting() {
  if (!window.ethereum) return "No wallet detected";

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  return await contract.getGreeting();
}

export async function setGreeting(newGreeting) {
  if (!window.ethereum) return;

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  console.log("Connected Metamask:", accounts[0]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  try {
    const tx = await contract.setGreeting(newGreeting);
    console.log("TX sent:", tx.hash);
    await tx.wait();
    console.log("TX confirmed");
  } catch (err) {
    console.error("Tx failed or rejected:", err);
  }
}