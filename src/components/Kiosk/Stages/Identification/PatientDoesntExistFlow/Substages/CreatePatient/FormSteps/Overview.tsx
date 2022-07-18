import { useTranslation } from 'next-i18next'

import { useCreatePatientContext } from '../../../../../../../../contexts/CreatePatientContext'
import { KioskButton } from '../../../../../../../Button/variants'

interface OverviewProps {
  onPatientCreation: (data: unknown) => void
  onEdit: (formStep: number) => void
}

export const Overview = ({ onPatientCreation, onEdit }: OverviewProps) => {
  const { data } = useCreatePatientContext()
  const { t } = useTranslation()

  return (
    <div className="grow flex flex-col">
      <div className="container grow">
        <h1 className="text-slate-800 text-5xl">Overview</h1>
        <p className="text-slate-600 text-3xl pt-2">
          You have entered the following details
        </p>
        <div className="my-8">
          <div className="mt-5 border-t border-gray-200">
            <dl className="divide-y divide-gray-200 text-lg">
              {data &&
                Object.keys(data).map((key, index) => (
                  <div
                    className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"
                    key={key}
                  >
                    <dt className="font-medium text-gray-500">{t(key)}</dt>
                    <dd className="mt-1 flex text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">{data[key]}</span>
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => onEdit(index)}
                          className="bg-white rounded-md font-semibold text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="">
        <KioskButton
          label="Create my profile"
          onClick={() => onPatientCreation(data)}
          color="blue"
          disabled={false}
        />
      </div>
    </div>
  )
}
