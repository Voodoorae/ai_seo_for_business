import { BookOpen, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">AI SEO Validator</h3>
            <p className="text-slate-400 leading-relaxed">
              Helping businesses optimize their content for the next generation of AI-powered search engines.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://medium.com/@aiseoforbusiness/the-metamorphosis-strategy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Metamorphosis Strategy
                </a>
              </li>
              <li>
                <a
                  href="#glossary"
                  className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Glossary
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">About</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Built for <strong className="text-emerald-400">aiseoforbusiness.com</strong> to empower business owners with AI-first optimization strategies.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI SEO Validator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
