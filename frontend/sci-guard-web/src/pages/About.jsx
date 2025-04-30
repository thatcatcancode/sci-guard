function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">About Sci-Guard</h1>

      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-xl font-semibold text-[#9ffadc] mb-3">Our Mission</h2>
          <p>
            Sci-Guard: Safeguarding science one word at a time. Our goals it protect scientific research from being mistakenly flagged and unfunded due to the governments effort to ban DEI-related research.          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#9ffadc] mb-3">Privacy & Data Security</h2>
          <p>
            We take your privacy and data security seriously. Here's how we handle your information:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>All uploaded documents are processed securely and confidentially</li>
            <li>We do not store your documents on our servers or in a database - they are scanned and held in short-term application memory</li>
            <li>Only you can see your document analysis on your browser and when you refresh your page that local memory goes away</li>
            <li>We use industry-standard encryption for all data transfers. This just means we use https and no one can "spy" on your requests to our api and steal your document.</li>
            <li>Only when you choose to "Rewrite sentence" will the given sentence be sent to OpenAI for rewriting. We do not send your document to OpenAI when you upload it.</li>
            <li>Here are OpenAI's own words on their privacy and data security practices <a href="https://openai.com/enterprise-privacy/" target="_blank" rel="noopener noreferrer">OpenAI Data Usage Policy</a></li>
            <li>We have opted out of OpenAI's usage of your data for training their models</li>
            <li>We do not use cookies to track your activity</li>
            <li>This is an opensource project so you can peek the code yourself: <a href="https://github.com/thatcatcancode/sci-guard" target="_blank" rel="noopener noreferrer">Sci-Guard GitHub Repo</a> 👀</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#9ffadc] mb-3">How It Works</h2>
          <p>
            A few simple steps to use Sci-Guard:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Scientist uploads research grant proposal (.txt, .docx, or .pdf).</li>
            <li>Sci-Guard scans the file for banned words, subwords and phrases.</li>
            <li>Returns a summarized report and a list of sentences with banned words.</li>
            <li>Scientist taps "Rewrites sentences" and the given sentence is sent to OpenAI for rewriting.</li>
            <li>Recursively rewrites sentences if the rewritten sentence, too, contains banned language.</li>
            <li>Scientist uses the copy functions to find and replace in their document on their computer.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default About 