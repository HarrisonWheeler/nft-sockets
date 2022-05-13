import { Auth0Provider } from "@bcwdev/auth0provider"
import { donationsService } from "../services/DonationsService.js"
import { socketProvider } from "../SocketProvider.js"
import BaseController from "../utils/BaseController.js"


export class DonationsController extends BaseController {
  constructor() {
    super('api/donations')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createDonation)

  }
  async createDonation(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const donation = await donationsService.createDonation(req.body)
      socketProvider.message('CREATED_DONATION', donation)
      return res.send(donation)
    } catch (error) {
      next(error)
    }
  }
}
