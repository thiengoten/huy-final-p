import { commonConfigs } from '@/config'

export const cancelRequest = (timeOut = commonConfigs.CONNECTION_TIMEOUT) => {
  const abortController = new AbortController()
  setTimeout(() => {
    abortController.abort()
  }, timeOut)
  return abortController.signal
}
