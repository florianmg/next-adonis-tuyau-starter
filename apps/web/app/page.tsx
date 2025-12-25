"use client";

import { tuyau } from "@/utils/tuyau";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      <Button type="button" onClick={handleClick}>
        Press me
      </Button>
      <pre className="bg-gray-100 p-2 rounded-md">
        {JSON.stringify({ isLoading, data }, null, 2)}
      </pre>
    </div>
  );
}
