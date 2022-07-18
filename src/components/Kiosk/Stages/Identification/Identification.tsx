import { useLazyQuery } from '@apollo/client'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { SEARCH_BY_NATIONAL_REGISTRY_NUMBER } from '../../../../hooks/awell-orchestration/useSearchByNationalRegistryNumber/graphql/searchByNationalRegistryNumber.graphql'
import { KioskButton } from '../../../Button/variants'
import { Loading } from '../../../Loading'
import { PatientDoesExistFlow } from './PatientDoesExistFlow'
import { PatientDoesntExistFlow } from './PatientDoesntExistFlow'

export const Identification = () => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')
  const [searchByNationalRegistryNumber, { loading, data, called }] =
    useLazyQuery(SEARCH_BY_NATIONAL_REGISTRY_NUMBER)

  const searchPatient = () => {
    searchByNationalRegistryNumber({
      variables: { national_registry_number: inputValue },
    })
  }

  if (loading) {
    return <Loading />
  }

  if (called && !loading) {
    const results = data?.searchPatientsByNationalRegistryNumber?.patients || []
    if (results.length === 0) {
      return <PatientDoesntExistFlow />
    }

    return <PatientDoesExistFlow results={results} />
  }

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        <h1 className="text-slate-800 text-5xl">
          {t('identification_heading')}
        </h1>
        <p className="text-slate-600 text-3xl pt-2">
          Enter your details below so we can find out who you are
        </p>
        <div className="my-4">
          <input
            className="py-4 px-8 text-slate-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-3xl border border-gray-300 rounded-md"
            value={inputValue}
            type="number"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
      <div className="">
        <KioskButton
          label={t('next_cta')}
          onClick={() => searchPatient()}
          color="blue"
          disabled={inputValue === '' ? true : false}
        />
      </div>
    </div>
  )
}
