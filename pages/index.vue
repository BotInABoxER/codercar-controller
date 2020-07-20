<template>
  <v-layout>
    <v-container>
      <WebsocketHandler v-if="websocketURL && websocketPort" :url="websocketURL" :port="websocketPort" :message="websocketMessage" />
      <GamepadHandler @gamepadEvent="onGamepadEvent" />
      <SensorReadout />
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    websocketURL: '192.168.10.96',
    websocketPort: 8080,
    websocketMessage: ''
  }),
  methods: {
    onGamepadEvent (gamepadState) {
      this.websocketMessage = JSON.stringify(gamepadState)
    }
  }
}
</script>
