'use client';
import React, { useState } from 'react';
import { Bookmark, Heart, Share2 } from 'lucide-react';

const FeedSection = ({ data }) => {
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});

  const toggleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSave = (id) => setSaved((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-gradient-to-br from-black via-gray-900 to-gray-950">
      {data.map((item) => (
        <section
          key={item.index}
          className="min-h-screen snap-start relative flex flex-col justify-between items-center px-6 py-12"
        >
          {/* Book Header */}
          <header className="absolute top-8 text-center w-full">
            <p className="text-sm text-gray-400">
              <span className="text-indigo-400 font-semibold">{item.book}</span> • {item.genre} • Pg {item.pageNumber}
            </p>
          </header>

          {/* Centered Quote */}
          <div className="flex-grow flex items-center justify-center">
            <blockquote className=" text-xl md:text-3xl font-serif text-gray-100 max-w-3xl leading-relaxed">
              “{item.snippet}”
            </blockquote>
          </div>

          {/* Book Footer */}
          <div className="absolute bottom-6 w-full flex items-center justify-between px-4">
            {/* Mini book card */}
            <div className="text-left">
              <p className="text-xs text-gray-400">From:</p>
              <p className="text-sm font-semibold text-white">{item.book}</p>
              <button className="text-indigo-400 hover:underline text-xs mt-1">+ Save Book</button>
            </div>

            {/* Floating Action Buttons */}
            <div className="flex flex-col items-center space-y-4">
              <button onClick={() => toggleLike(item.id)} className="transition hover:scale-110">
                <Heart
                  className={`w-7 h-7 ${
                    liked[item.id] ? 'fill-pink-500 text-pink-500' : 'text-gray-300'
                  }`}
                />
              </button>
              <button onClick={() => toggleSave(item.id)} className="transition hover:scale-110">
                <Bookmark
                  className={`w-7 h-7 ${
                    saved[item.id] ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
              <button className="transition hover:scale-110">
                <Share2 className="w-7 h-7 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-2 w-full flex justify-center">
            <p className="text-xs text-gray-500 animate-pulse">⬆ Swipe for more wisdom</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default FeedSection;
