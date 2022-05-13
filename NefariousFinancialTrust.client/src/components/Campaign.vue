<template>
  <div class="col-md-4 mb-3">
    <router-link :to="{ name: 'CampaignPage', params: { id: campaign.id } }">
      <div class="bg-light shadow rounded p-2">
        <h1>
          {{ campaign.title }}
          <i v-if="hasDonated" class="mdi mdi-star text-warning"></i>
        </h1>
        <p class="clip-text mt-2">{{ campaign.description }}</p>
        <h5 class="m-0">Goal: ${{ campaign.goal }}</h5>
        <div class="d-flex mt-4 align-items-center">
          <img
            :src="campaign.creator.picture"
            :alt="campaign.creator.picture"
          />
          <h6 class="ms-2">{{ campaign.creator.name }}</h6>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    campaign: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      hasDonated: computed(() => {
        // find if I have a donation to this campaign Id
        let donation = AppState.myDonations.find(d => d.campaignId == props.campaign.id)
        if (donation) {
          return true
        }
        return false
      })
    }
  }
}
</script>


<style lang="scss" scoped>
a {
  color: black !important;
}

img {
  height: 35px;
  width: 35px;
  border-radius: 50%;
}
</style>
