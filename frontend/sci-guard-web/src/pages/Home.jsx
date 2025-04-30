function Home() {
    return (
        <>
            {!results && !loading && (
                <img
                    src={sciGuardLogo}
                    alt="Sci-Guard Logo"
                    className={`w-1/2 mx-auto block transition-all duration-500 ${results ? 'w-0 opacity-0' : 'opacity-100'}`}
                />
            )}
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-600">Analyzing your document...</p>
                </div>
            ) : (
                <>
                    {!results && (
                        <FileUpload
                            onFileUpload={handleFileUpload}
                            loading={loading}
                            error={error}
                        />
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
    )
}