import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';
import { analyzeContent, AnalysisResult } from '../utils/contentAnalysis';
import BridgeCard from './BridgeCard';

export default function Validator() {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const analysis = analyzeContent(content);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-rose-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return 'bg-emerald-500/10 border-emerald-500/30';
    if (score >= 40) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-rose-500/10 border-rose-500/30';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Work';
    return 'Poor';
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <label className="block text-lg font-semibold text-white mb-3">
          Paste Your Content Here
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your blog post, landing page copy, or any content you want to optimize for AI search engines like Perplexity, Google SGE, and ChatGPT..."
          className="w-full h-64 px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
        />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            {content.split(/\s+/).filter(w => w.length > 0).length} words
          </span>
          <button
            onClick={handleAnalyze}
            disabled={!content.trim() || isAnalyzing}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Scanning AI Visibility...
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                Check Score
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-6 animate-fadeIn">
          <div className={`bg-slate-800/50 backdrop-blur-sm border-2 rounded-xl p-8 ${getScoreBgColor(result.score)}`}>
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className={`text-7xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}
                </div>
                <div className="text-slate-400 text-sm mt-1">AI Visibility Score</div>
              </div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getScoreBgColor(result.score)}`}>
                <span className={getScoreColor(result.score)}>{getScoreLabel(result.score)}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="text-sm text-slate-400 mb-2">Data Density</div>
              <div className={`text-3xl font-bold ${getScoreColor(result.dataDensityScore)}`}>
                {Math.round(result.dataDensityScore)}%
              </div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                  style={{ width: `${result.dataDensityScore}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="text-sm text-slate-400 mb-2">Authority Signals</div>
              <div className={`text-3xl font-bold ${getScoreColor(result.authorityScore)}`}>
                {Math.round(result.authorityScore)}%
              </div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                  style={{ width: `${result.authorityScore}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="text-sm text-slate-400 mb-2">Readability</div>
              <div className={`text-3xl font-bold ${getScoreColor(result.readabilityScore)}`}>
                {Math.round(result.readabilityScore)}%
              </div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                  style={{ width: `${result.readabilityScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          {result.strengths.length > 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">What's Working</h3>
                  <ul className="space-y-2">
                    {result.strengths.map((strength, index) => (
                      <li key={index} className="text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {result.issues.length > 0 && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-rose-500 mb-3">Fix It Checklist</h3>
                  <ul className="space-y-2">
                    {result.issues.map((issue, index) => (
                      <li key={index} className="text-slate-300 flex items-start gap-2">
                        <span className="text-rose-500 mt-1">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <BridgeCard />
        </div>
      )}
    </div>
  );
}
