import { useState } from 'react';

export default function GetData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await fetch("/api/test");
    const json = await data.json();
    setData(json);
    setLoading(false);
  };

  return <div className="p-4 m-4 bg-gray-100 rounded-md w-full">
    <button onClick={getData} className="bg-blue-500 text-white p-2 rounded">
      {loading ? <span>Loading...</span> : <span>Get Data</span>}
    </button>
    {!loading && data && <pre>{JSON.stringify(data, null, 2)}</pre>}
  </div>;
}