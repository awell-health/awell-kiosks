import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { type PublishedPathwayDefinition } from '../../../../../types/generated/api.types'

interface PublishedPathwaysProps {
  publishedPathways: Array<PublishedPathwayDefinition>
  selectedPathwayDefinitionId: string
  setSelectedPathwayDefinitionId: (selectedPathwayDefinitionId: string) => void
}

export const PublishedPathways = ({
  publishedPathways,
  selectedPathwayDefinitionId,
  setSelectedPathwayDefinitionId,
}: PublishedPathwaysProps) => {
  return (
    <RadioGroup
      value={selectedPathwayDefinitionId}
      onChange={setSelectedPathwayDefinitionId}
    >
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-4">
        {publishedPathways.map((publishedPathway) => (
          <RadioGroup.Option
            key={publishedPathway.id}
            value={publishedPathway.id}
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
                      {publishedPathway.title}
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
