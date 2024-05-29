<template>
  <div class="Layout">
    <ValidationObserver
      v-slot="{ failed }"
      ref="observer"
      class="Form"
      tag="form"
      @submit.prevent="onSubmit"
    >
      <ValidationProvider v-slot="{ errors, dirty }" rules="required" class="Provider">
        <label for="name">Name</label>
        <input v-model="name" type="text" name="name" :class="{ Error: dirty && errors.length > 0 }"/>
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors, dirty }" rules="required|email" class="Provider">
        <label for="email">Email</label>
        <input v-model="email" type="text" name="email" :class="{Error: dirty && errors.length > 0 }"/>
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <button type="submit" :disabled="failed">Submit</button>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      name: '',
      email: '',
    }
  },
  methods: {
    async onSubmit() {
      const observer = this.$refs.observer as InstanceType<
        typeof ValidationObserver
      >
      const isValid = await observer.validate()
      if (!isValid) {
        return
      }
      window.alert(`Form submitted => Name: ${this.name} Email: ${this.email}`)
    },
  },
})
</script>

<style>
.Layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.Provider {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.Error {
  border: 2px solid red;
}
</style>
