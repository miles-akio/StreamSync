import { useEffect, useState } from "react";

export default function LiveData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>Live Data Stream</h2>
      <pre>{data ? JSON.stringify(data, null, 2) : "Waiting for updates..."}</pre>
    </div>
  );
}
