import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class DonationsService {

  async getDonationsByAccountId(accountId) {
    return await dbContext.Donations.find({ accountId }).populate('campaign')
  }
  async getDonationsByCampaignId(campaignId) {
    return await dbContext.Donations.find({ campaignId }).populate('donor', 'name picture')
  }
  async createDonation(newDonation) {
    // NOTE check to see if the donation already exists
    const exists = await dbContext.Donations.findOne({ accountId: newDonation.accountId, campaignId: newDonation.campaignId }).populate('donor', 'name picture')
    if (exists) {
      // NOTE make sure that new amount is bigger than old amount
      if (exists.amount > newDonation.amount) {
        throw new Forbidden('Donations must be an increase from original price')
      }
      exists.amount = newDonation.amount
      await exists.save()
      return exists
    }
    const donation = await dbContext.Donations.create(newDonation)
    await donation.populate('donor', 'name picture')
    return donation
  }

}

export const donationsService = new DonationsService()
