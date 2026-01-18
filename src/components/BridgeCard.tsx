import { ExternalLink, Zap } from 'lucide-react';

export default function BridgeCard() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 border-2 border-cyan-400/30 rounded-xl p-8 shadow-xl shadow-cyan-500/10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">
              Your content is fixed. But is your <span className="text-cyan-400">Technical Infrastructure</span> blocking AI?
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Schema markup, crawlability, semantic HTML, and entity mapping are just as critical as your content. Get a comprehensive technical audit of your entire business presence.
            </p>
            <a
              href="https://becomefoundbyai.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-blue-950 font-bold rounded-lg hover:from-cyan-300 hover:to-blue-300 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
            >
              Run Full Business Audit (Free)
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
