import { useEffect, useState } from "react";
import { getGreeting, setGreeting } from "./greeter";

function App() {
  const [greeting, setGreetingText] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchGreeting() {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const message = await getGreeting();
        setGreetingText(message || "No greeting set yet");
      }
    }
    fetchGreeting();
  }, []);
  console.log("Form submitted with:", input);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!input.trim()) return;
  
    console.log("Form submitted with:", input);
  
    try {
      await setGreeting(input);
      const updated = await getGreeting();
      setGreetingText(updated);
      setInput("");
    } catch (err) {
      console.error("Failed to update greeting:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>My First dApp 🚀</h1>
      <p><strong>Greeting on chain:</strong> {greeting}</p>
    
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New greeting"
        />
        <button type="submit">Update Greeting</button>
      </form>
    </div>
  );
}

export default App;