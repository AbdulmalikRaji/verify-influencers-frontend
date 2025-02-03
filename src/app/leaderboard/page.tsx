"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Influencer {
  id: number;
  name: string;
  username: string;
  followers: number;
  trust_score: number;
  url: string;
  claim_count: number;
}

interface InfluencerData {
  influencer: Influencer[];
  total_claim_count: number;
  influencer_count: number;
  average_trust_score: number;
}

export default function LeaderboardPage() {
  const [data, setData] = useState<InfluencerData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      try {
        const response = await fetch(`${baseUrl}/api/v1/influencers`);
        const result = await response.json();

        if (response.ok) {
          setData(result.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="text-green-400 text-center p-4">Loading...</div>;

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-[#121212] text-green-400 p-4">
      
      <h1 className="text-4xl font-bold mb-2 text-center">
        Influencer Leaderboard
      </h1>
      <p className="mb-4 text-center">Shows influencer current rankings</p>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#1e2a38] p-4 rounded-xl shadow-md text-center  ">
          <h2 className="text-2xl font-semibold text-green-300">
            Active Influencers
          </h2>
          <p className="text-3xl mt-2 text-green-400">
            {data?.influencer_count}
          </p>
        </div>
        <div className="bg-[#1e2a38] p-4 rounded-xl shadow-md text-center  ">
          <h2 className="text-2xl font-semibold text-green-300">
            Claims Verified
          </h2>
          <p className="text-3xl mt-2 text-green-400">
            {data?.total_claim_count}
          </p>
        </div>
        <div className="bg-[#1e2a38] p-4 rounded-xl shadow-md text-center ">
          <h2 className="text-2xl font-semibold text-green-300">
            Average Trust Score
          </h2>
          <p className="text-3xl mt-2 text-green-400">
            {data?.average_trust_score.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data?.influencer.map((influencer) => (
          <div
            key={influencer.id}
            className="bg-gray-800 p-6 rounded-xl shadow-md cursor-pointer hover:bg-gray-700 transition w-full flex justify-between items-center"
            onClick={() => router.push(`/influencer/${influencer.id}`)}
          >
            <div>
              <h3 className="text-2xl font-semibold">{influencer.name}</h3>
              <p className="text-sm text-green-300">@{influencer.username}</p>
              <p className="mt-1">Followers: {influencer.followers}</p>
              <p>Claims: {influencer.claim_count}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">
                Trust Score: {influencer.trust_score.toFixed(2)}%
              </p>
              <a
                href={influencer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline"
              >
                Visit Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
