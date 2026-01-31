import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import './index.css'

import Header from './components/Header'
import Footer from './components/Footer'
import CharacterInput from './components/CharacterInput'
import ModeSelector from './components/ModeSelector'
import EmptyLineOptions from './components/EmptyLineOptions'
import TextPanel from './components/TextPanel'
import { removeCharacters } from './utils/removeCharacters'
import { removeEmptyLines } from './utils/removeEmptyLines'
import useTheme from './hooks/useTheme'

const App = () => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [characters, setCharacters] = useState(['\\'])
  const [mode, setMode] = useState('individual')
  const [removedCount, setRemovedCount] = useState(0)

  // Empty line options
  const [emptyLineEnabled, setEmptyLineEnabled] = useState(false)
  const [emptyLineMode, setEmptyLineMode] = useState('collapse')
  const [linesRemoved, setLinesRemoved] = useState(0)

  // Process text whenever input, characters, mode, or empty line options change
  useEffect(() => {
    let processedText = inputText
    let charRemovedCount = 0
    let lineRemovedCount = 0

    // Step 1: Remove characters if any selected
    if (inputText && characters.length > 0) {
      const { result, removedCount: count } = removeCharacters(
        processedText,
        characters,
        mode === 'consecutive'
      )
      processedText = result
      charRemovedCount = count
    }

    // Step 2: Remove empty lines if enabled
    if (processedText && emptyLineEnabled) {
      const { result, removedCount: count } = removeEmptyLines(
        processedText,
        emptyLineMode
      )
      processedText = result
      lineRemovedCount = count
    }

    setOutputText(processedText)
    setRemovedCount(charRemovedCount)
    setLinesRemoved(lineRemovedCount)
  }, [inputText, characters, mode, emptyLineEnabled, emptyLineMode])

  const handleAddCharacter = (char) => {
    if (!characters.includes(char)) {
      setCharacters([...characters, char])
    }
  }

  const handleRemoveCharacter = (char) => {
    setCharacters(characters.filter(c => c !== char))
  }

  const handleClearInput = () => {
    setInputText('')
    setOutputText('')
    setRemovedCount(0)
    setLinesRemoved(0)
  }

  return (
    <>
      <div className="animated-bg" />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1
      }}>
        <Header theme={theme} toggleTheme={toggleTheme} />

        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '900px',
              padding: '40px'
            }}
          >
            <CharacterInput
              characters={characters}
              onAdd={handleAddCharacter}
              onRemove={handleRemoveCharacter}
            />

            <ModeSelector mode={mode} onChange={setMode} />

            <EmptyLineOptions
              enabled={emptyLineEnabled}
              onToggle={() => setEmptyLineEnabled(!emptyLineEnabled)}
              mode={emptyLineMode}
              onModeChange={setEmptyLineMode}
            />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              <TextPanel
                label={t('main.inputLabel')}
                placeholder={t('main.inputPlaceholder')}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                showClear
                onClear={handleClearInput}
              />

              <TextPanel
                label={t('main.outputLabel')}
                placeholder={t('main.outputPlaceholder')}
                value={outputText}
                readOnly
                showCopy
              />
            </div>

            {(removedCount > 0 || linesRemoved > 0) && (
              <div className="stats">
                {removedCount > 0 && (
                  <div className="stat-item">
                    <span className="stat-value">{removedCount}</span>
                    <span>{t('stats.characters')} {t('stats.removed')}</span>
                  </div>
                )}
                {linesRemoved > 0 && (
                  <div className="stat-item">
                    <span className="stat-value">{linesRemoved}</span>
                    <span>{t('emptyLines.linesRemoved')}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
