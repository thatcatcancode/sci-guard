const ResultItem = ({ result, onRewrite }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="font-semibold mb-2">
        Found: <span className="text-red-500">{result.word}</span>
        {result.banned_word !== result.word && (
          <span className="text-sm text-gray-500"> (contains banned term: {result.banned_word})</span>
        )}
      </div>
      <div className="mb-2">
        Original: <span className="font-mono p-1 rounded" dangerouslySetInnerHTML={{ __html: result.highlighted_sentence }} />
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
          <>Suggestion: <span className="font-mono p-1 rounded">{result.suggestion}</span></>
        )}
      </div>
    </div>
  )
}

export default ResultItem 