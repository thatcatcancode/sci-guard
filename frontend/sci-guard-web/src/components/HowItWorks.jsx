import React from 'react';
import { Upload, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload your grant proposal',
      description: 'Simply drag & drop or click to upload your research paper in PDF, DOCX, or TXT formats supported.',
      highlight: 'Secure & Private',
    },
    {
      icon: Search,
      title: 'Smart Analysis',
      description: 'Sci-Guard scans your document and identifies potentially problematic language.',
      highlight: 'Summarized Report',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Rewrites',
      description: 'Get intelligent suggestions to rephrase flagged sentences while preserving meaning.',
      highlight: 'Context-Aware',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#1a1a1a] to-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#9ffadc] to-[#2A9D8F]">
          How Sci-Guard Works
        </h2>
        <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
          Safeguard your research with this three-step process
        </p>
      </div>

      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={idx} 
              className="group relative flex flex-col items-center bg-[#242424] p-8 rounded-3xl shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:bg-[#2a2a2a] border border-gray-800"
            >
              <div className="absolute -top-4 left-4 px-3 py-1 bg-[#2A9D8F] text-white text-sm font-medium rounded-full">
                Step {idx + 1}
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-[#9ffadc] opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-opacity"></div>
                <Icon className="w-16 h-16 text-[#9ffadc] relative z-10 transition-transform group-hover:scale-110" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#9ffadc]">
                {step.title}
              </h3>
              
              <p className="mt-4 text-gray-300 text-center leading-relaxed">
                {step.description}
              </p>
              
              <div className="mt-6 px-4 py-2 bg-[#1a1a1a] rounded-full text-sm text-[#9ffadc] font-medium">
                {step.highlight}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-400 text-sm inline-flex items-center gap-2">
          Your documents are processed securely and never stored on our servers
          <Link 
            to="/about#privacy"
            className="text-[#9ffadc] hover:text-[#2A9D8F] transition-colors text-sm inline-flex items-center"
          >
            more info →
          </Link>
        </p>
      </div>
    </section>
  );
}
