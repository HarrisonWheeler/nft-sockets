import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class DonationsService {
  async createDonation(donation) {
    const res = await api.post('api/donations', donation)
    const found = AppState.donations.findIndex(d => d.id == res.data.id)
    if (found != -1) {
      AppState.donations.splice(found, 1, res.data)
    } else {
      // AppState.donations.push(res.data)
    }
    const myFound = AppState.myDonations.findIndex(d => d.id == res.data.id)
    if (myFound != -1) {
      AppState.myDonations.splice(myFound, 1, res.data)
    } else {
      // AppState.myDonations.push(res.data)
    }
  }

  async getDonationsByAccount() {
    const res = await api.get('account/donations')
    AppState.myDonations = res.data
  }

}

export const donationsService = new DonationsService()
