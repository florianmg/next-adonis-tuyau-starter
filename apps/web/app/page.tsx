"use client";

import { tuyau } from "@/utils/tuyau";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string | null>(null);

  const handleClick = () => {
    setIsLoading(true);
    tuyau.health.$get().then((res) => {
      if (res.data) {
        setData(res.data.message);
      } else {
        setData("No data");
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
        type="button"
        onClick={handleClick}
      >
        Press me
      </button>
      <pre className="bg-gray-100 p-2 rounded-md">
        {JSON.stringify({ isLoading, data }, null, 2)}
      </pre>
    </div>
  );
}
