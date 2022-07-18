import { useTranslation } from 'next-i18next'
import { useContext, useEffect, useState } from 'react'

import { KioskContext } from '../../../../../../contexts/KioskContext'
import { usePatient } from '../../../../../../hooks/awell-orchestration/usePatient'
import { KioskButton } from '../../../../../Button/variants'
import {
  Email,
  FirstName,
  LastName,
  NationalRegistryNumber,
} from './UpdatePatientFields'

interface PatientConfirmProps {
  patientId: string
}

export const PatientConfirm = ({ patientId }: PatientConfirmProps) => {
  const [isUpdatingField, setIsUpdatingField] = useState<string | null>(null)

  const { t } = useTranslation()
  const { patient, loading } = usePatient(patientId)
  const {
    setPatient,
    patient: patientState,
    goToNextStage,
  } = useContext(KioskContext)

  const onFieldUpdated = () => {
    setIsUpdatingField(null)
  }

  useEffect(() => {
    if (!loading) {
      setPatient(patient)
    }
  }, [loading])

  if (loading) {
    return <p>Fetching patient</p>
  }

  if (isUpdatingField) {
    if (isUpdatingField === 'first_name') {
      return (
        <FirstName
          patientId={patientState?.id || ''}
          onFieldUpdated={onFieldUpdated}
          currentValue={patientState?.profile?.first_name || ''}
        />
      )
    }
    if (isUpdatingField === 'last_name') {
      return (
        <LastName
          patientId={patientState?.id || ''}
          onFieldUpdated={onFieldUpdated}
          currentValue={patientState?.profile?.last_name || ''}
        />
      )
    }
    if (isUpdatingField === 'email') {
      return (
        <Email
          patientId={patientState?.id || ''}
          onFieldUpdated={onFieldUpdated}
          currentValue={patientState?.profile?.email || ''}
        />
      )
    }
    if (isUpdatingField === 'national_registry_number') {
      return (
        <NationalRegistryNumber
          patientId={patientState?.id || ''}
          onFieldUpdated={onFieldUpdated}
          currentValue={patientState?.profile?.national_registry_number || ''}
        />
      )
    }
  }

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        <h1 className="text-slate-800 text-5xl">
          {t('hi')} {patientState?.profile?.name}
        </h1>
        <p className="text-slate-600 text-3xl pt-2">
          Can you check that everything is still correct?
        </p>
        <div className="my-8">
          <div className="mt-5 border-t border-gray-200">
            <dl className="divide-y divide-gray-200 text-lg">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-500">{t('first_name')}</dt>
                <dd className="mt-1 flex text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow">
                    {patientState?.profile?.first_name}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsUpdatingField('first_name')}
                      className="bg-white rounded-md font-semibold text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-500">{t('last_name')}</dt>
                <dd className="mt-1 flex text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow">
                    {patientState?.profile?.last_name}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsUpdatingField('last_name')}
                      className="bg-white rounded-md font-semibold text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-500">{t('email')}</dt>
                <dd className="mt-1 flex text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow">
                    {patientState?.profile?.email}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsUpdatingField('email')}
                      className="bg-white rounded-md font-semibold text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-500">
                  {t('national_registry_number')}
                </dt>
                <dd className="mt-1 flex text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow">
                    {patientState?.profile?.national_registry_number}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setIsUpdatingField('national_registry_number')
                      }
                      className="bg-white rounded-md font-semibold text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Update
                    </button>
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="">
        <KioskButton
          label={t('confirm_cta')}
          onClick={() => goToNextStage()}
          color="blue"
          disabled={false}
        />
      </div>
    </div>
  )
}
