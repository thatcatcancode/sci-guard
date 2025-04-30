import sciGuardLogo from '../assets/sci-guard-logo.png'

function Header({ onUpload, showUpload }) {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#2A9D8F] py-3 px-6 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <img src={sciGuardLogo} alt="Sci-Guard Logo" className="h-14" />
          </a>
        </div>
        <nav className="flex items-center space-x-6">
          <a 
            href="/about" 
            className="text-white hover:text-gray-900 transition-colors"
          >
            About
          </a>
          {showUpload && (
            <button 
              onClick={onUpload}
              className="text-white hover:text-blue-400 transition-colors"
            >
              Upload
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header 