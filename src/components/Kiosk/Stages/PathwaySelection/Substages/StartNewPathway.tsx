import { useLazyQuery } from '@apollo/client'
import { useTranslation } from 'next-i18next'
import { ChangeEvent, useContext, useState } from 'react'

import { KioskContext } from '../../../../../contexts/KioskContext'
import { GET_PATHWAY } from '../../../../../hooks/awell-orchestration/usePathway/graphql/getPathway.graphql'
import { usePublishedPathwayDefinitions } from '../../../../../hooks/awell-orchestration/usePublishedPathwayDefinitions'
import { useStartPathway } from '../../../../../hooks/awell-orchestration/useStartPathway'
import { KioskButton } from '../../../../Button/variants'
import { PublishedPathways } from '../atoms'

export const StartNewPathway = () => {
  const { t } = useTranslation()

  const { patient, setPathway, goToNextStage } = useContext(KioskContext)
  const [selectedPathwayToStart, setSelectedPathwayToStart] = useState('')
  const [isStartingPathway, setIsStartingPathway] = useState(false)
  const { publishedPathwayDefinitions, loading } =
    usePublishedPathwayDefinitions()
  const { startPathway } = useStartPathway()
  const [getPathway, { loading: loadingSelectedPathway, error, data }] =
    useLazyQuery(GET_PATHWAY)
  const handlePathwaySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPathwayToStart(e.target.value)
  }

  const onPathwayStart = async () => {
    setIsStartingPathway(true)
    const pathwayId = await startPathway({
      patient_id: patient?.id || '',
      pathway_definition_id: selectedPathwayToStart,
    })
    if (pathwayId) {
      setIsStartingPathway(false)
      const pathway = await getPathway({
        variables: { pathway_id: pathwayId },
      })
      if (pathway?.data?.pathway?.pathway) {
        setPathway(pathway.data.pathway.pathway)
        goToNextStage()
      }
    }
  }

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        <h1 className="text-slate-800 text-5xl">Start a care flow</h1>
        <p className="text-slate-600 text-3xl pt-2">Select a care flow below</p>
        <div className="my-12">
          <PublishedPathways
            publishedPathways={publishedPathwayDefinitions}
            selectedPathwayDefinitionId={selectedPathwayToStart}
            setSelectedPathwayDefinitionId={setSelectedPathwayToStart}
          />
        </div>
      </div>
      <div className="">
        <KioskButton
          label={t('confirm_cta')}
          onClick={() => onPathwayStart()}
          color="blue"
          disabled={selectedPathwayToStart === '' ? true : false}
        />
      </div>
    </div>
  )
}
