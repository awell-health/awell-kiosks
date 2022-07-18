import { useTranslation } from 'next-i18next'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import { KioskContext } from '../../../../../../contexts/KioskContext'
import { useCreatePatient } from '../../../../../../hooks/awell-orchestration/useCreatePatient'

export const CreatePatient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()
  const { setPatient, goToNextStage } = useContext(KioskContext)
  const { createPatient } = useCreatePatient()
  const { register, handleSubmit } = useForm()

  const onPatientCreation = () => {
    handleSubmit(async (data) => {
      setIsLoading(true)
      const patient = await createPatient(data?.profile)

      if (patient) {
        setPatient(patient)
        goToNextStage()
      }
      setIsLoading(false)
    })()
  }

  return (
    <div>
      <h1 className="text-slate-800 text-5xl">Create profile</h1>
      <p className="text-slate-600 text-3xl pt-2">
        We were not able to find a matching profile but you can create one
      </p>
      <form
        onSubmit={handleSubmit(onPatientCreation)}
        className="mt-6 space-y-8 divide-y divide-gray-200"
      >
        <>
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h3>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('profile.first_name', {
                        required: true,
                      })}
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('profile.last_name', {
                        required: true,
                      })}
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    National registry number
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('profile.national_registry_number', {
                        required: true,
                      })}
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('profile.email', {
                        required: true,
                      })}
                      type="email"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </div>
        </>
      </form>
    </div>
  )
}
