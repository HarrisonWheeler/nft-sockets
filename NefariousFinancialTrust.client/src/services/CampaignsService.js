import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CampaignsService {
  async getCampaigns() {
    const res = await api.get('api/campaigns')
    AppState.campaigns = res.data
  }

  async getCampaignById(campaignId) {
    const res = await api.get('api/campaigns/' + campaignId)
    AppState.campaign = res.data
  }

  async getDonationsByCampaignId(campaignId) {
    const res = await api.get(`api/campaigns/${campaignId}/donations`)
    AppState.donations = res.data
  }
}

export const campaignsService = new CampaignsService()
