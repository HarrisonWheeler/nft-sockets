<template>
  <div class="container-fluid">
    <div v-if="campaign">
      <div class="row justify-content-center p-2">
        <div class="col-md-7">
          <div class="bg-light shadow rounded p-2">
            <h1>{{ campaign.title }}</h1>
            <p>{{ campaign.description }}</p>
            <h5>Goal: ${{ campaign.goal }}</h5>
            <div class="d-flex mt-4 align-items-center">
              <img
                :src="campaign.creator.picture"
                :alt="campaign.creator.picture"
              />
              <h6 class="ms-2">{{ campaign.creator.name }}</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-1 p-2">
        <div class="col-md-7">
          <form @submit.prevent="createDonation()" v-if="account.id">
            <div class="bg-light shadow form-control p-2">
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter Donation..."
                class="form-control"
                required
                v-model="donation.amount"
                min="100"
                step="100"
              />
              <div class="d-flex justify-content-end">
                <button class="btn btn-success mt-2 ms-auto">Donate</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row justify-content-center mt-5 p-2">
        <div class="col-md-7">
          <div class="bg-light shadow rounded p-2">
            <div v-if="donations.length > 0">
              <Donation v-for="d in donations" :key="d.id" :donation="d" />
              <!-- TODO need to display donation component when we get that data -->
            </div>
            <div v-else>
              <h5>No Donations currently.....</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, reactive, ref } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { campaignsService } from "../services/CampaignsService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { donationsService } from '../services/DonationsService'

export default {
  setup() {
    const route = useRoute()
    const donation = ref({})

    onMounted(async () => {
      try {
        AppState.donations = []
        AppState.campaign = null
        await campaignsService.getCampaignById(route.params.id)
        // TODO need to go get donations by campaign
        await campaignsService.getDonationsByCampaignId(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      donation,
      campaign: computed(() => AppState.campaign),
      donations: computed(() => AppState.donations),
      account: computed(() => AppState.account),
      async createDonation() {
        try {
          donation.value.campaignId = route.params.id
          await donationsService.createDonation(donation.value)
          Pop.toast('Donation accepted', 'success')
          donation.value.amount = null
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.row-height {
  height: 50vh;
}

.container-fluid {
  height: 90vh;
}

img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
</style>
