import { useEffect, useState } from "react"
import api from "@/services/api"

function Home() {
  const [health, setHealth] = useState<any>(null);
  useEffect(() => {
    api.get("/health")
      .then((res) => setHealth(res.data))
      .catch(console.error);
  }, [])
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        AI Job Tracker
      </h1>

      <pre className="mt-5 bg-gray-100 p-4 rounded">
        {JSON.stringify(health, null, 2)}
      </pre>
    </div>
  )
}

export default Home