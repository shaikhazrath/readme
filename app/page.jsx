// app/page.tsx  (or pages/index.tsx)
'use client';
import { useState, useEffect } from 'react';
import { data } from '@/data';
import dynamic from 'next/dynamic';

const FeedSection = dynamic(() => import('@/components/FeedSection.client'), {
  ssr: false,
  loading: () => <p className="text-white text-center p-20">Loading…</p>,
});

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Page() {
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    setShuffledData(shuffleArray(data));
  }, []);

  return (
    <div>
      <FeedSection data={shuffledData} />
    </div>
  );
}