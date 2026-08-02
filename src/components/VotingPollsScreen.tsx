import React, { useState } from 'react';
import { Poll } from '../types';
import { LeaderBanner } from './LeaderBanner';

interface VotingPollsScreenProps {
  polls: Poll[];
  onVote: (pollId: string, optionId: string) => void;
}

export const VotingPollsScreen: React.FC<VotingPollsScreenProps> = ({ polls, onVote }) => {
  const [activePolls, setActivePolls] = useState<Poll[]>(polls);

  const handleOptionVote = (pollId: string, optionId: string) => {
    onVote(pollId, optionId);
    setActivePolls((prev) =>
      prev.map((p) => {
        if (p.id === pollId) {
          return {
            ...p,
            hasVoted: true,
            selectedOptionId: optionId,
            totalVotes: p.totalVotes + 1,
            options: p.options.map((opt) =>
              opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
            )
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-5">
      <div className="bg-[#F7F2FA]/90 backdrop-blur-xl sticky top-0 z-30 flex justify-between items-center py-3 border-b border-[#CAC4D0]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#9A3412] border border-[#FDBA74]/50">
            <span className="material-symbols-outlined text-2xl font-bold">how_to_vote</span>
          </div>
          <h1 className="font-bold text-xl text-[#1C1B1F]">सार्वजनिक मतदान</h1>
        </div>
        <span className="text-xs bg-[#FFEDD5] text-[#9A3412] px-3 py-1 rounded-full font-bold border border-[#FDBA74]/50">
          प्रभाग क्र. ४२
        </span>
      </div>

      {/* Official Leaders Banner */}
      <LeaderBanner />

      <section className="space-y-1">
        <h2 className="text-2xl font-bold text-[#1C1B1F]">नागरी निर्णय मतदान</h2>
        <p className="text-xs text-[#49454F]">तुमच्या परिसरातील विकासकामांबाबत थेट मत नोंदवा</p>
      </section>

      <div className="space-y-4">
        {activePolls.map((poll) => (
          <div
            key={poll.id}
            className="bg-white border border-[#CAC4D0] rounded-3xl p-5 space-y-4 shadow-xs"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A3412] bg-[#FFEDD5] px-3 py-1 rounded-full border border-[#FDBA74]/50">
                  {poll.categoryMr}
                </span>
                <span className="text-xs font-semibold text-[#49454F]">
                  एकूण मते: {poll.totalVotes}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#1C1B1F] pt-1">{poll.titleMr}</h3>
              <p className="text-xs text-[#49454F] leading-relaxed">{poll.descriptionMr}</p>
            </div>

            <div className="space-y-2 pt-1">
              {poll.options.map((option) => {
                const percent = Math.round((option.votes / (poll.totalVotes || 1)) * 100);
                const isSelected = poll.selectedOptionId === option.id;

                return (
                  <button
                    key={option.id}
                    disabled={poll.hasVoted}
                    onClick={() => handleOptionVote(poll.id, option.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all relative overflow-hidden ${
                      isSelected
                        ? 'border-[#EA580C] bg-[#FFEDD5]/60 ring-1 ring-[#EA580C] font-bold'
                        : 'border-[#CAC4D0] hover:border-[#EA580C] bg-[#F7F2FA]'
                    }`}
                  >
                    {poll.hasVoted && (
                      <div
                        className={`absolute left-0 top-0 bottom-0 ${
                          isSelected ? 'bg-[#FFEDD5]' : 'bg-[#E7E0EC]'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    )}

                    <div className="relative z-10 flex justify-between items-center">
                      <span className="text-xs text-[#1C1B1F] font-semibold flex items-center gap-2">
                        {isSelected && (
                          <span className="material-symbols-outlined text-base text-[#EA580C] fill">
                            check_circle
                          </span>
                        )}
                        {option.textMr}
                      </span>
                      {poll.hasVoted && (
                        <span className="text-xs font-extrabold text-[#9A3412]">{percent}%</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {poll.hasVoted && (
              <div className="text-[11px] text-[#9A3412] font-bold text-center pt-1 flex items-center justify-center gap-1 bg-[#FFEDD5] py-2 rounded-full border border-[#FDBA74]">
                <span className="material-symbols-outlined text-sm">verified</span>
                तुमचे मत यशस्वीरीत्या नोंदवले गेले आहे!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
