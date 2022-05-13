import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CampaignsService {
  async getAll(query = {}) {
    return await dbContext.Campaigns.find(query).populate('creator', 'name picture')
  }

  async getById(id) {
    const campaign = await dbContext.Campaigns.findById(id).populate('creator', 'name picture')
    if (!campaign) {
      throw new BadRequest("invalid id")
    }
    return campaign
  }

  async create(body) {
    return await dbContext.Campaigns.create(body)
  }
  async delete(campaignId, userId) {
    const campaign = await this.getById(campaignId)
    if (campaign.creatorId.toString() != userId) {
      throw new Forbidden("You cannot delete a campaign that is not yours")
    }
    await campaign.remove()
  }

}

export const campaignsService = new CampaignsService()
