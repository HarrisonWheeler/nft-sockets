<template>
  <div class="container-fluid">
    <div class="row p-2">
      <div class="col-md-2">
        <button class="btn btn-info square-right" @click="filterBy = ''">
          All
        </button>
        <button class="btn btn-success square-right" @click="filterBy = 'open'">
          Open
        </button>
        <button class="btn btn-danger square-left" @click="filterBy = 'closed'">
          Closed
        </button>
      </div>
    </div>
    <div class="row p-2">
      <Campaign v-for="c in filteredList" :key="c.id" :campaign="c" />
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { campaignsService } from "../services/CampaignsService"
import { AppState } from "../AppState"
import { socketService } from "../services/SocketService"
export default {
  name: 'Home',
  setup() {
    const filterBy = ref('')
    const filteredList = ref([])

    watchEffect(() => {
      let list = AppState.campaigns
      if (filterBy.value) {
        list = list.filter(l => l.status == filterBy.value)
      }
      filteredList.value = list
    })

    watchEffect(async () => {
      try {
        await campaignsService.getCampaigns()
        socketService
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      filterBy,
      filteredList
    }
  }
}
</script>

<style scoped lang="scss">
</style>
