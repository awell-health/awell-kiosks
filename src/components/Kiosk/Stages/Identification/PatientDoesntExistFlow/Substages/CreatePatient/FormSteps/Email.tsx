import { type FieldValues, useForm } from 'react-hook-form'

import { useCreatePatientContext } from '../../../../../../../../contexts/CreatePatientContext'
import { KioskButton } from '../../../../../../../Button/variants'

interface EmailProps {
  nextFormStep: ({ goToOverview }: { goToOverview?: boolean }) => void
  editMode: boolean
}

const fieldProperty = 'email'

export const Email = ({ nextFormStep, editMode }: EmailProps) => {
  const { data, setPatientData } = useCreatePatientContext()

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'all' })

  const onSubmit = (values: FieldValues) => {
    setPatientData(values)
    if (editMode) {
      // Go back to overview
      nextFormStep({ goToOverview: true })
    } else {
      nextFormStep({})
    }
  }

  return (
    <div className="grow flex flex-col">
      <form className="grow flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="container grow">
          <h1 className="text-slate-800 text-5xl">Email</h1>
          <p className="text-slate-600 text-3xl pt-2">
            What is your email address?
          </p>
          <div className="my-4">
            <input
              className="py-4 px-8 text-slate-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-3xl border border-gray-300 rounded-md"
              type="email"
              defaultValue={
                data?.[fieldProperty] ? data[fieldProperty].toString() : ''
              }
              {...register(fieldProperty, {
                required: true,
              })}
            />
            {errors?.[fieldProperty] && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>
        </div>
        <div className="">
          <KioskButton
            label={editMode ? 'Save changes' : 'Next'}
            type="submit"
            color="blue"
            disabled={false}
          />
        </div>
      </form>
    </div>
  )
}
