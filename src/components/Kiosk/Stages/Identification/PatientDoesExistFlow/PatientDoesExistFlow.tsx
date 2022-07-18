import { type User } from '../../../../../types/generated/api.types'
import { SearchResults } from './Substages/SearchResults'

interface PatientDoesExistFlowProps {
  results: User[]
}

export const PatientDoesExistFlow = ({
  results,
}: PatientDoesExistFlowProps) => {
  return <SearchResults results={results} />
}
