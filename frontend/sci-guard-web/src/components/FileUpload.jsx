import { useState } from 'react'

const FileUpload = ({ onFileUpload, loading, error }) => {
  const [file, setFile] = useState(null)

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
    setFile(uploadedFile)
  }

  if (!!file) {
    return (
      <div className="mb-8 flex items-center justify-between">
        <label className="text-gray-100">File: {file.name}</label>
        <button
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => setFile(null)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload
        </button>
        {error && (
          <div className="text-red-500 mt-2">
            {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mb-8 mt-8">
      <h2 className="text-2xl text-center mb-4 text-gray-100">Step 1: Upload your grant proposal</h2>

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors w-full h-64 flex items-center justify-center"
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
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          {loading ? (
            <div className="text-blue-500">Analyzing...</div>
          ) : (
            <>
              <div className="text-4xl mb-2">📄</div>
              <div>Drag and drop your file here or click to browse</div>
              <div className="text-sm text-gray-500 mt-2">Supported: .txt, .docx, .pdf</div>
            </>
          )}
        </label>
      </div>

      {error && (
        <div className="text-red-500 mt-2">
          {error}
        </div>
      )}
    </div>
  )
}

export default FileUpload 