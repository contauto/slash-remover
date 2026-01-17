import { useTranslation } from 'react-i18next'

const ModeSelector = ({ mode, onChange }) => {
    const { t } = useTranslation()

    return (
        <div style={{ marginBottom: '24px' }}>
            <label className="label">{t('mode.title')}</label>

            <div className="mode-toggle">
                <button
                    className={`mode-option ${mode === 'consecutive' ? 'active' : ''}`}
                    onClick={() => onChange('consecutive')}
                >
                    <div style={{ fontWeight: 600 }}>{t('mode.consecutive')}</div>
                    <div style={{
                        fontSize: '12px',
                        opacity: 0.8,
                        marginTop: '4px',
                        fontWeight: 400
                    }}>
                        {t('mode.consecutiveDesc')}
                    </div>
                </button>

                <button
                    className={`mode-option ${mode === 'individual' ? 'active' : ''}`}
                    onClick={() => onChange('individual')}
                >
                    <div style={{ fontWeight: 600 }}>{t('mode.individual')}</div>
                    <div style={{
                        fontSize: '12px',
                        opacity: 0.8,
                        marginTop: '4px',
                        fontWeight: 400
                    }}>
                        {t('mode.individualDesc')}
                    </div>
                </button>
            </div>
        </div>
    )
}

export default ModeSelector
