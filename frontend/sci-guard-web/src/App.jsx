import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0]
    if (!uploadedFile) return

    // Check file type
    const allowedTypes = ['.txt', '.docx', '.pdf']
    const fileExtension = uploadedFile.name.toLowerCase().slice(uploadedFile.name.lastIndexOf('.'))
    if (!allowedTypes.includes(fileExtension)) {
      setError('Please upload a .txt, .docx, or .pdf file')
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
    } catch (err) {
      setError('Failed to analyze file: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Sci-Guard</h1>
        <p>Upload your grant proposal to check for banned words</p>
      </header>

      <main>
        {/* File Upload Section */}
        <div className="upload-section">
          <div 
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const file = e.dataTransfer.files[0]
              if (file) {
                handleFileUpload({ target: { files: [file] } })
              }
            }}
          >
            <input
              type="file"
              id="file-upload"
              accept=".txt,.docx,.pdf"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="upload-label">
              {loading ? (
                <div className="loading-spinner">Analyzing...</div>
              ) : (
                <>
                  <div className="upload-icon">📄</div>
                  <div>Drag and drop your file here or click to browse</div>
                  <div className="file-types">Supported: .txt, .docx, .pdf</div>
                </>
              )}
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Results Section */}
          {results && (
            <div className="results-section">
              <h2>Analysis Results</h2>
              {results.length === 0 ? (
                <p>No issues found in your paper! ✨</p>
              ) : (
                <div className="results-list">
                  {results.map((result, index) => (
                    <div key={index} className="result-item">
                      <div className="banned-word">
                        Found: <span className="highlight">{result.word}</span>
                        {result.banned !== result.word && (
                          <span className="subword"> (contains banned term: {result.banned})</span>
                        )}
                      </div>
                      <div className="context">
                        Original: <span className="sentence">{result.sentence}</span>
                      </div>
                      <div className="suggestion">
                        Suggestion: <span className="sentence">{result.suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
