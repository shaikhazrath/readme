// app/page.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import FeedSection   from './FeedSection';
import  supabase  from '../utils/supabase'; 
export default function Page() {
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const ITEMS_PER_PAGE = 10;

const fetchRandomFeed = async (pageNum: number, append = false) => {
  try {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setError(null);
    }

    // Call the Edge Function using Supabase client
  const { data, error } = await supabase.functions.invoke('dynamic-function', {
       body: JSON.stringify({
    page: pageNum,
    limit: ITEMS_PER_PAGE,
  })
  });
    if (error) {
      throw new Error(error.message || 'Failed to fetch random feed');
    }

    if (append) {
      setFeed(prev => [...prev, ...data.data]);
    } else {
      setFeed(data.data);
    }

    setHasMore(data.hasMore);
  } catch (err) {
    console.error('Error fetching random feed:', err);
    setError(err instanceof Error ? err.message : 'An unknown error occurred');
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
};

  useEffect(() => {
    fetchRandomFeed(1);
  }, []);

  const handleScroll = useCallback(() => {
    if (loadingMore || !hasMore) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRandomFeed(nextPage, true);
    }
  }, [page, hasMore, loadingMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const retry = () => {
    fetchRandomFeed(1);
  };

  if (loading && feed.length === 0) {
    return <p className="text-white text-center p-20">Loading…</p>;
  }

  if (error && feed.length === 0) {
    return (
      <div className="text-center p-20">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button 
          onClick={retry}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <FeedSection data={feed} />
      
      {loadingMore && (
        <div className="flex justify-center my-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {!hasMore && feed.length > 0 && (
        <p className="text-gray-400 text-center py-8">You reached the end</p>
      )}
    </div>
  );
}