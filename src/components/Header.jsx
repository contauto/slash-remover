import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../i18n'

const Header = ({ theme, toggleTheme }) => {
    const { t, i18n } = useTranslation()
    const currentLang = i18n.language

    return (
        <header className="header">
            <div className="logo">
                <div className="logo-icon">✨</div>
                <div className="logo-text">
                    <h1>{t('header.title')}</h1>
                    <p>{t('header.subtitle')}</p>
                </div>
            </div>

            <div className="header-controls">
                <div className="lang-switch">
                    <button
                        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                        onClick={() => changeLanguage('en')}
                    >
                        EN
                    </button>
                    <button
                        className={`lang-btn ${currentLang === 'tr' ? 'active' : ''}`}
                        onClick={() => changeLanguage('tr')}
                    >
                        TR
                    </button>
                </div>

                <button
                    className="btn-icon"
                    onClick={toggleTheme}
                    title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    )
}

export default Header
