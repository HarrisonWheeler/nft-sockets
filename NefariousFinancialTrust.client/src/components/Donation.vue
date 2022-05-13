<template>
  <div class="row">
    <div class="col">
      <div class="d-flex align-items-center">
        <img :src="donation.donor.picture" :alt="donation.donor.name" />
        <h6 class="ms-2 pe-5 border-end border-dark">
          {{ donation.donor.name }}
        </h6>
        <!-- <hr class="ms-2" /> -->
      </div>
    </div>
    <div class="col">
      <div class="d-flex align-items-center amount">
        <h6>${{ donation.amount }}</h6>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    donation: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

hr {
  border: none;
  border-left: 1px solid black;
  height: 3vh;
  width: 1px;
}

.amount {
  height: 100%;
}
</style>
