import { createConsumer } from '@rails/actioncable'

const CableService = {
  consumer: createConsumer('ws://localhost:3000/ws'),
}

export default CableService
