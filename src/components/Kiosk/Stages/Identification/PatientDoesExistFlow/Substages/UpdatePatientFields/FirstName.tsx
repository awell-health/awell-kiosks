import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import { KioskContext } from '../../../../../../../contexts/KioskContext'
import { useUpdatePatient } from '../../../../../../../hooks/awell-orchestration/useUpdatePatient'
import { KioskButton } from '../../../../../../Button/variants'
import { Loading } from '../../../../../../Loading'

interface FirstNameProps {
  currentValue: string
  patientId: string
  onFieldUpdated: () => void
}

const fieldProperty = 'first_name'

export const FirstName = ({
  patientId,
  currentValue,
  onFieldUpdated,
}: FirstNameProps) => {
  const { updatePatient } = useUpdatePatient(patientId)
  const [isLoading, setIsLoading] = useState(false)
  const { setPatient } = useContext(KioskContext)

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'all' })

  const onSubmit = () => {
    handleSubmit(async (data) => {
      setIsLoading(true)

      const updatedPatient = await updatePatient({
        first_name: data?.[fieldProperty],
      })

      if (updatedPatient) {
        onFieldUpdated()
        setPatient(updatedPatient)
      }

      setIsLoading(false)
    })()
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="grow flex flex-col">
      <form className="grow flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="container grow">
          <h1 className="text-slate-800 text-5xl">First name</h1>
          <p className="text-slate-600 text-3xl pt-2">
            What is your first name?
          </p>
          <div className="my-4">
            <input
              className="py-4 px-8 text-slate-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-3xl border border-gray-300 rounded-md"
              defaultValue={currentValue}
              {...register(fieldProperty, {
                required: true,
              })}
            />
            {errors?.[fieldProperty] && (
              <p className="text-red-500">First name is required</p>
            )}
          </div>
        </div>
        <div className="">
          <KioskButton
            label="Save changes"
            type="submit"
            color="blue"
            disabled={false}
          />
        </div>
      </form>
    </div>
  )
}
