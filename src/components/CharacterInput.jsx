import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CharacterInput = ({ characters, onAdd, onRemove }) => {
    const { t } = useTranslation()
    const [inputValue, setInputValue] = useState('')

    const presets = [
        { char: '\\', label: t('characters.backslash'), display: '\\' },
        { char: "'", label: t('characters.quote'), display: "'" },
        { char: '"', label: t('characters.doubleQuote'), display: '"' },
        { char: '\n', label: t('characters.newline'), display: '\\n' },
        { char: '\t', label: t('characters.tab'), display: '\\t' },
    ]

    const handleAdd = () => {
        if (inputValue && !characters.includes(inputValue)) {
            onAdd(inputValue)
            setInputValue('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAdd()
        }
    }

    const getDisplayChar = (char) => {
        if (char === '\n') return '\\n'
        if (char === '\t') return '\\t'
        if (char === ' ') return '␣'
        return char
    }

    return (
        <div style={{ marginBottom: '24px' }}>
            <label className="label">{t('characters.title')}</label>

            {/* Character chips */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '16px',
                minHeight: '40px'
            }}>
                {characters.map((char, index) => (
                    <span key={index} className="character-chip">
                        <span className="char-display">{getDisplayChar(char)}</span>
                        <button onClick={() => onRemove(char)}>×</button>
                    </span>
                ))}
                {characters.length === 0 && (
                    <span style={{
                        color: 'var(--text-tertiary)',
                        fontSize: '14px',
                        fontStyle: 'italic'
                    }}>
                        {t('characters.placeholder')}
                    </span>
                )}
            </div>

            {/* Input and add button */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input
                    type="text"
                    className="input"
                    placeholder={t('characters.placeholder')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={10}
                    style={{ flex: 1 }}
                />
                <button
                    className="btn-secondary"
                    onClick={handleAdd}
                    disabled={!inputValue}
                >
                    {t('characters.addButton')}
                </button>
            </div>

            {/* Preset buttons */}
            <div>
                <span style={{
                    fontSize: '13px',
                    color: 'var(--text-tertiary)',
                    marginRight: '12px'
                }}>
                    {t('characters.presets')}
                </span>
                <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '8px' }}>
                    {presets.map((preset) => (
                        <button
                            key={preset.char}
                            className="preset-btn"
                            onClick={() => !characters.includes(preset.char) && onAdd(preset.char)}
                            disabled={characters.includes(preset.char)}
                            style={{
                                opacity: characters.includes(preset.char) ? 0.5 : 1,
                                cursor: characters.includes(preset.char) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <span className="char-display">{preset.display}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CharacterInput
