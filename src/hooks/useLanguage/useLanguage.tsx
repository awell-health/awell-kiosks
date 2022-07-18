import { useRouter } from 'next/router'
import { useContext } from 'react'

import { KioskContext } from '../../contexts/KioskContext'

interface UseLanguageHook {
  language: string
  changeLanguage: (newLanguage: string) => void
  isLanguageModalOpen: boolean
  toggleLanguageModal: () => void
}

export const useLanguage = (): UseLanguageHook => {
  const router = useRouter()
  const { isLanguageModalOpen, toggleLanguageModal } = useContext(KioskContext)

  /**
   * Uses native NextJS i18n support
   * https://nextjs.org/docs/advanced-features/i18n-routing
   */
  const handleLocaleChange = (newLocale: string) => {
    router.push(router.route, router.asPath, {
      locale: newLocale,
    })
  }

  return {
    language: router.locale || 'en',
    changeLanguage: handleLocaleChange,
    isLanguageModalOpen,
    toggleLanguageModal,
  }
}
