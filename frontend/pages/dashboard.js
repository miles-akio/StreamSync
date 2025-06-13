import { useEffect, useState } from "react";

export default function Dashboard() {
  const [streams, setStreams] = useState([]);
  const [selectedStreamId, setSelectedStreamId] = useState(null);
  const [streamData, setStreamData] = useState([]);
  const [loadingStreams, setLoadingStreams] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(null);

  const backendBaseUrl = "http://localhost:5000";

  useEffect(() => {
    async function fetchStreams() {
      setLoadingStreams(true);
      setError(null);
      try {
        const res = await fetch(`${backendBaseUrl}/streams`);
        if (!res.ok) throw new Error("Failed to fetch streams");
        const data = await res.json();
        setStreams(data);
        if (data.length > 0) {
          setSelectedStreamId(data[0].id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingStreams(false);
      }
    }
    fetchStreams();
  }, []);

  useEffect(() => {
    if (!selectedStreamId) return;
    async function fetchStreamData() {
      setLoadingData(true);
      setError(null);
      try {
        const res = await fetch(`${backendBaseUrl}/streams/${selectedStreamId}/data`);
        if (!res.ok) throw new Error("Failed to fetch stream data");
        const data = await res.json();
        setStreamData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingData(false);
      }
    }
    fetchStreamData();
  }, [selectedStreamId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">StreamSync Dashboard</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      <div className="mb-6">
        <label htmlFor="stream-select" className="block mb-2 font-semibold">
          Select Stream:
        </label>
        {loadingStreams ? (
          <div>Loading streams...</div>
        ) : (
          <select
            id="stream-select"
            className="w-full border border-gray-300 rounded p-2"
            value={selectedStreamId || ""}
            onChange={(e) => setSelectedStreamId(Number(e.target.value))}
          >
            {streams.map((stream) => (
              <option key={stream.id} value={stream.id}>
                {stream.stream_name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Stream Data</h2>
        {loadingData ? (
          <div>Loading data...</div>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto max-h-96">
            {streamData.length > 0
              ? JSON.stringify(streamData, null, 2)
              : "No data available for this stream."}
          </pre>
        )}
      </div>
    </div>
  );
}
