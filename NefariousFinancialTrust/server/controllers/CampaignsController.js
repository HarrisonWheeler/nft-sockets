import { Auth0Provider } from "@bcwdev/auth0provider"
import { campaignsService } from "../services/CampaignsService.js"
import { donationsService } from "../services/DonationsService.js"
import { socketProvider } from "../SocketProvider.js"
import BaseController from "../utils/BaseController.js"

export class CampaignsController extends BaseController {
  constructor() {
    super('api/campaigns')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/donations', this.getDonationsByCampaignId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }
  async getDonationsByCampaignId(req, res, next) {
    try {
      const donations = await donationsService.getDonationsByCampaignId(req.params.id)
      return res.send(donations)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const campaigns = await campaignsService.getAll(req.params.query)
      return res.send(campaigns)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const campaign = await campaignsService.getById(req.params.id)
      return res.send(campaign)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const campaign = await campaignsService.create(req.body)
      return res.send(campaign)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await campaignsService.delete(req.params.id, req.userInfo.id)
      res.send("Deleted!")
    } catch (error) {
      next(error)
    }
  }

}
