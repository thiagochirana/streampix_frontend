import { createConsumer } from '@rails/actioncable'

const CableService = {
  createConsumer(donateId: string) {
    return createConsumer(`ws://localhost:3000/cable?donate_id=${donateId}`)
  },
}

export default CableService
