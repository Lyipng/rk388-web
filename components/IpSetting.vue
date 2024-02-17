<template>
  <v-form v-model="valid" lazy-validation>
  <v-card-text>{{title}}</v-card-text>
    <v-select
      v-model="ipmode"
      :items="modes"
      @change="static = ipmode=='static'"
      label="Ip Mode"
    />

    <span v-if="static">
    <v-text-field
      v-model="address"
      name="address"
      label="address"
      :rules="ipRules"
    />

    <v-text-field
      v-model="netmask"
      name="netmask"
      label="netmask"
      :rules="ipRules"
    />

    <v-text-field
      v-model="gateway"
      name="gateway"
      label="gateway"
      :rules="ipRules"
    />
    </span>
    <v-btn color="warning" :disabled="disabled || !valid" @click="apply">Apply</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    title: "",
    config: "",
    disabled: false,
  },

  created() {
    this.$store.dispatch('init');
  },

  mounted() {
    setTimeout(()=>{
      let value = this.config;
      if (!value) return;
      value = value.match(/[\w\.]+/g);
      this.ipmode  = value[0];
      this.address = value[1];
      this.netmask = value[2];
      this.gateway = value[3];
      this.static = this.ipmode == 'static';
    }, (this.config) ? 0: 500);
  },

  methods: {
    apply() {
      let value = this.ipmode;
      if (this.static) {
        if(!this.address)
          return alert("No static ip address!");
        value = value + ':' + this.address;
        if (this.netmask) {
          value = value + ':' + this.netmask;
          if (this.gateway)
            value = value + ':' + this.gateway;
        }
      }
      if (!confirm("Confirm network setting!")) return;
      this.$emit('update', value);
    },
  },

  data: () => ({
    static: false,
    valid: false,

    ipRules: [
      v => !v || /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v) || 'Invalid IP address',
    ],

    modes: [
      'autoip',
      'dhcp',
      'static'
    ],

    ipmode: 'autoip',
    address: '',
    netmask: '',
    gateway: ''
  })
};
</script>
