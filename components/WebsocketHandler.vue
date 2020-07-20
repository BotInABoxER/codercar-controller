<template>
  <v-row justify="center">
    <v-col md="8" lg="5">
      <v-banner two-line color="#000">
        <v-avatar
          slot="icon"
          :color="statusColour"
          size="50"
        >
          <v-icon color="white">
            mdi-robot
          </v-icon>
        </v-avatar>

        <strong>Robot Status: </strong>

        <v-chip :color="statusColour">
          <span v-if="statusColour === 'info'">
            Connected
          </span>
          <span v-else-if="statusColour === 'primary'">
            Disconnected
          </span>
          <span v-else>
            Error
          </span>
        </v-chip>

        <template v-if="statusColour === 'error'" v-slot:actions="{ retry }">
          <v-btn
            text
            color="primary"
            @click="retry"
          >
            Retry
          </v-btn>
        </template>
      </v-banner>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    port: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: false
    }
  },
  data: () => ({
    websocket: null,
    statusColour: 'primary'
  }),
  watch: {
    message(newMessage) {
      this.sendData(newMessage)
    }
  },
  mounted () {
      this.websocket = new WebSocket(`ws://${this.url}:${this.port}/`)
      this.statusColour = 'info'

      // eslint-disable-next-line handle-callback-err
      this.websocket.onerror = (error) => {
        this.statusColour = 'error'
        console.error(`
//////////

Couldn't connect to your Raspberry Pi's websocket server.
Make sure the server is running and the address/port are correct.

- Address: ${this.url}
- Port: ${this.port}

//////////
`)

        this.websocket.onclose = () => {
          console.log('closed')
          this.statusColour = 'primary'
        }
      }
  },
  methods: {
    sendData (dataToSend) {
      if (this.websocket.readyState === 1) {
        this.websocket.send(dataToSend)
        console.log(`Sent data to ws://${this.url}:${this.port}/`)
      }
    }
  }
}
// ws://192.168.10.96:8080/
</script>
