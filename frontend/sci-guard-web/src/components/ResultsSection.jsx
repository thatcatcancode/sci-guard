import BannedWordsChart from './BannedWordsChart'
import ResultItem from './ResultItem'

const ResultsSection = ({ results, summary, onRewrite }) => {
  return (
    <div className="results-section">
      <h2>Analysis Results</h2>
      {results.length === 0 ? (
        <p>No issues found in your paper! ✨</p>
      ) : (
        <>
          {summary && <BannedWordsChart summary={summary} />}
          {summary && <div className="summary">Summary: <br /> {summary.summary}</div>}
          <div className="results-list">
            {results.map((result) => (
              <ResultItem
                key={result.id}
                result={result}
                onRewrite={onRewrite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ResultsSection 