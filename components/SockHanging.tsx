import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Globe } from 'lucide-react';

interface SockHangingProps {
  onBack: () => void;
}

interface SockEntry {
  id: string;
  country: string;
  countryCode: string;
  message: string;
  sock: string;
  timestamp: number;
  region: string;
}

const sockEmojis = ['🧦', '🎅', '🎄', '⛄', '🎁', '❄️', '🔔', '⭐'];

const regions = [
  'North America',
  'South America',
  'Europe',
  'Asia',
  'Africa',
  'Oceania',
];

const countries = [
  { name: 'United States', code: 'US', region: 'North America', flag: '🇺🇸' },
  { name: 'Canada', code: 'CA', region: 'North America', flag: '🇨🇦' },
  { name: 'Mexico', code: 'MX', region: 'North America', flag: '🇲🇽' },
  { name: 'Brazil', code: 'BR', region: 'South America', flag: '🇧🇷' },
  { name: 'Argentina', code: 'AR', region: 'South America', flag: '🇦🇷' },
  { name: 'United Kingdom', code: 'GB', region: 'Europe', flag: '🇬🇧' },
  { name: 'France', code: 'FR', region: 'Europe', flag: '🇫🇷' },
  { name: 'Germany', code: 'DE', region: 'Europe', flag: '🇩🇪' },
  { name: 'Spain', code: 'ES', region: 'Europe', flag: '🇪🇸' },
  { name: 'Italy', code: 'IT', region: 'Europe', flag: '🇮🇹' },
  { name: 'China', code: 'CN', region: 'Asia', flag: '🇨🇳' },
  { name: 'Japan', code: 'JP', region: 'Asia', flag: '🇯🇵' },
  { name: 'India', code: 'IN', region: 'Asia', flag: '🇮🇳' },
  { name: 'South Korea', code: 'KR', region: 'Asia', flag: '🇰🇷' },
  { name: 'Australia', code: 'AU', region: 'Oceania', flag: '🇦🇺' },
  { name: 'New Zealand', code: 'NZ', region: 'Oceania', flag: '🇳🇿' },
  { name: 'South Africa', code: 'ZA', region: 'Africa', flag: '🇿🇦' },
];

export function SockHanging({ onBack }: SockHangingProps) {
  const [message, setMessage] = useState('');
  const [selectedSock, setSelectedSock] = useState('🧦');
  const [entries, setEntries] = useState<SockEntry[]>([]);
  const [stats, setStats] = useState({ total: 0, today: 0 });

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('sockEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Update stats
    const today = new Date().toDateString();
    const todayCount = entries.filter(
      (e) => new Date(e.timestamp).toDateString() === today
    ).length;
    
    setStats({ total: entries.length, today: todayCount });
  }, [entries]);

  const handleHangSock = () => {
    if (!message.trim()) return;

    // Random country selection
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];

    const newEntry: SockEntry = {
      id: Date.now().toString(),
      country: randomCountry.name,
      countryCode: randomCountry.code,
      message: message.trim(),
      sock: selectedSock,
      timestamp: Date.now(),
      region: randomCountry.region,
    };

    const newEntries = [newEntry, ...entries];
    setEntries(newEntries);
    localStorage.setItem('sockEntries', JSON.stringify(newEntries));
    setMessage('');
  };

  const getCountryRankings = () => {
    const countryCounts: Record<string, { count: number; flag: string }> = {};
    entries.forEach((entry) => {
      const country = countries.find((c) => c.name === entry.country);
      if (!countryCounts[entry.country]) {
        countryCounts[entry.country] = {
          count: 0,
          flag: country?.flag || '🌍',
        };
      }
      countryCounts[entry.country].count++;
    });

    return Object.entries(countryCounts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10);
  };

  const getRegionStats = () => {
    const regionCounts: Record<string, number> = {};
    entries.forEach((entry) => {
      regionCounts[entry.region] = (regionCounts[entry.region] || 0) + 1;
    });
    return regionCounts;
  };

  const regionStats = getRegionStats();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-3xl sm:text-4xl text-[#FFB81C] mb-4">🧦 Hang Your Sock</h2>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl text-[#FFB81C]">{stats.total}</div>
            <div className="text-sm text-white/70">Total Socks</div>
          </div>
          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl text-[#FFB81C]">{stats.today}</div>
            <div className="text-sm text-white/70">Today</div>
          </div>
          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
            <div className="text-2xl sm:text-3xl text-[#FFB81C]">{entries.slice(0, 5).length}</div>
            <div className="text-sm text-white/70">Recent</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form */}
            <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6">
              <h3 className="text-xl mb-4">Hang Your Sock Globally</h3>

              <div className="mb-4">
                <label className="block mb-2 text-sm">Choose Your Sock</label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {sockEmojis.map((sock) => (
                    <button
                      key={sock}
                      onClick={() => setSelectedSock(sock)}
                      className={`aspect-square text-3xl p-2 rounded-xl transition-all ${
                        selectedSock === sock
                          ? 'bg-[#C8102E] scale-110'
                          : 'bg-white/8 hover:bg-white/12 border border-white/12'
                      }`}
                    >
                      {sock}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm">
                  Your Message ({message.length}/100)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 100))}
                  placeholder="Share your Christmas wish..."
                  className="w-full p-3 rounded-xl bg-white/8 border border-white/12 text-white resize-none focus:outline-none focus:border-white/20"
                  rows={3}
                />
              </div>

              <button
                onClick={handleHangSock}
                disabled={!message.trim()}
                className="w-full px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-[#A00D25] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                Hang Your Sock
              </button>
            </div>

            {/* Global Distribution */}
            <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6">
              <h3 className="text-xl mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Global Distribution
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {regions.map((region) => {
                  const count = regionStats[region] || 0;
                  const maxCount = Math.max(...Object.values(regionStats), 1);
                  const percentage = (count / maxCount) * 100;
                  
                  return (
                    <div
                      key={region}
                      className="p-4 rounded-xl bg-white/8 border border-white/12"
                    >
                      <div className="text-sm text-white/70 mb-2">{region}</div>
                      <div className="text-2xl text-[#FFB81C] mb-2">{count}</div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#C8102E] to-[#FFB81C] h-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Feed */}
            <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6 max-h-96 overflow-y-auto">
              <h3 className="text-xl mb-4">Recent Socks</h3>
              <div className="space-y-3">
                {entries.slice(0, 15).map((entry) => {
                  const country = countries.find((c) => c.name === entry.country);
                  return (
                    <div
                      key={entry.id}
                      className="p-3 rounded-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{entry.sock}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white/70 mb-1 flex items-center gap-1">
                            <span>{country?.flag || '🌍'}</span>
                            <span>{entry.country}</span>
                          </div>
                          <div className="text-sm break-words">{entry.message}</div>
                          <div className="text-xs text-white/50 mt-1">
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {entries.length === 0 && (
                  <div className="text-center text-white/50 py-8">
                    No socks yet. Be the first!
                  </div>
                )}
              </div>
            </div>

            {/* Rankings */}
            <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6">
              <h3 className="text-xl mb-4">Top Countries</h3>
              <div className="space-y-2">
                {getCountryRankings().map(([country, data], index) => (
                  <div
                    key={country}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/8 hover:bg-white/12 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-[#FFB81C] w-6 text-center">#{index + 1}</div>
                      <div className="text-2xl">{data.flag}</div>
                      <div>{country}</div>
                    </div>
                    <div className="text-white/70 px-3 py-1 rounded-full bg-white/8">
                      {data.count}
                    </div>
                  </div>
                ))}
                {entries.length === 0 && (
                  <div className="text-center text-white/50 py-4">
                    No rankings yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
