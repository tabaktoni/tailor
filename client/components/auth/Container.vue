<template>
  <div class="auth-container">
    <div class="auth-panel elevation-2">
      <div class="auth-header py-8">
        <v-avatar size="50" color="blue-grey darken-3" class="my-1 pa-2">
          <img :src="logo" alt="Logo" class="logo">
        </v-avatar>
        <h1 class="ma-0 headline primary--text text--darken-1">{{ title }}</h1>
      </div>
      <div class="auth-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title: () => BRAND_CONFIG.TITLE,
    logo: () => BRAND_CONFIG.LOGO_FULL
  }
};
</script>

<style lang="scss">
.auth-container {
  padding-top: 5%;
}

.auth-panel {
  width: 26.5rem;
  margin: auto;
  background-color: #fff;
  border-radius: 4px;
  border-top: 4px solid var(--v-primary-darken1);

  .auth-header {
    padding-bottom: 0;

    .logo {
      width: 2.75rem;
    }
  }

  .auth-body {
    padding: 0.25rem 1.5rem 0.875rem;

    a {
      color: inherit;
      font-weight: 400;
    }
  }
}
</style>
