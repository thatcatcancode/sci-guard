import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Scientist uploads document',
      description: 'Drag and drop or select files to upload. PDF, DOCX, and TXT formats supported.',
    },
    {
      title: 'Sci-Guard analyzes doc',
      description: 'Scans document and generates a report of flagged sentences.',
    },
    {
      title: 'Rewrite sentences using AI ✨',
      description: 'Scientist chooses which sentences to rephrase using AI.',
    },
  ];

  return (
    <section className="py-12 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-[#9ffadc]">How It Works</h2>
        <p className="mt-4 text-lg text-gray-300">
          A three-step process to review your document.
        </p>
      </div>

      <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center bg-[#242424] p-6 rounded-2xl shadow-md">
            <CheckCircle className="w-12 h-12 text-[#9ffadc]" />
            <h3 className="mt-4 text-xl font-semibold text-[#9ffadc]">{step.title}</h3>
            <p className="mt-2 text-gray-300 text-center">{step.description}</p>
            <span className="mt-4 inline-block px-4 py-1 bg-[#2A9D8F] text-white rounded-full text-sm">
              Step {idx + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
