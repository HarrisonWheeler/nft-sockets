import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CampaignSchema } from '../models/Campaign'
import { DonationSchema } from '../models/Donation.js'

class DbContext {
  Campaigns = mongoose.model('Campaign', CampaignSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Donations = mongoose.model('Donation', DonationSchema)
}

export const dbContext = new DbContext()
