import { useState } from 'react';

export default function PostData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const postData = async () => {
    setLoading(true);
    const data = await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    const json = await data.json();
    setData(json);
    setLoading(false);
  };

  return <div className="p-4 m-4 bg-gray-100 rounded-md w-full">
    {/* two columns */}
    <div className="flex flex-row">
      <div>
        <button onClick={postData} className="bg-blue-500 text-white p-2 rounded">
          {loading ? <span>Loading...</span> : <span>Post Data</span>}
        </button>
      </div>
      <div>
        <input
          type="text"
          value={message}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded ml-4"
        />
      </div>
    </div>
    {!loading && data && <pre>{JSON.stringify(data, null, 2)}</pre>}
  </div>;
}