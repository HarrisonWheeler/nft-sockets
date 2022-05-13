import { AppState } from "../AppState"
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('CREATED_DONATION', this.onDonationCreated)
  }

  onDonationCreated(payload) {
    AppState.donations.push(payload)
    console.log('Donation payload:', payload);
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
