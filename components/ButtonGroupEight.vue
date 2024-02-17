<template>
  <v-container>
    <v-row align="center">
      <v-card-p>OUT1:</v-card-p>
      <v-btn-toggle v-model="toggle_exclusive" group>
        <v-btn outlined="true" color="black" @click="reboot">IN1</v-btn>
        <v-btn outlined="true" color="black" @click="reboot">IN2</v-btn>
        <v-btn outlined="true" color="black" @click="reboot">IN3</v-btn>
        <v-btn outlined="true" color="black" @click="reboot">IN4</v-btn>
        <v-btn outlined="true" color="black" @click="reboot">IN5</v-btn>
        <v-btn outlined="true" color="black" @click="reboot">IN6</v-btn>
        <v-btn outlined="true" color="black" @click="reboot">IN7</v-btn>
        <v-btn outlined="true" color="black" @click="reboot">IN8</v-btn>
      </v-btn-toggle>
    </v-row>
  </v-container>
</template>
