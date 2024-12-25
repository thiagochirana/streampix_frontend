import { createConsumer } from '@rails/actioncable'

const CableService = {
  createConsumerDonate(donateId: string) {
    return createConsumer(`${import.meta.env.VITE_BACKEND_API_URL}/cable?donate_id=${donateId}`)
  },
  createConsumerAlert(alertAccessKey: string) {
    return createConsumer(
      `${import.meta.env.VITE_BACKEND_WS_URL}/cable?alert_access_key=${alertAccessKey}`,
    )
  },
}

export default CableService
