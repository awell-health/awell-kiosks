import { useContext, useEffect, useState } from 'react'

import { AwellActivity } from '../../../../components/AwellActivity'
import { Spinner } from '../../../../components/Spinner'
import { KioskContext } from '../../../../contexts/KioskContext'
import { usePathwayActivities } from '../../../../hooks/awell-orchestration/usePathwayActivities'
import { type Activity } from '../../../../types/generated/api.types'
import { isPathwayCompleted } from '../../../../utils/pathway'

export const PathwayOrchestration = () => {
  const { pathway, patient } = useContext(KioskContext)
  const { activities, startPolling, stopPolling } = usePathwayActivities(
    pathway?.id || ''
  )
  const [currentPendingUserActivity, setCurrentPendingUseractivity] =
    useState<Activity | null>(null)

  const [isCompleted, setIsCompleted] = useState(false)
  const [ignoredActivities, setIgnoredActivities] = useState<string[]>([])

  const onActivityCompleted = () => {
    /**
     * We cannot mark messages as read that are not for the patient in an
     * onboarding flow. If we want to make sure we can go through an onboarding
     * flow where there are messages that are NOT assigned to the patient, then
     * we need to make sure we ignore them.
     */
    if (
      currentPendingUserActivity?.object.type === 'MESSAGE' &&
      currentPendingUserActivity?.indirect_object?.type !== 'PATIENT'
    ) {
      setIgnoredActivities([
        ...ignoredActivities,
        currentPendingUserActivity.id,
      ])
    }
    setCurrentPendingUseractivity(null)
  }

  useEffect(() => {
    const pathwayCompleted = isPathwayCompleted(
      activities || [],
      ignoredActivities
    )

    if (pathwayCompleted) {
      setIsCompleted(true)
      return
    }

    const firstPendingUserActivity = activities?.find(
      (activity) =>
        activity.status === 'ACTIVE' &&
        !ignoredActivities.includes(activity.id) &&
        ['MESSAGE', 'FORM', 'CHECKLIST'].includes(activity.object.type)
    )

    if (firstPendingUserActivity) {
      setCurrentPendingUseractivity(firstPendingUserActivity)
    }
  }, [activities, ignoredActivities])

  /**
   * Stop polling for activities when there's a pending user activity
   * or when pathway is completed
   */
  useEffect(() => {
    if (currentPendingUserActivity || isCompleted) {
      stopPolling()
    }
  }, [currentPendingUserActivity, isCompleted])

  /**
   * Start polling for activities on initial render
   */
  useEffect(() => {
    if (!currentPendingUserActivity) {
      startPolling(1000)
    }
  }, [startPolling, currentPendingUserActivity])

  if (!currentPendingUserActivity)
    return (
      <div>
        {!currentPendingUserActivity && !isCompleted && (
          <Spinner message="Loading next user activity" />
        )}
        {isCompleted && (
          <div className="max-w-3xl mx-auto">
            <div className="max-w-xl mx-auto">
              <h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                Hooray!
              </h1>
              <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Pathway completed
              </p>
              <p className="mt-2 text-base text-gray-500">
                You completed the onboarding pathway
              </p>
            </div>
          </div>
        )}
      </div>
    )

  return (
    <AwellActivity
      activity={currentPendingUserActivity}
      onActivityCompleted={onActivityCompleted}
      patientId={patient?.id || ''}
    />
  )
}
