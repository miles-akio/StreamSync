import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <Header />
      <main style={{ padding: "1rem" }}>
        <h1>StreamSync Live Data</h1>
        <div>
          Live Data: {data ? JSON.stringify(data) : "Waiting for updates..."}
        </div>
      </main>
      <Footer />
    </div>
  );
}
