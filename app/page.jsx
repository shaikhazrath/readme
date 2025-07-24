'use client'
import React, { useState, useEffect } from 'react';
import FeedSection from '@/components/FeedSection';
import { data } from '@/data';

// Shuffle function using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Page = () => {
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    setShuffledData(shuffleArray(data));
  }, []);

  return (
    <div>
      <FeedSection data={shuffledData} />
    </div>
  );
};

export default Page;