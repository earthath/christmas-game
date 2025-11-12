import { useState } from 'react';
import { ArrowLeft, UserPlus, Trash2, Shuffle } from 'lucide-react';

interface GiftExchangeProps {
  onBack: () => void;
}

interface Participant {
  id: string;
  name: string;
  email: string;
}

interface Pair {
  giver: string;
  receiver: string;
}

export function GiftExchange({ onBack }: GiftExchangeProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [showResults, setShowResults] = useState(false);

  const addParticipant = () => {
    if (!name.trim()) return;

    const newParticipant: Participant = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
    };

    setParticipants([...participants, newParticipant]);
    setName('');
    setEmail('');
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const generatePairs = () => {
    if (participants.length < 2) return;

    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const newPairs: Pair[] = [];

    for (let i = 0; i < shuffled.length; i++) {
      const giver = shuffled[i];
      const receiver = shuffled[(i + 1) % shuffled.length];
      newPairs.push({ giver: giver.name, receiver: receiver.name });
    }

    setPairs(newPairs);
    setShowResults(true);
  };

  const reset = () => {
    setPairs([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-3xl sm:text-4xl text-[#FFB81C] mb-4">🎁 Secret Santa Generator</h2>

        {!showResults ? (
          <div className="space-y-6">
            {/* Add Participant Form */}
            <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6">
              <h3 className="text-xl mb-4">Add Participants</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name..."
                    className="w-full p-3 rounded-xl bg-white/8 border border-white/12 text-white focus:outline-none focus:border-white/20"
                    onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Email (optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="w-full p-3 rounded-xl bg-white/8 border border-white/12 text-white focus:outline-none focus:border-white/20"
                    onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                  />
                </div>
              </div>

              <button
                onClick={addParticipant}
                disabled={!name.trim()}
                className="w-full px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-[#A00D25] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Participant
              </button>
            </div>

            {/* Participants List */}
            <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl">Participants ({participants.length})</h3>
                {participants.length >= 2 && (
                  <button
                    onClick={generatePairs}
                    className="px-4 py-2 rounded-xl bg-[#0F5132] hover:bg-[#0A3D24] transition-all flex items-center gap-2"
                  >
                    <Shuffle className="w-4 h-4" />
                    Generate Pairs
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/8 border border-white/12"
                  >
                    <div>
                      <div>{participant.name}</div>
                      {participant.email && (
                        <div className="text-sm text-white/60">{participant.email}</div>
                      )}
                    </div>
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="p-2 rounded-lg hover:bg-white/12 transition-all text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {participants.length === 0 && (
                  <div className="text-center text-white/50 py-8">
                    No participants yet. Add at least 2 to generate pairs.
                  </div>
                )}

                {participants.length === 1 && (
                  <div className="text-center text-white/50 py-4">
                    Add at least one more participant to generate pairs.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl">Secret Santa Pairs</h3>
              <button
                onClick={reset}
                className="px-4 py-2 rounded-xl bg-white/8 hover:bg-white/12 border border-white/12 transition-all"
              >
                Generate New Pairs
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {pairs.map((pair, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-br from-[#C8102E]/20 to-[#0F5132]/20 border border-white/12"
                >
                  <div className="text-center">
                    <div className="text-lg mb-2">{pair.giver}</div>
                    <div className="text-2xl mb-2">🎁 ➡️</div>
                    <div className="text-lg text-[#FFB81C]">{pair.receiver}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#FFB81C]/10 border border-[#FFB81C]/20">
              <p className="text-sm text-center">
                ⚠️ Keep this information secret! Each person should only know who they're giving to.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
