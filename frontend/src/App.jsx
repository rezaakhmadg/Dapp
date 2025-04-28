import { useState, useEffect } from "react";
import { getGreeting, setGreeting } from "./greeter";

function App() {
  const [greeting, setGreetingValue] = useState("");
  const [newGreeting, setNewGreeting] = useState("");
  const [txStatus, setTxStatus] = useState(null); // pending, success, error

  useEffect(() => {
    fetchGreeting();
  }, []);

  async function fetchGreeting() {
    try {
      const greeting = await getGreeting();
      setGreetingValue(greeting);
    } catch (error) {
      console.error("Failed to fetch greeting:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newGreeting.trim()) return;

    await setGreeting(newGreeting, setTxStatus);
    await fetchGreeting(); // Auto-refresh after tx success
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>My First dApp 🚀</h1>

      <h3>Greeting on chain:</h3>
      <p><strong>{greeting}</strong></p>

      <form onSubmit={handleSubmit}>
        <input
          value={newGreeting}
          onChange={(e) => setNewGreeting(e.target.value)}
          placeholder="Enter new greeting"
        />
        <button type="submit">Update Greeting</button>
      </form>

      {txStatus === "pending" && <p>⏳ Waiting for confirmation...</p>}
      {txStatus === "success" && <p>✅ Greeting updated successfully!</p>}
      {txStatus === "error" && <p>❌ Transaction failed. Please try again.</p>}
    </div>
  );
}

export default App;