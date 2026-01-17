import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const TextPanel = ({
    label,
    placeholder,
    value,
    onChange,
    readOnly = false,
    showCopy = false,
    showClear = false,
    onClear
}) => {
    const { t } = useTranslation()
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (value) {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="text-panel">
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
            }}>
                <label className="label" style={{ margin: 0 }}>{label}</label>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{
                        fontSize: '12px',
                        color: 'var(--text-tertiary)'
                    }}>
                        {value.length} {t('stats.characters')}
                    </span>

                    {showClear && value && (
                        <button
                            className="btn-secondary"
                            onClick={onClear}
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                            {t('main.clearButton')}
                        </button>
                    )}

                    {showCopy && value && (
                        <button
                            className={`btn-secondary ${copied ? 'copy-success' : ''}`}
                            onClick={handleCopy}
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                            {copied ? t('main.copied') : t('main.copyButton')}
                        </button>
                    )}
                </div>
            </div>

            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                style={{
                    cursor: readOnly ? 'default' : 'text'
                }}
            />
        </div>
    )
}

export default TextPanel
