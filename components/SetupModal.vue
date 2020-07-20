<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title class="headline">Setup WebSockets Connection</v-card-title>
      <v-card-text>Before you can control your CodeRcar, you'll have to connect to it.</v-card-text>
      <v-card-text>Enter your Raspberry Pi's local IP address and the port of your WebSockets server below:</v-card-text>
      <v-row justify="center">
        <v-col cols="12" sm="6">
      <v-text-field
            label="IP Address"
            filled
          ></v-text-field>
            <v-text-field
            label="Port Number"
            filled
          ></v-text-field>
      </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close')">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
.v-dialog {
  overflow-x: hidden !important;
}
</style>
