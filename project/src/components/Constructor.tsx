import { useState } from 'react';
import { Copy, Check, Wand2, FileText, MessageSquare } from 'lucide-react';
import BridgeCard from './BridgeCard';

export default function Constructor() {
  const [activeSubTab, setActiveSubTab] = useState<'rewrite' | 'faq'>('rewrite');
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [rewriteInputs, setRewriteInputs] = useState({
    topic: '',
    stat: '',
    source: '',
    insight: '',
  });
  const [generatedContent, setGeneratedContent] = useState('');

  const generateFAQPrompt = (pageUrl: string) => {
    return `Act as a Semantic SEO Expert. Crawl ${pageUrl}. Identify the top 6 'People Also Ask' questions for this entity. Write the answers using 'Answer Engine Optimization' formatting (Direct answer first, then context). Output the final result as JSON-LD Schema Code.`;
  };

  const handleCopyPrompt = () => {
    if (!url.trim()) return;

    const prompt = generateFAQPrompt(url);
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateRewrite = () => {
    const { topic, stat, source, insight } = rewriteInputs;

    if (!topic || !stat || !source) return;

    const content = `${topic}: The Data Story

According to ${source}, ${stat}. This data reveals ${insight || 'significant implications for businesses in this space'}.

What This Means:
The research indicates a clear trend that organizations need to understand. These findings suggest that ${topic.toLowerCase()} is becoming increasingly critical for competitive advantage.

Key Takeaway:
With ${stat}, business leaders should prioritize strategies that address this growing opportunity.`;

    setGeneratedContent(content);
  };

  const handleCopyGenerated = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 border-b border-slate-700">
        <button
          onClick={() => setActiveSubTab('rewrite')}
          className={`pb-4 px-4 font-semibold transition-colors relative ${
            activeSubTab === 'rewrite'
              ? 'text-emerald-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Rewrite Templates
          </div>
          {activeSubTab === 'rewrite' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('faq')}
          className={`pb-4 px-4 font-semibold transition-colors relative ${
            activeSubTab === 'faq'
              ? 'text-emerald-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            FAQ Architect
          </div>
          {activeSubTab === 'faq' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
          )}
        </button>
      </div>

      {activeSubTab === 'rewrite' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-6">
              <Wand2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Citation-Ready Content Builder</h3>
                <p className="text-slate-400">Fill in the blanks to create content optimized for AI search engines.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Topic
                </label>
                <input
                  type="text"
                  value={rewriteInputs.topic}
                  onChange={(e) => setRewriteInputs({ ...rewriteInputs, topic: e.target.value })}
                  placeholder="e.g., AI Adoption in Small Business"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Statistic or Data Point
                </label>
                <input
                  type="text"
                  value={rewriteInputs.stat}
                  onChange={(e) => setRewriteInputs({ ...rewriteInputs, stat: e.target.value })}
                  placeholder="e.g., 73% of small businesses plan to implement AI by 2025"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Source or Authority
                </label>
                <input
                  type="text"
                  value={rewriteInputs.source}
                  onChange={(e) => setRewriteInputs({ ...rewriteInputs, source: e.target.value })}
                  placeholder="e.g., McKinsey & Company, Gartner Research"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Insight (Optional)
                </label>
                <input
                  type="text"
                  value={rewriteInputs.insight}
                  onChange={(e) => setRewriteInputs({ ...rewriteInputs, insight: e.target.value })}
                  placeholder="e.g., why this matters for your industry"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleGenerateRewrite}
                disabled={!rewriteInputs.topic || !rewriteInputs.stat || !rewriteInputs.source}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Wand2 className="w-5 h-5" />
                Generate Citation-Ready Content
              </button>
            </div>
          </div>

          {generatedContent && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Your Optimized Content</h4>
                <button
                  onClick={handleCopyGenerated}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-slate-900 border border-slate-600 rounded-lg p-6">
                <pre className="text-slate-300 whitespace-pre-wrap font-sans">{generatedContent}</pre>
              </div>
            </div>
          )}

          <BridgeCard />
        </div>
      )}

      {activeSubTab === 'faq' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered FAQ Generator</h3>
                <p className="text-slate-400">Generate an optimized prompt to create schema-ready FAQ content for your page.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Enter Your Page URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourdomain.com/your-page"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleCopyPrompt}
                disabled={!url.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Prompt Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Prompt to Clipboard
                  </>
                )}
              </button>
            </div>
          </div>

          {url && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 animate-fadeIn">
              <h4 className="text-lg font-semibold text-emerald-400 mb-3">Generated Prompt</h4>
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                <p className="text-slate-300 leading-relaxed">{generateFAQPrompt(url)}</p>
              </div>
              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400">
                  <strong className="text-emerald-400">Next Step:</strong> Copy this prompt and paste it into ChatGPT, Claude, or any AI assistant to generate schema-ready FAQ content for your page.
                </p>
              </div>
            </div>
          )}

          <BridgeCard />
        </div>
      )}
    </div>
  );
}
