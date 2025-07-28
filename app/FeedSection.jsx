import React, { useEffect, useRef, useState } from 'react';
import { Bookmark, Heart, Share2, Volume2, VolumeX } from 'lucide-react';

const FeedSection = ({ data }) => {
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const observer = useRef(null);
  const sectionsRef = useRef([]);
  const synthRef = useRef(window.speechSynthesis);

  const toggleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSave = (id) => setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSpeaker = () => {
    setIsSpeakerOn((prev) => !prev);
    synthRef.current.cancel();
  };

  const speakText = (text, index) => {
    if (!isSpeakerOn) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-US';

    utterance.onend = () => {
      if (index + 1 < sectionsRef.current.length) {
        sectionsRef.current[index + 1]?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    synthRef.current.cancel(); // Cancel any ongoing speech
    synthRef.current.speak(utterance);
  };

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            speakText(data[index].snippet, index);
          }
        });
      },
      { threshold: 0.7 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.current.observe(section);
    });

    return () => {
      observer.current.disconnect();
    };
  }, [isSpeakerOn, data]);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-gradient-to-br from-black via-gray-900 to-gray-950">
      {data.map((item, i) => (
        <section
          key={item.id}
          ref={(el) => (sectionsRef.current[i] = el)}
          data-index={i}
          className="min-h-screen snap-start relative flex flex-col justify-between items-center px-6 py-12"
        >
          <header className="absolute top-8 text-center w-full">
            <p className="text-sm text-gray-400">
              <span className="text-indigo-400 font-semibold">{item.book}</span> <br /> {item.genre} • Pg {item.pageNumber}
            </p>
          </header>

          <div className="flex-grow flex items-center justify-center">
            <blockquote className="text-xl md:text-3xl font-serif text-gray-100 max-w-3xl leading-relaxed text-center">
              “{item.snippet}”
            </blockquote>
          </div>

          <div className="absolute bottom-6 w-full flex items-center justify-between px-4">
            <div className="text-left">
              <p className="text-xs text-gray-400">From:</p>
              <p className="text-sm font-semibold text-white">{item.book}</p>
              <button className="text-indigo-400 hover:underline text-xs mt-1">+ Save Book</button>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <button onClick={toggleSpeaker} className="transition hover:scale-110">
                {isSpeakerOn ? (
                  <Volume2 className="w-7 h-7 text-blue-400" />
                ) : (
                  <VolumeX className="w-7 h-7 text-gray-400" />
                )}
              </button>
              <button onClick={() => toggleLike(item.id)} className="transition hover:scale-110">
                <Heart className={`w-7 h-7 ${liked[item.id] ? 'fill-pink-500 text-pink-500' : 'text-gray-300'}`} />
              </button>
              <button onClick={() => toggleSave(item.id)} className="transition hover:scale-110">
                <Bookmark className={`w-7 h-7 ${saved[item.id] ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              </button>
              <button className="transition hover:scale-110">
                <Share2 className="w-7 h-7 text-gray-300" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-2 w-full flex justify-center">
            <p className="text-xs text-gray-500 animate-pulse">⬆ Swipe for more wisdom</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default FeedSection;
