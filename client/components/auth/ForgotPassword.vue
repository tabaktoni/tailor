<template>
  <div>
    <v-alert
      :value="showMessage"
      :color="error ? 'primary darken-2' : 'grey darken-3'"
      text
      class="mb-5">
      {{ error || 'Sending reset email...' }}
    </v-alert>
    <validation-observer
      v-if="!error"
      ref="form"
      @submit.prevent="$refs.form.handleSubmit(submit)"
      tag="form"
      novalidate>
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email">
        <v-text-field
          v-model="email"
          :error-messages="errors"
          type="email"
          label="Email"
          placeholder="Email"
          prepend-inner-icon="mdi-email-outline"
          outlined
          class="required" />
      </validation-provider>
      <div class="d-flex">
        <v-btn @click="$router.go(-1)" tag="a" text class="px-1">
          <v-icon>mdi-chevron-left</v-icon>
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="showMessage"
          type="submit"
          color="primary darken-1">
          Send reset email
        </v-btn>
      </div>
    </validation-observer>
    <v-btn v-else @click.stop="resetInput" text>
      Retry
    </v-btn>
  </div>
</template>

<script>
import { delay } from 'bluebird';
import { mapActions } from 'vuex';

const getDefaultData = () => ({
  email: '',
  showMessage: false,
  error: null
});

export default {
  data: () => getDefaultData(),
  methods: {
    ...mapActions(['forgotPassword']),
    submit() {
      this.showMessage = true;
      Promise.all([this.forgotPassword({ email: this.email }), delay(5000)])
        .then(() => this.$router.push('/'))
        .catch(() => (this.error = 'Something went wrong!'));
    },
    resetInput() {
      Object.assign(this, getDefaultData());
    }
  }
};
</script>
