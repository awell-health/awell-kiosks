import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { type User } from '../../../../../../types/generated/api.types'
import { KioskButton } from '../../../../../Button/variants'
import { PatientConfirm } from './PatientConfirm'

interface SearchResultsProps {
  results: User[]
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  const { t } = useTranslation()
  const [selectedPatientId, setSelectedPatientId] = useState('')
  const [confirmPatientProfileStage, setConfirmPatientProfileStage] =
    useState(false)

  const onProfileSelect = (patientId: string) => {
    setSelectedPatientId(patientId)
  }

  const onSubmit = () => {
    setConfirmPatientProfileStage(true)
  }

  if (confirmPatientProfileStage) {
    return <PatientConfirm patientId={selectedPatientId} />
  }

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        <h1 className="text-slate-800 text-5xl">Is this you?</h1>
        <p className="text-slate-600 text-3xl pt-2">
          We found the following profiles, select the one that is you
        </p>
        <div className="my-12">
          <RadioGroup value={selectedPatientId} onChange={onProfileSelect}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-4">
              {results.map((result) => (
                <RadioGroup.Option
                  key={result.id}
                  value={result.id}
                  className={({ checked, active }) =>
                    clsx(
                      checked ? 'border-transparent' : 'border-gray-300',
                      active ? 'border-blue-500 ring-2 ring-blue-500' : '',
                      'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <span className="flex items-center">
                        <span className="text-sm flex flex-col">
                          <RadioGroup.Label
                            as="span"
                            className="font-medium text-2xl text-slate-900"
                          >
                            {result?.profile?.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className="text-slate-500 text-lg"
                          >
                            <span className="block sm:inline">
                              {result?.profile?.email || 'No email address'}
                            </span>
                          </RadioGroup.Description>
                        </span>
                      </span>
                      <RadioGroup.Description
                        as="span"
                        className="mt-2 flex text-sm sm:mt-0 sm:flex-col sm:ml-4 sm:text-right justify-center"
                      >
                        <span className="font-medium text-xl text-gray-900">
                          {result?.profile?.birth_date}
                        </span>
                      </RadioGroup.Description>
                      <span
                        className={clsx(
                          active ? 'border' : 'border-2',
                          checked ? 'border-blue-500' : 'border-transparent',
                          'absolute -inset-px rounded-lg pointer-events-none'
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="">
        <KioskButton
          label={t('confirm_cta')}
          onClick={() => onSubmit()}
          color="blue"
          disabled={selectedPatientId === '' ? true : false}
        />
      </div>
    </div>
  )
}
