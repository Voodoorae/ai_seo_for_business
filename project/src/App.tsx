import { useRef, useState } from 'react';
import { Target, Wrench } from 'lucide-react';
import Hero from './components/Hero';
import Validator from './components/Validator';
import Constructor from './components/Constructor';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<'validator' | 'constructor'>('validator');
  const toolRef = useRef<HTMLDivElement>(null);

  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero onStartAudit={scrollToTool} />

      <div ref={toolRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            AI Search Optimization <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Toolkit</span>
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto">
            Analyze your content and build citation-ready assets that AI search engines trust.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab('validator')}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 relative ${
                activeTab === 'validator'
                  ? 'bg-slate-800/50 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Target className="w-5 h-5" />
                <span className="hidden sm:inline">VALIDATOR</span>
                <span className="sm:hidden">Validate</span>
                <span className="text-xs px-2 py-1 bg-rose-500/20 text-rose-400 rounded-full">Find Problems</span>
              </div>
              {activeTab === 'validator' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('constructor')}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 relative ${
                activeTab === 'constructor'
                  ? 'bg-slate-800/50 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Wrench className="w-5 h-5" />
                <span className="hidden sm:inline">CONSTRUCTOR</span>
                <span className="sm:hidden">Build</span>
                <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">Get Solutions</span>
              </div>
              {activeTab === 'constructor' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
              )}
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'validator' ? <Validator /> : <Constructor />}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="text-emerald-400 font-bold text-lg mb-2">Step 1</div>
            <h3 className="text-white font-semibold mb-2">Validate Your Content</h3>
            <p className="text-slate-400 text-sm">Check your existing content's AI visibility score and identify optimization opportunities.</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="text-cyan-400 font-bold text-lg mb-2">Step 2</div>
            <h3 className="text-white font-semibold mb-2">Build Citation Assets</h3>
            <p className="text-slate-400 text-sm">Use our templates and tools to create content optimized for AI search engines.</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="text-purple-400 font-bold text-lg mb-2">Step 3</div>
            <h3 className="text-white font-semibold mb-2">Audit Your Infrastructure</h3>
            <p className="text-slate-400 text-sm">Ensure your technical foundation supports AI discoverability.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
