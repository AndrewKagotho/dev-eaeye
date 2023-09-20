import moment from 'moment'

export const parseDate = (rawDate: string): string => {
  return moment(rawDate).format('dd DD/MM/YY H:mm')
}
