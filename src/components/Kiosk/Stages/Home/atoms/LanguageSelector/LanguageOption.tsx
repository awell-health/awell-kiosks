import {
  getLanguageIcon,
  getLanguageLabel,
} from '../../../../../../utils/language'

interface LanguageOptionProps {
  language: string
  onSelectLanguage: (newLangauge: string) => void
  selectedLanguage: string
}

export const LanguageOption = ({
  language,
  onSelectLanguage,
  selectedLanguage,
}: LanguageOptionProps) => {
  const icon = getLanguageIcon(language)
  const languageLabel = getLanguageLabel(language)

  return (
    <a
      href=""
      title={languageLabel}
      className={`grid items-center grid-flow-col p-4 rounded-2xl group hover:bg-blue-600 cursor-pointer ${
        language === selectedLanguage
          ? 'bg-blue-600 text-white'
          : 'bg-slate-100'
      }`}
      onClick={(e) => {
        e.preventDefault()
        onSelectLanguage(language)
      }}
    >
      <div className="flex justify-center">
        <div className="text-2xl font-semibold text-center my-6">
          <div className="w-20 h-20 mx-auto">{icon}</div>
          <div className={`pt-8 group-hover:text-white`}>{languageLabel}</div>
        </div>
      </div>
    </a>
  )
}
