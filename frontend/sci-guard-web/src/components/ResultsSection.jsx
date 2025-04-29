import BannedWordsChart from './BannedWordsChart'
import ResultItem from './ResultItem'

const ResultsSection = ({ results, summary, onRewrite }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Grant Proposal Analysis</h2>
      {results.length === 0 ? (
        <p>No issues found in your paper! ✨</p>
      ) : (
        <>
          {summary && <BannedWordsChart summary={summary} />}
          {summary && (
            <div className="p-4 rounded-lg mb-4">
              Hot take: <br /> {summary.summary}
            </div>
          )}
          <div>
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