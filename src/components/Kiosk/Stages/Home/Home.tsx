import { useTranslation } from 'next-i18next'
import { useContext, useState } from 'react'

import { KioskContext } from '../../../../contexts/KioskContext'
import { useLanguage } from '../../../../hooks/useLanguage'
import { useGreeting } from '../../../../utils/language'
import { KioskButton } from '../../../Button/variants'
import { LanguageSelector } from './atoms/LanguageSelector'

export const Home = () => {
  const { greeting } = useGreeting()
  const { t } = useTranslation()
  const { goToNextStage } = useContext(KioskContext)
  const { language, changeLanguage } = useLanguage()
  const [selectedLanguage, setSelectedLangauge] = useState<string>(language)

  const onSelectLanguage = (newLanguage: string) => {
    if (newLanguage === selectedLanguage) {
      setSelectedLangauge('')
    } else {
      setSelectedLangauge(newLanguage)
      changeLanguage(newLanguage)
    }
  }

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        <h1 className="text-slate-800 text-5xl">{greeting}</h1>
        <p className="text-slate-600 text-3xl pt-2">{t('start_message')}</p>
        <div className="mt-12">
          <LanguageSelector
            onSelectLanguage={onSelectLanguage}
            selectedLanguage={selectedLanguage}
          />
        </div>
      </div>
      <div className="">
        <KioskButton
          label={t('welcome_stage_cta')}
          onClick={() => goToNextStage()}
          color="blue"
          disabled={selectedLanguage === '' ? true : false}
        />
      </div>
    </div>
  )
}
