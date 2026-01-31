import { useTranslation } from 'react-i18next'

const EmptyLineOptions = ({ enabled, onToggle, mode, onModeChange }) => {
    const { t } = useTranslation()

    return (
        <div style={{ marginBottom: '24px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
            }}>
                <label className="label" style={{ margin: 0 }}>{t('emptyLines.title')}</label>

                <button
                    className={`btn-secondary ${enabled ? 'active' : ''}`}
                    onClick={onToggle}
                    style={{
                        background: enabled ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
                        color: enabled ? 'white' : 'var(--text-secondary)',
                        border: enabled ? 'none' : '1px solid var(--border-primary)'
                    }}
                >
                    {enabled ? t('emptyLines.enabled') : t('emptyLines.disabled')}
                </button>
            </div>

            {enabled && (
                <div className="mode-toggle" style={{ marginTop: '12px' }}>
                    <button
                        className={`mode-option ${mode === 'all' ? 'active' : ''}`}
                        onClick={() => onModeChange('all')}
                    >
                        <div style={{ fontWeight: 600 }}>{t('emptyLines.modeAll')}</div>
                        <div style={{
                            fontSize: '12px',
                            opacity: 0.8,
                            marginTop: '4px',
                            fontWeight: 400
                        }}>
                            {t('emptyLines.modeAllDesc')}
                        </div>
                    </button>

                    <button
                        className={`mode-option ${mode === 'collapse' ? 'active' : ''}`}
                        onClick={() => onModeChange('collapse')}
                    >
                        <div style={{ fontWeight: 600 }}>{t('emptyLines.modeCollapse')}</div>
                        <div style={{
                            fontSize: '12px',
                            opacity: 0.8,
                            marginTop: '4px',
                            fontWeight: 400
                        }}>
                            {t('emptyLines.modeCollapseDesc')}
                        </div>
                    </button>
                </div>
            )}
        </div>
    )
}

export default EmptyLineOptions
