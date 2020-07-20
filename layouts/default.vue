<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
      fixed
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="item.onClick"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      fixed
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <SetupModal :show="showSetupModal" @close="showSetupModal = false" />
    <v-main class="grey">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      showSetupModal: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Setup',
          onClick: () => { this.showSetupModal = true }
        }
      ],
      title: 'CodeRcar'
    }
  }
}
</script>
