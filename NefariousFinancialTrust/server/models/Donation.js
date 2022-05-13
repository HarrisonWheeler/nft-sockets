import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const DonationSchema = new Schema(
  {
    accountId: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
    campaignId: {type: Schema.Types.ObjectId, required: true, ref: "Campaign"},
    amount: {type: Number, required: true, min: 1}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

DonationSchema.virtual('donor', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

DonationSchema.virtual('campaign', {
  localField: 'campaignId',
  foreignField: '_id',
  justOne: true,
  ref: 'Campaign'
})


