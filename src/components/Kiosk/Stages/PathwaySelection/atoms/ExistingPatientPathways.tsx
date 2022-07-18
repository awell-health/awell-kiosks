import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { type PatientPathway } from '../../../../../types/generated/api.types'

interface ExistingPatientPathwayProps {
  patientPathways: Array<PatientPathway>
  selectedPathwayId: string
  setSelectedPathwayId: (selectedPathwayId: string) => void
}

export const ExistingPatientPathways = ({
  patientPathways,
  selectedPathwayId,
  setSelectedPathwayId,
}: ExistingPatientPathwayProps) => {
  return (
    <RadioGroup value={selectedPathwayId} onChange={setSelectedPathwayId}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-4">
        {patientPathways.map((patientPathway) => (
          <RadioGroup.Option
            key={patientPathway.id}
            value={patientPathway.id}
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
                      {patientPathway.title}
                    </RadioGroup.Label>
                  </span>
                </span>
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
  )
}
