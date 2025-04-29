const ResultItem = ({ result, onRewrite }) => {
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
        <div className="flex items-center justify-between">
          <span>Original:</span>
          <button
            onClick={() => copyToClipboard(result.sentence)}
            className="text-gray-500 hover:text-gray-700"
            title="Copy to clipboard"
          >
            📋
          </button>
        </div>
        <textarea
          readOnly
          rows={3}
          className="font-mono p-1 rounded select-all cursor-pointer bg-gray-100 w-full text-gray-800"
          onClick={() => copyToClipboard(result.sentence)}
          value={result.sentence}
        >{{ __html: result.highlighted_sentence }}</textarea>
      </div>
      <div className="mt-2">
        {!result.suggestion ? (
          <button
            onClick={() => onRewrite(result)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Suggest rewrite ✨
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <span>Suggestion:</span>
              <button
                onClick={() => copyToClipboard(result.suggestion)}
                className="text-gray-500 hover:text-gray-700"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
            <textarea
              readOnly
              rows={3}
              className="font-mono p-1 rounded select-all cursor-pointer bg-gray-100 w-full text-gray-800"
              onClick={() => copyToClipboard(result.suggestion)}
              value={result.suggestion}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultItem 