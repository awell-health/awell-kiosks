import { LanguageOption } from './LanguageOption'

interface LanguageSelectorProps {
  onSelectLanguage: (newLangauge: string) => void
  selectedLanguage: string
}

export const LanguageSelector = ({
  onSelectLanguage,
  selectedLanguage,
}: LanguageSelectorProps) => {
  return (
    <>
      <div className="grid gap-8 mx-auto grid-cols-3">
        <LanguageOption
          language="en"
          onSelectLanguage={onSelectLanguage}
          selectedLanguage={selectedLanguage}
        />
        <LanguageOption
          language="fr"
          onSelectLanguage={onSelectLanguage}
          selectedLanguage={selectedLanguage}
        />
        <LanguageOption
          language="nl"
          onSelectLanguage={onSelectLanguage}
          selectedLanguage={selectedLanguage}
        />
      </div>
    </>
  )
}
