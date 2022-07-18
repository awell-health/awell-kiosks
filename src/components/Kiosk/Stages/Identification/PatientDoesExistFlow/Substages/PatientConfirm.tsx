import { useTranslation } from 'next-i18next'
import { useContext, useEffect } from 'react'

import { KioskContext } from '../../../../../../contexts/KioskContext'
import { usePatient } from '../../../../../../hooks/awell-orchestration/usePatient'
import { KioskButton } from '../../../../../Button/variants'

interface PatientConfirmProps {
  patientId: string
}

export const PatientConfirm = ({ patientId }: PatientConfirmProps) => {
  const { t } = useTranslation()
  const { patient, loading } = usePatient(patientId)
  const {
    setPatient,
    patient: patientState,
    goToNextStage,
  } = useContext(KioskContext)

  useEffect(() => {
    if (!loading) {
      setPatient(patient)
    }
  }, [loading])

  if (loading) {
    return <p>Fetching patient</p>
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
