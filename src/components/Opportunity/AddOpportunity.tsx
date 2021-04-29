import * as React from "react"
import { IOpportunity } from "../../store/Opportunity/Types";

type Props = {
  saveOppty : (opportunity: IOpportunity | any) => void
}

export const AddOpportunity: React.FC<Props> = ({ saveOppty }) => {
  const [opportunity, setTeam] = React.useState<IOpportunity | {}>()

  const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
    setTeam({
      ...opportunity,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const addNewTeam = (e: React.FormEvent) => {
    e.preventDefault()
    saveOppty(opportunity)
  }

  return (
    <form onSubmit={addNewTeam} className="Add-article">
      <input
        type="text"
        id="id"
        placeholder="ID"
        onChange={handleArticleData}
      />
      <input
        type="text"
        id="dealSize"
        placeholder="Deal Size"
        onChange={handleArticleData}
      />
      <input
        type="text"
        id="company"
        placeholder="Company"
        onChange={handleArticleData}
      />
       <input
        type="text"
        id="status"
        placeholder="Status"
        onChange={handleArticleData}
      />
      <button disabled={opportunity === undefined ? true : false}>
        Add Team
      </button>
    </form>
  )
}