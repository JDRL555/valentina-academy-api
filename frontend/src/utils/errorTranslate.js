import { ERRORS } from '@constants/errors'

export function translateError(error) {
  return ERRORS[error]
}

