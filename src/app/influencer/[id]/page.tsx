'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';

interface InfluencerClaim {
  claim: string;
  claim_url: string;
  proof: string;
  proof_source: string;
  proof_url: string;
  topic: string;
  score: number;
  status: string;
  claimed_at: string;
}

interface Influencer {
  name: string;
  username: string;
  followers: number;
  trust_score: number;
  url: string;
  bio: string;
  image_url: string;
  claims: InfluencerClaim[];
  topics: string[];
}

const InfluencerPage = () => {
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchInfluencerData = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

        try {
          const response = await fetch(`${baseUrl}/api/v1/influencer?id=${id}`);
          const data = await response.json();

          if (response.ok) {
            setInfluencer(data.data);
          } else {
            console.error('Failed to fetch influencer data');
          }
        } catch (error) {
          console.error('Error fetching influencer data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchInfluencerData();
    }
  }, [id]);

  if (loading) return <div className="text-center text-xl text-gray-500">Loading...</div>;

  if (!influencer) return <div className="text-center text-xl text-red-500">Influencer not found.</div>;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4">
        {/* Influencer Name Section (Full Width) */}
        <div className="bg-black text-green-500 p-16 rounded-b-lg shadow-md mb-8 flex items-center justify-center">
          <img
            src={influencer.image_url}
            alt={influencer.name}
            className="w-24 h-24 rounded-full mr-6 shadow-md"
          />
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-center">
              {influencer.name} <span className="text-lg text-gray-300">@{influencer.username}</span>
            </h1>
            <p className="text-lg mt-4 text-center">Followers: {influencer.followers}</p>
            <p className="text-lg text-center">Trust Score: {influencer.trust_score.toFixed(2)}%</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-black p-8 rounded-lg shadow-md mb-8 border border-green-600">
          <h2 className="text-2xl font-semibold mb-4 text-green-500">Bio</h2>
          <p className="text-lg">{influencer.bio}</p>
          <a
            className="text-green-500 mt-4 block"
            href={influencer.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Profile
          </a>
        </div>

        {/* Claims Section */}
        <h2 className="text-3xl font-semibold text-center mb-6 text-green-500">Claims</h2>
        {Array.isArray(influencer.claims) && influencer.claims.length > 0 ? (
          influencer.claims.map((claim, index) => (
            <div className="bg-black p-6 rounded-lg shadow-md mb-6 border border-green-600" key={index}>
              <h3 className="text-xl font-semibold text-green-500">{claim.topic}</h3>
              <p className="mt-2">{claim.claim}</p>
              <div className="mt-4 flex space-x-4">
                <a
                  href={claim.claim_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500"
                >
                  Claim URL ➡️
                </a>
                <a
                  href={claim.proof_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500"
                >
                  Proof URL ➡️
                </a>
              </div>
              <p className="mt-2">Status: {claim.status}</p>
              <p className="mt-2">Score: {claim.score.toFixed(2)}%</p>
              <p className="mt-2">Claimed At: {new Date(claim.claimed_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-500">No claims available.</p>
        )}
      </div>
    </div>
  );
};

export default InfluencerPage;
