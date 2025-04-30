import sciGuardLogo from '../assets/sci-guard-logo.png'

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm py-3 px-6 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <img src={sciGuardLogo} alt="Sci-Guard Logo" className="h-14" />
          </a>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="/" className="text-white hover:text-blue-400 transition-colors">Home</a>
          <a href="/about" className="text-white hover:text-blue-400 transition-colors">About</a>
          <a href="/contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header 