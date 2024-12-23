import CableService from '@/services/CableService'

export default class DonationAlertService {
  private subscription: any

  constructor(donateId: string, callback: (data: any) => void) {
    const cable = CableService.createConsumer(donateId)
    this.subscription = cable.subscriptions.create(
      {
        channel: 'DonationAlertChannel',
        donate_id: donateId,
      },
      {
        received: (data: any) => {
          callback(data)
        },
      },
    )
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
