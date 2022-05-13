<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Greetings {{ account.name }}</h1>
      </div>
    </div>
    <div class="row">
      <div
        class="col-5 border border-dark p-3 m-1"
        v-for="md in myDonations"
        :key="md.id"
      >
        <router-link
          :to="{ name: 'CampaignPage', params: { id: md.campaignId } }"
        >
          <p>{{ md.campaign.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { donationsService } from "../services/DonationsService"
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account),
      myDonations: computed(() => AppState.myDonations)
    }
  }
}
</script>

<style scoped>
</style>
