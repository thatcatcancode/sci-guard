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
          className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
          onClick={() => setFile(null)}
        >
          Upload another file
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
    <div className="mb-8">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
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