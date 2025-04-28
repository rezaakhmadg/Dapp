import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x90bDDb7B71a81784adCA84447a4D06A18a9d3516"; // Update if needed
const CONTRACT_ABI = [
  "function getGreeting() public view returns (string)",
  "function setGreeting(string memory _greeting) public"
];

export async function getGreeting() {
  if (!window.ethereum) throw new Error("No wallet detected!");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  return await contract.getGreeting();
}

export async function setGreeting(newGreeting, setStatus) {
  if (!window.ethereum) throw new Error("No wallet detected!");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  try {
    setStatus("pending");
    const tx = await contract.setGreeting(newGreeting);
    console.log("⏳ Waiting for tx confirmation:", tx.hash);
    await tx.wait();
    console.log("✅ Tx confirmed:", tx.hash);
    setStatus("success");
  } catch (error) {
    console.error("❌ Transaction failed:", error);
    setStatus("error");
  }
}