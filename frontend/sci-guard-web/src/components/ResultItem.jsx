const ResultItem = ({ result, onRewrite }) => {
  return (
    <div className="result-item">
      <div className="banned-word">
        Found: <span className="highlight">{result.word}</span>
        {result.banned_word !== result.word && (
          <span className="subword"> (contains banned term: {result.banned_word})</span>
        )}
      </div>
      <div className="context">
        Original: <span className="sentence" dangerouslySetInnerHTML={{ __html: result.highlighted_sentence }} />
      </div>
      <div className="suggestion">
        {!result.suggestion ? (
          <button onClick={() => onRewrite(result)}>Suggest rewrite ✨</button>
        ) : (
          <>Suggestion: <span className="sentence">{result.suggestion}</span></>
        )}
      </div>
    </div>
  )
}

export default ResultItem 