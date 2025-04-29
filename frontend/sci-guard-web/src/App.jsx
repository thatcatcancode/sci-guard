import { useState } from 'react'
import './App.css'
import FileUpload from './components/FileUpload'
import ResultsSection from './components/ResultsSection'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [summary, setSummary] = useState(null)

  const handleFileUpload = async (uploadedFile, uploadError) => {
    if (uploadError) {
      setError(uploadError)
      return
    }

    setFile(uploadedFile)
    setError(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const response = await fetch('/api/analyze-paper', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setResults(data.results)
      setSummary(data.summary)
    } catch (err) {
      setError('Failed to analyze file: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSingleWrite = async (result) => {
    const response = await fetch('/api/sentence/rewrite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    })
    const data = await response.json()
    setResults(prevResults =>
      prevResults.map(prevResult => {
        return {
          ...prevResult,
          suggestion: prevResult.id === data.id ? data.suggestion : prevResult.suggestion
        }
      })
    )
  }

  return (
    <div className="container">
      <header>
        <h1>Sci-Guard</h1>
        <p>Upload your grant proposal to check for banned words</p>
      </header>

      <main>
        <FileUpload
          onFileUpload={handleFileUpload}
          loading={loading}
          error={error}
        />
        {results && (
          <ResultsSection
            results={results}
            summary={summary}
            onRewrite={handleSingleWrite}
          />
        )}
      </main>
    </div>
  )
}

export default App
