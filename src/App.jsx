import React, { useState } from 'react';

/**
 * VerifiedPostForm Component
 */
function VerifiedPostForm({ onPostAdded }) {
  const [content, setContent] = useState('');
  const [pair, setPair] = useState('BTC/USDT');
  const [side, setSide] = useState('LONG');
  const [entryPrice, setEntryPrice] = useState('');
  const [isApiAttached, setIsApiAttached] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncAPI = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setEntryPrice((Math.random() * 5000 + 60000).toFixed(2));
      setIsApiAttached(true);
      setIsSyncing(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) return;

    const newPost = {
      id: Date.now(),
      author: "NexiaTrader_Pro",
      content,
      setup: isApiAttached ? {
        pair,
        side,
        entryPrice,
        isVerified: true
      } : null,
      timestamp: "Just now"
    };

    onPostAdded(newPost);
    
    setContent('');
    setIsApiAttached(false);
    setEntryPrice('');
  };

  return (
    <div className="bg-[#0D1117] border border-slate-800 rounded-2xl p-5 shadow-xl mb-8">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full bg-[#161B22] border border-slate-800 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
          placeholder="අද මාකට් එක ගැන ඔයාගේ Alpha View එක මොකක්ද?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
        />

        <div className="flex flex-wrap gap-4 mt-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSyncAPI}
              disabled={isSyncing || isApiAttached}
              className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all ${
                isApiAttached 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
              }`}
            >
              {isSyncing ? "Syncing API..." : isApiAttached ? "✓ API Verified" : "Attach Live Position"}
            </button>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-violet-600 text-slate-900 font-bold px-6 py-2 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
          >
            Publish Alpha
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * PostCard Component
 */
function PostCard({ post }) {
  return (
    <div className="bg-[#0D1117] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-xl group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold uppercase">
            {post.author[0]}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{post.author}</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{post.timestamp}</p>
          </div>
        </div>
      </div>

      <p className="text-slate-300 text-[15px] mb-5 leading-relaxed">
        {post.content}
      </p>

      {post.setup && (
        <div className="bg-[#161B22] border border-slate-800 rounded-xl p-4 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
          <div>
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-1 block">Live Execution</span>
            <div className="flex items-center space-x-3">
              <span className="text-lg font-black text-slate-100">{post.setup.pair}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${post.setup.side === 'LONG' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                {post.setup.side}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-1 block">Verified Entry</span>
            <span className="text-lg font-mono font-bold text-cyan-400">${post.setup.entryPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const initialPostsData = [
  {
    id: 1,
    author: "CryptoCapo_Real",
    content: "Watching the BTC weekly close. If we hold above 64k, the next leg up is inevitable. Risk management is key here.",
    setup: { pair: "BTC/USDT", side: "LONG", entryPrice: "64250", isVerified: true },
    timestamp: "2m ago"
  },
  {
    id: 2,
    author: "NexiaTrader_VIP",
    content: "Scalping ETH on the 15m timeframe. Tight SL, targeting the previous high. Pure math, no emotions.",
    setup: { pair: "ETH/USDT", side: "LONG", entryPrice: "3450", isVerified: true },
    timestamp: "15m ago"
  }
];

export default function App() {
  const [posts, setPosts] = useState(initialPostsData);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <nav className="border-b border-slate-800 bg-[#0D1117]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center font-black text-slate-950 italic">N</div>
            <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent italic tracking-tighter">
              NEXIA FLOOR
            </h1>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto py-10 px-4">
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
             <div className="w-1 h-4 bg-cyan-500 rounded-full"></div>
             <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Share Your Alpha</h2>
          </div>
          <VerifiedPostForm onPostAdded={handleAddPost} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Live Floor Feed</h2>
            </div>
          </div>

          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}