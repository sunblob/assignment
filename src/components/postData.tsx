import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="flex flex-row gap-4">
      <div>
        <Button onClick={postData}>
          {loading ? <span>Loading...</span> : <span>Post Data</span>}
        </Button>
      </div>
      <div>
        <Input
          type="text"
          value={message}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </div>
    {!loading && data && <pre>{JSON.stringify(data, null, 2)}</pre>}
  </div>;
}