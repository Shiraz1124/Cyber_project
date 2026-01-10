import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientScreen() {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [newClientName, setNewClientName] = useState("");

  function handleClientAdd(e) {
    e.preventDefault();
    setClientName(newClientName);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Client System</h2>
      <form onSubmit={handleClientAdd}>
        <input value={newClientName} onChange={e => setNewClientName(e.target.value)} placeholder="Client Name" required /><br/>
        <button type="submit">Add Client</button>
      </form>
      {/*{clientName && <p>Client Added: <strong>{clientName}</strong></p>}*/}
      {clientName && <p dangerouslySetInnerHTML={{ __html: 'Client Added: <strong>${clientName}</strong>' }} />}
      <button onClick={() => navigate("/")}>← Back</button>
    </div>
  );
}
