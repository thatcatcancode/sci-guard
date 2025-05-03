import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import FileUpload from './components/FileUpload'
import ResultsSection from './components/ResultsSection'
import Header from './components/Header'
import About from './pages/About'
import HowItWorks from './components/HowItWorks'

const API_URL = import.meta.env.VITE_API_URL || '/api';

function App() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [summary, setSummary] = useState(null)
  const [rewritingId, setRewritingId] = useState(null)

  const handleUpload = () => {
    setResults(null)
    setSummary(null)
    setError(null)
  }

  const handleFileUpload = async (uploadedFile, uploadError) => {
    if (uploadError) {
      setError(uploadError)
      return
    }

    setError(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const response = await fetch(`${API_URL}/paper/analyze`, {
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
    setRewritingId(result.id)
    try {
      const response = await fetch(`${API_URL}/sentence/rewrite`, {
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
    } finally {
      setRewritingId(null)
    }
  }

  return (
    <Router>
      <div className="container">
        <Header onUpload={handleUpload} showUpload={!!results} />
        <div className={`transition-all duration-500 mt-20`}>
          <main>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={
                <>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                      <p className="mt-4 text-gray-600">Analyzing your document...</p>
                    </div>
                  ) : (
                    <>
                      {!results && (
                        <>
                          <HowItWorks />
                          <FileUpload
                            onFileUpload={handleFileUpload}
                            loading={loading}
                            error={error}
                          />
                        </>
                      )}
                      {results && (
                        <ResultsSection
                          results={results}
                          summary={summary}
                          onRewrite={handleSingleWrite}
                          rewritingId={rewritingId}
                        />
                      )}
                    </>
                  )}
                </>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
