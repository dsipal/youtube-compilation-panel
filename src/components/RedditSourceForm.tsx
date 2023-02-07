import type { FormEvent, FunctionComponent } from 'react'
import { useState } from 'react'
import { object, string } from 'zod'
import { api } from '../utils/api'

export const redditSourceSchema = object({
  subreddit: string(),
})

export const RedditSourceForm: FunctionComponent = () => {
  const [sub, setSub] = useState('')
  const [error, setError] = useState('')

  const { mutateAsync } = api.redditSource.create.useMutation({
    onSuccess: () => {
      setSub('')
    },
  })

  async function handleSubmit(event: FormEvent) {
    //event.preventDefault()
    await mutateAsync({ subreddit: sub })
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="subreddit">Subreddit</label>
      <input
        type="text"
        id="subreddit"
        name="subreddit"
        onChange={(e) => setSub(e.target.value)}
        required
      />
      <select id="schedule" name="schedule">
        <option value="daily">Daily</option>
        <option value="biweekly">Bi-Weekly</option>
        <option value="weekly">Weekly</option>
      </select>

      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}
