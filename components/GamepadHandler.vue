<template>
  <section class="gamepad-handler">
    <v-card v-if="gamepads.length === 0" color="primary">
      <v-card-title class="justify-center headline">
        Connect a game controller!
      </v-card-title>
      <v-card-text class="text-center">
        <p class="headline">
          Then, press a button/move an axis on your controller to start! :]
        </p>
      </v-card-text>
    </v-card>
    <v-card v-for="(gamepad, gamepadIndex) in gamepads" :key="`gamepad-${gamepadIndex}`" class="my-4">
      <div v-if="gamepad">
        <v-card-title>{{ gamepad.id }}</v-card-title>
        <v-col class="justify-center">
          <v-row>
            <v-card-actions v-for="(axis, axisIndex) in gamepad.axes" :key="`axis-${axisIndex}`" class="my-3 mr-10 text-center">
              <v-slider
                class="mr-6"
                :value="axis"
                vertical
                :hint="`Axis ${axisIndex} on Gamepad ${gamepadIndex}`"
                ticks
                :tick-size="0.1"
                :step="0.1"
                dense
                :label="axis < 0 ? `Axis ${axisIndex} on Gamepad ${gamepadIndex}: \xa0${axis}` : `Axis ${axisIndex} on Gamepad ${gamepadIndex}: +${parseFloat(Math.abs(axis)).toFixed(2)}`"
                max="1"
                min="-1"
                readonly
              />
            </v-card-actions>
          </v-row>
        </v-col>
        <hr />
        <span v-for="(button, buttonIndex) in gamepad.buttons" :key="`button-${buttonIndex}`" class="justify-center mx-4">
          <strong v-if="buttonIndex >= 10">Button {{ buttonIndex }}:</strong>
          <strong v-else>Button {{ buttonIndex }}:</strong>
          <v-icon v-if="button" x-large :class="buttonIndex >= 10 ? 'ml-4' : 'ml-6'" color="primary">
            mdi-checkbox-intermediate
          </v-icon>
          <v-icon v-else x-large :class="buttonIndex >= 10 ? 'ml-4' : 'ml-6'" color="primary">
            mdi-checkbox-blank-outline
          </v-icon>
        </span>
      </div>
    </v-card>
  </section>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
import isEqual from 'lodash/isEqual'

export default {
  data: () => ({
    gamepads: []
  }),
  watch: {
    gamepads () {
      this.$emit('gamepadEvent', this.gamepads)
    }
  },
  mounted () {
    window.addEventListener('gamepadconnected', this.onGamepadConnect)
    window.addEventListener('gamepaddisconnected', this.onGamepadDisconnect)
  },
  methods: {
    onGamepadConnect () {
      this.pollGamepads()
    },
    onGamepadDisconnect (event) {},
    pollGamepads () {
      setInterval(() => {
          let gamepadsObject = []

          for (let i = 0; i < navigator.getGamepads().length; i++) {
            if (navigator.getGamepads()[i] && navigator.getGamepads()[i] !== null) {
              let listOfButtons = navigator.getGamepads()[i].buttons
              let buttonsObject = []

              let listOfAxes = navigator.getGamepads()[i].axes
              let axesObject = []

              for (let j = 0; j < listOfButtons.length; j++) {
                buttonsObject.push(listOfButtons[j].pressed)
              }

              for (let k = 0; k < listOfAxes.length; k++) {
                const axisValue = parseFloat(listOfAxes[k]).toFixed(2)
                axesObject.push(axisValue)
              }

              gamepadsObject[i] = { id: navigator.getGamepads()[i].id, axes: axesObject, buttons: buttonsObject }
            }
            if (!isEqual(gamepadsObject, this.gamepads)) {
              this.gamepads = gamepadsObject
            }
        }
      }, 100)
    }
  }
}
</script>
