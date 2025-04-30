const ResultItem = ({ result, onRewrite, isRewriting }) => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here if you want
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="font-semibold mb-2">
        Found: <span className="text-red-500">{result.word}</span>
        {result.banned_word !== result.word && (
          <span className="text-sm text-gray-500"> (contains banned term: {result.banned_word})</span>
        )}
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span>Original:</span>
          <button
            onClick={() => copyToClipboard(result.sentence)}
            className="flex items-center gap-0.5 !text-xs text-gray-600 hover:text-gray-800"
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy
          </button>
        </div>
        {result.highlighted_sentence ? (
          <div
            className="font-mono p-2 rounded select-all cursor-pointer w-full text-gray-300"
            dangerouslySetInnerHTML={{ __html: result.highlighted_sentence }}
          />
        ) : (
          <div
            className="font-mono p-2 rounded select-all cursor-pointer bg-gray-100 w-full text-gray-800"
            onClick={() => copyToClipboard(result.sentence)}
          >
            {result.sentence}
          </div>
        )}
      </div>
      <div className="mt-2">
        {!result.suggestion ? (
          <button
            onClick={() => onRewrite(result)}
            disabled={isRewriting}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            {isRewriting ? 'Rewriting...' : 'Rewrite sentence'}
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span>Suggestion:</span>
              <button
                onClick={() => copyToClipboard(result.suggestion)}
                className="flex items-center gap-0.5 !text-xs text-gray-600 hover:text-gray-800"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </button>
            </div>
            <textarea
              readOnly
              rows={3}
              className="font-mono p-1 rounded select-all cursor-pointer bg-gray-100 w-full text-gray-800"
              value={result.suggestion}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultItem 