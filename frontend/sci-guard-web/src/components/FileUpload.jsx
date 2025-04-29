import { useState } from 'react'

const FileUpload = ({ onFileUpload, loading, error }) => {
  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0]
    if (!uploadedFile) return

    // Check file type
    const allowedTypes = ['.txt', '.docx', '.pdf']
    const fileExtension = uploadedFile.name.toLowerCase().slice(uploadedFile.name.lastIndexOf('.'))
    if (!allowedTypes.includes(fileExtension)) {
      onFileUpload(null, 'Please upload a .txt, .docx, or .pdf file')
      return
    }

    onFileUpload(uploadedFile, null)
  }

  return (
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

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  )
}

export default FileUpload 