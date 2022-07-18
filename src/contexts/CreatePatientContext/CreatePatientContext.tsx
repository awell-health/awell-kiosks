import { createContext, ReactNode, useContext, useState } from 'react'

interface CreatePatientContextStateType {
  data: { [key in string]: unknown }
  setPatientData: (newValues: { [key in string]: unknown }) => void
}

const initialState: CreatePatientContextStateType = {
  data: {},
  setPatientData: () => null,
}

export const CreatePatientContext =
  createContext<CreatePatientContextStateType>(initialState)

interface CreatePatientProviderProps {
  children: ReactNode
}

export const CreatePatientProvider = ({
  children,
}: CreatePatientProviderProps) => {
  const [data, setData] = useState(initialState.data)

  const setPatientData = (values: { [key in string]: unknown }) => {
    setData(() => ({
      ...data,
      ...values,
    }))
  }

  return (
    <CreatePatientContext.Provider value={{ data, setPatientData }}>
      {children}
    </CreatePatientContext.Provider>
  )
}

export const useCreatePatient = () => useContext(CreatePatientContext)
