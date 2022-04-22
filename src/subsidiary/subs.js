import { format } from 'date-fns'

export const makeDate = (date) => {
  const d = new Date(date).toDateString()
  return format(new Date(d), 'MMMM d, y')
}

export const makeTags = (tags) => tags.map((tag) => tag.name)
