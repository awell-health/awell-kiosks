import { useLazyQuery } from '@apollo/client'
import { useTranslation } from 'next-i18next'
import { useContext, useState } from 'react'

import { KioskContext } from '../../../../contexts/KioskContext'
import { GET_PATHWAY } from '../../../../hooks/awell-orchestration/usePathway/graphql/getPathway.graphql'
import { usePatientPathways } from '../../../../hooks/awell-orchestration/usePatientPathways'
import { KioskButton } from '../../../Button/variants'
import { Loading } from '../../../Loading'
import { ExistingPatientPathways } from './atoms'
import { StartNewPathway } from './Substages'

export const PathwaySelection = () => {
  const { t } = useTranslation()
  const { patient, setPathway, goToNextStage } = useContext(KioskContext)
  const [startNewPathway, setStartNewPathway] = useState(false)
  const [selectedPathwayId, setSelectedPathwayId] = useState('')

  if (!patient) {
    throw new Error('There should be a patient')
  }

  const [getPathway, { loading: loadingSelectedPathway }] =
    useLazyQuery(GET_PATHWAY)

  const onSubmit = async () => {
    const pathway = await getPathway({
      variables: { pathway_id: selectedPathwayId },
    })
    if (pathway?.data?.pathway?.pathway) {
      setPathway(pathway.data.pathway.pathway)
      goToNextStage()
    }
  }

  const { patientPathways, loading } = usePatientPathways({
    patientId: patient.id,
    status: ['active'],
  })

  if (loading || loadingSelectedPathway) {
    return <Loading />
  }

  if (patientPathways.length === 0 || startNewPathway) {
    return <StartNewPathway />
  }

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        <h1 className="text-slate-800 text-5xl">Your active care flows</h1>
        <p className="text-slate-600 text-3xl pt-2">
          Continue with an existing flow or start a new one
        </p>
        <div className="my-12">
          <ExistingPatientPathways
            patientPathways={patientPathways}
            selectedPathwayId={selectedPathwayId}
            setSelectedPathwayId={setSelectedPathwayId}
          />
          <div
            className="mt-8 text-center text-2xl cursor-pointer"
            onClick={() => setStartNewPathway(true)}
          >
            Want to start a new care flow?
            <br />
            <span className="font-semibold text-blue-600">
              Click here to start a new care flow.
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <KioskButton
          label={t('confirm_cta')}
          onClick={() => onSubmit()}
          color="blue"
          disabled={selectedPathwayId === '' ? true : false}
        />
      </div>
    </div>
  )
}
