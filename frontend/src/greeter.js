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
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  console.log("Submitting tx via wallet:", signer.address);
  const tx = await contract.setGreeting(newGreeting);
  await tx.wait();
}