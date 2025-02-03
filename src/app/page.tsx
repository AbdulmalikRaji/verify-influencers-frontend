'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { subDays } from 'date-fns';
import Navbar from '@/components/Navbar';

export default function SearchPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 6));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // To track loading state

  const handleSearch = async () => {
    if (!username) {
      setError('Username cannot be empty');
      return;
    }

    if (!startDate || !endDate) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const query = new URLSearchParams({
      username,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    }).toString();

    setLoading(true); // Show loading animation

    try {
      const response = await fetch(`${baseUrl}/api/v1/claims?${query}`);
      const data = await response.json();

      if (response.ok && data.data.influencer_id) {
        router.push(`/influencer/${data.data.influencer_id}`);
      } else {
        setError(data.message || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
      setError('Failed to fetch data. Please check your network or try again later.');
    } finally {
      setLoading(false); // Hide loading animation after request
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="bg-[#121212] min-h-screen text-white">
        <Navbar />

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-2xl font-bold z-50">
            <div className="animate-pulse">
              <span>Loading</span>
              <span className="ml-2">.</span>
              <span className="ml-2">.</span>
              <span className="ml-2">.</span>
            </div>
          </div>
        )}

        <div className="max-w-sm mx-auto mt-20">
          <div className="p-6 bg-gray-800 rounded-3xl shadow-2xl">
            <h2 className="text-3xl text-center font-bold text-green-500 mb-6">
              Verify Influencer
            </h2>

            {error && (
              <div className="text-red-500 mb-4 text-center">
                {error}
              </div>
            )}

            <input
              type="text"
              placeholder="Username"
              className="w-full mb-6 p-3 rounded-lg bg-white text-black focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              minDate={subDays(new Date(), 6)}
              maxDate={new Date()}
              className="w-full mb-6"
            />

            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              minDate={subDays(new Date(), 7)}
              maxDate={new Date()}
              className="w-full mb-6"
            />

            <button
              onClick={handleSearch}
              disabled={!username}  // Disable the button if username is empty
              className={`w-full p-3 ${!username ? 'bg-gray-600' : 'bg-green-500'} text-black rounded-lg font-bold ${!username ? '' : 'hover:bg-green-600'}`}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
