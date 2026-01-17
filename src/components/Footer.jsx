import { useTranslation } from 'react-i18next'

const Footer = () => {
    const { t } = useTranslation()

    return (
        <footer className="footer">
            <p>
                {t('footer.madeWith')} <span className="heart">❤️</span> {t('footer.by')}{' '}
                <a
                    href="https://berkemaktav.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    berkemaktav.com
                </a>
            </p>
        </footer>
    )
}

export default Footer
