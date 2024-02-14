import { useState } from "react"

import removeBackslash from "./utils/removeBackslash"
const App = () => {
  const [inputText, setInputText] = useState("")
  const [processedText, setProcessedText] = useState("")

  const handleTextChange = (event) => {
    setInputText(event.target.value)
  }

  const handleProcessText = () => {
    const processed = removeBackslash(inputText)
    setProcessedText(processed)
  }

  return (
    <div className="w-full h-screen">
      <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-auto">
        <div className="w-full mx-4 md:w-1/2 p-12 bg-white rounded-md shadow-md">
          <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">
            Text Processing | Remove "\" character
          </h1>
          <textarea
            className="w-full px-4 py-2 mb-4 h-64 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Paste your text here..."
            value={inputText}
            onChange={handleTextChange}
          />
          <button
            className="w-full bg-blue-500 text-gray-100 font-semibold textl-lg px-4 py-2 rounded-md hover:bg-blue-600 focus:bg-blue-700"
            onClick={handleProcessText}
          >
            Process Text
          </button>
          {processedText && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Processed Text</h2>
              <textarea
                className="w-full h-64 px-4 py-2 mb-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                value={processedText}
                readOnly
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
