<template>
  <v-container style="overflow-x: auto">
    <v-col>
      <v-data-table
        :headers="headers"
        :items="deviceInfo"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.addr`]="{ item }">
          <!-- @keyup.enter="uart_put([0x8001, item.port, item.label])"
          @blur.native.capture="uart_put([0x8001, item.port, item.label])" -->
          <div style="width: 250px; display: flex; flex-direction: row">
            <v-text-field
              style="font-size: 0.875rem"
              v-model="item.addr"
              single-line
              dense
              counter
              maxlength="15"
            >
            </v-text-field>
            <v-btn
              style="margin-top: 10px; margin-left: 10px; font-size: 13px"
              @click="commad_set([1, item.mac, item.addr])"
              color="primary"
              small
            >
              start
            </v-btn>
            <v-btn
              style="margin-top: 10px; margin-left: 10px; font-size: 13px"
              @click="commad_set([2, item.mac, item.addr])"
              color="primary"
              small
            >
              stop
            </v-btn>
          </div>
        </template>

        <template v-slot:[`item.type`]="{ item }">
          <v-row>
            <div
              v-for="(type, index) in item.type"
              :key="index"
              style="
                border-radius: 8px;
                width: auto;
                height: 25px;
                padding: 2px;
                background-color: rgb(105, 105, 105);
                margin-right: 5px;
              "
            >
              {{ type }}
            </div>
          </v-row>
        </template>

        <template v-slot:[`item.sourceMac`]="{ item }">
          <v-row>
            <div
              v-for="(type, index) in item.sourceMac"
              :key="index"
              style="
                border-radius: 5px;
                width: auto;
                height: 25px;
                padding: 2px;
                background-color: rgb(105, 105, 105);
                margin-right: 5px;
              "
            >
              {{ type }}
            </div>
          </v-row>
        </template>
      </v-data-table>
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </v-col>
  </v-container>
</template>


<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.webauth.usersecure && !store.state.webuser.loggedin) {
      store.state.webredirect = "/matrix";
      return redirect("/login");
    }
  },

  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    comboxType: [
      { text: "None", value: 0 },
      { text: "Decoder", value: 1 },
      { text: "Encoder", value: 2 },
    ],
    headers: [
      { text: "Devices", value: "mac" },
      { text: "Address", value: "addr" },
      { text: "Streaming Type", value: "type" },
      { text: "Source Device", value: "sourceMac" },
      { text: "Device IP", value: "ip" },
    ],
    deviceInfo: [],
    addrNum: 0,
  }),

  created() {
    this.getDeviceInf();
  },
  destroyed() {},
  mounted() {},
  computed: {
    audioMode: {
      get() {
        return this.$store.state.audioMode;
      },
      set(v) {
        this.$store.commit("audioMode", v);
      },
    },
    ...mapState([
      "incount",
      "outcount",
      "inputsID",
      "outputsVideoID",
      "outputsAudioID",
    ]),
  },
  methods: {
    commad_set(data) {
      // set tx
      console.log(data);
      if (data[0] == 1) {
        axios
          .post("http://" + location.host + "/api/device/" + data[1], {
            cmd: {
              op: "start",
              type: "HDMI",
              index: 0,
              address: data[2],
              enc_param: "gop=48 rc-mode=vbr bps=200000000",
            },
          })
          .then(function (respone) {
            console.log("respone:", respone.data);
          })
          .catch(function (error) {
            console.log("error", error);
          });
      } else if (data[0] == 2) {
        axios
          .post("http://" + location.host + "/api/device/" + data[1], {
            cmd: {
              op: "stop",
              type: "HDMI",
              index: 0,
            },
          })
          .then(function (respone) {
            console.log("respone:", respone.data);
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }
    },
    getDeviceInf() {
      var that = this;
      axios
        .post("http://" + location.host + "/api/device/all", {
          cmd: {
            op: "get",
            subset: "settings",
          },
        })
        .then(function (respone) {
          console.log("respone1:", respone.data);
          that.getDevice(respone.data.request_id);
        })
        .catch(function (error) {
          console.log("error1", error);
        });
    },
    getDevice(id) {
      var that = this;
      axios
        .get("http://" + location.host + "/api/request/" + id)
        .then(function (respone) {
          console.log(respone.data.result.devices);
          var temp = respone.data.result.devices;
          for (const k in temp) {
            var device = {
              mac: temp[k].device_id,
              type: [],
              sourceMac: [],
              addr: "",
              ip: "",
            };
            if (temp[k].streams.length != 0) {
              for (let a in temp[k].streams) {
                if (temp[k].streams[a].status.state == "STREAMING") {
                  device.type.push(temp[k].streams[a].type);
                  device.addr = temp[k].streams[a].configuration.address;
                }
              }
            }
            if (temp[k].subscriptions.length != 0) {
              for (let a in temp[k].subscriptions) {
                if (
                  temp[k].subscriptions[a].source_device != device.sourceMac &&
                  temp[k].subscriptions[a].status.state == "STREAMING"
                )
                  device.sourceMac.push(temp[k].subscriptions[a].source_device);
              }
            }
            device.ip = temp[k].nodes[0].status.ip.address;
            that.deviceInfo.push(device);
            console.log(that.deviceInfo);
          }
        })
        .catch(function (error) {
          console.log("error2", error);
        });
    },
    ...mapActions(["post", "reload"]),
  }, //method
  head: {
    title: "Devices",
  },
};
</script>

<style scoped>
.row {
  margin: auto;
}
</style>

<style>
.v-slide-group__prev {
  display: none !important;
}
</style>

