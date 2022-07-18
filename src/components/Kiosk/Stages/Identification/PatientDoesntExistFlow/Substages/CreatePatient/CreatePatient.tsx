// import { useTranslation } from 'next-i18next'
import { useContext, useState } from 'react'

import { CreatePatientProvider } from '../../../../../../../contexts/CreatePatientContext'
import { KioskContext } from '../../../../../../../contexts/KioskContext'
import { useCreatePatient } from '../../../../../../../hooks/awell-orchestration/useCreatePatient'
import { KioskButton } from '../../../../../../Button/variants'
import {
  Email,
  FirstName,
  LastName,
  NationalRegistryNumber,
  Overview,
} from './FormSteps'

export const CreatePatient = () => {
  const [editMode, setEditMode] = useState(false)
  const [patientCreationStep, setPatientCreationStep] = useState(0)
  const [isCreatingPatient, setIsCreatingPatient] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // const { t } = useTranslation()
  const { setPatient, goToNextStage } = useContext(KioskContext)
  const { createPatient } = useCreatePatient()

  const nextFormStep = ({ goToOverview }: { goToOverview?: boolean }) => {
    if (goToOverview) {
      setPatientCreationStep(999)
    } else {
      setPatientCreationStep(patientCreationStep + 1)
    }
  }

  const onPatientCreation = async (data: unknown) => {
    setIsLoading(true)
    //@ts-expect-error not typed yet
    const patient = await createPatient(data)

    if (patient) {
      setPatient(patient)
      goToNextStage()
    }
    setIsLoading(false)
  }

  const onEditPatientPropertyFromOverview = (formStep: number) => {
    setEditMode(true)
    setPatientCreationStep(formStep)
  }

  if (isLoading) {
    return <p>Creating patient...</p>
  }

  if (isCreatingPatient) {
    const steps = [
      {
        Component: (
          <FirstName nextFormStep={nextFormStep} editMode={editMode} />
        ),
      },
      {
        Component: <LastName nextFormStep={nextFormStep} editMode={editMode} />,
      },
      { Component: <Email nextFormStep={nextFormStep} editMode={editMode} /> },
      {
        Component: (
          <NationalRegistryNumber
            nextFormStep={nextFormStep}
            editMode={editMode}
          />
        ),
      },
    ]

    return (
      <CreatePatientProvider>
        {patientCreationStep < steps.length ? (
          steps[patientCreationStep].Component
        ) : (
          <Overview
            onPatientCreation={onPatientCreation}
            onEdit={onEditPatientPropertyFromOverview}
          />
        )}
      </CreatePatientProvider>
    )
  }

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        <h1 className="text-slate-800 text-5xl">Create profile</h1>
        <p className="text-slate-600 text-3xl pt-2">
          We were not able to find a matching profile. Click the button below to
          create a new profile.
        </p>
      </div>
      <div className="">
        <KioskButton
          label="Create a profile"
          onClick={() => setIsCreatingPatient(true)}
          color="blue"
          disabled={false}
        />
      </div>
    </div>
  )
}
