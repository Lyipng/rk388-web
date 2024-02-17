<template>
  <v-container>
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <div style="width: 200px; height: 720px; margin-right: 20px">
        <div
          style="
            width: 200px;
            height: 20px;
            margin-bottom: 10px;
            display: flex;
            font-size: 20px;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          "
        >
          Encoder
        </div>
        <div
          style="
            width: 200px;
            height: 700px;
            border: 4px solid #787878;
            border-radius: 10px;
            overflow-y: auto;
          "
        >
          <div
            style="
              width: 160px;
              height: 60px;
              border-width: 4px;
              border-style: solid;
              border-radius: 8px;
              margin: auto;
              margin-top: 10px;
              font-size: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              user-select: none;
              cursor: pointer;
            "
            v-for="(item, index) in txInfo"
            :key="index"
            :style="{
              borderColor: item.color,
              backgroundColor: item.streamAddr != '' ? '#0bdc00' : '#6d6d6d',
            }"
            @click="selectItem([1, index])"
          >
            {{ item.deviceMac }}
          </div>
        </div>
      </div>
      <div style="width: 900px; height: 720px; margin-right: 20px">
        <div
          style="
            width: 900px;
            height: 20px;
            margin-bottom: 10px;
            display: flex;
            font-size: 20px;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          "
        >
          Decoder
        </div>
        <div
          style="
            width: 900px;
            height: 700px;
            border: 4px solid #787878;
            border-radius: 10px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            overflow: auto;
            align-content: flex-start;
          "
        >
          <div
            style="
              width: 160px;
              height: 65px;
              border: 4px solid;
              border-radius: 8px;
              margin: 6px;
              font-size: 15px;
              display: flex;
              padding: 8px;
              user-select: none;
              cursor: pointer;
            "
            v-for="(item, index) in rxInfo"
            :key="index"
            :style="{
              borderColor: item.color,
              backgroundColor:
                item.deviceMac != selectTxMac
                  ? item.sourceMac != ''
                    ? '#0bdc00'
                    : '#787878'
                  : '#787878',
            }"
            @click="selectItem([2, index])"
          >
            <div style="display: flex; flex-direction: column">
              <div style="text-decoration: underline">{{ item.deviceMac }}</div>
              <div style="margin-top: 2px">{{ item.sourceMac }}</div>
            </div>
          </div>
        </div>
      </div>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      rxInfo: [],
      txInfo: [
        {
          deviceMac: "aaaaaaa",
          streamAddr: "",
          sourceMac: "",
          sourceAddr: "",
          streams_index: 0,
          color: "#c9c9c9",
          sub_index: [],
        },
        {
          deviceMac: "bbbbbbbb",
          streamAddr: "",
          sourceMac: "",
          sourceAddr: "",
          streams_index: 0,
          color: "#c9c9c9",
          sub_index: [],
        },
        {
          deviceMac: "ccccccc",
          streamAddr: "",
          sourceMac: "",
          sourceAddr: "",
          streams_index: 0,
          color: "#c9c9c9",
          sub_index: [],
        },
        {
          deviceMac: "ddddddddd",
          streamAddr: "",
          sourceMac: "",
          sourceAddr: "",
          streams_index: 0,
          color: "#c9c9c9",
          sub_index: [],
        },
        {
          deviceMac: "eeeeeeeeee",
          streamAddr: "",
          sourceMac: "",
          sourceAddr: "",
          streams_index: 0,
          color: "#c9c9c9",
          sub_index: [],
        },
      ],
      selectTxIndex: 0,
      addrNum: 0,
      selectTxMac: "",
    };
  },

  created() {
    var that = this;
    this.getDeviceInf(that);
  },
  destroyed() {},
  mounted() {},
  computed: {},
  methods: {
    leaveAllDevice(data) {
      // console.log("leave data", data);
      axios
        .post("http://" + location.host + "/api/device/" + data[0], {
          cmd: {
            op: "leave",
            type: "HDMI",
            index: data[1],
          },
        })
        .then(function (respone) {
          console.log("leave all success");
        })
        .catch(function (error) {
          console.log("error tx", error);
        });
    },

    initInfo() {
      for (let i = 0; i < 45; i++) {
        this.rxInfo.push({
          locat: i,
          deviceMac: "",
          streamAddr: "",
          sourceMac: "",
          sourceAddr: "",
          streams_index: 0,
          color: "#c9c9c9",
        });
      }
      for (let i = 0; i < 10; i++) {
        this.txInfo.push({
          locat: i,
          deviceMac: "",
          streamAddr: "",
          sourceMac: "",
          sourceAddr: "",
          streams_index: 0,
          color: "#c9c9c9",
        });
      }
    },

    selectItem(data) {
      // var that = this;
      if (data[0] == 1) {
        //  selece tx
        this.txInfo[this.selectTxIndex].color = "#c9c9c9";
        this.selectTxIndex = data[1];
        this.selectTxMac = this.txInfo[data[1]].deviceMac;
        if (this.txInfo[data[1]].color == "#c9c9c9") {
          this.txInfo[data[1]].color = "#a30000";
          for (let i in this.rxInfo) {
            this.rxInfo[i].color = "#c9c9c9";
            if (this.rxInfo[i].sourceMac == this.txInfo[data[1]].deviceMac) {
              this.rxInfo[i].color = "#a30000";
            }
          }
        } else if (this.txInfo[data[1]].color == "#a30000") {
          console.log("#a30000");
          this.txInfo[data[1]].color = "#c9c9c9";
        }

        // var addr = this.txInfo[data[1]].streamAddr;
        if (this.txInfo[data[1]].streamAddr == "") {
          this.txInfo[data[1]].streamAddr = "225.0.0." + (this.addrNum + 1);
          this.addrNum += 1;
          this.startTx([
            this.txInfo[data[1]].deviceMac,
            this.txInfo[data[1]].streamAddr,
          ]);
        }
        console.log("this.txInfo[data[1]]", this.txInfo[data[1]]);
      } else if (data[0] == 2) {
        //  selece rx
        if (
          this.txInfo[this.selectTxIndex].deviceMac !=
          this.rxInfo[data[1]].deviceMac
        ) {
          this.rxInfo[data[1]].color = "#a30000";
          this.rxInfo[data[1]].sourceMac =
            this.txInfo[this.selectTxIndex].deviceMac;
          for (let a in this.rxInfo[data[1]].sub_index) {
            this.leaveAllDevice([
              this.rxInfo[data[1]].deviceMac,
              this.rxInfo[data[1]].sub_index[a],
            ]);
          }
          this.joinRx([
            this.rxInfo[data[1]].deviceMac,
            this.txInfo[this.selectTxIndex].streamAddr,
            this.txInfo[this.selectTxIndex].deviceMac,
          ]);
        }
      }
    },

    startTx(data) {
      console.log("start data:" + data);
      axios
        .post("http://" + location.host + "/api/device/" + data[0], {
          cmd: {
            op: "start",
            type: "HDMI",
            index: 0,
            address: data[1],
            enc_param: "gop=48 rc-mode=vbr bps=200000000",
          },
        })
        .then(function (respone) {
          console.log("respone:", respone.data);
        })
        .catch(function (error) {
          console.log("error tx", error);
        });
    },

    saveInf() {
      axios
        .post("http://" + location.host + "/api/device/all", {
          cmd: {
            op: "save",
          },
        })
        .then(function (response) {
          console.log("success", response);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    joinRx(data) {
      var that = this;
      // console.log(data);
      axios
        .post("http://" + location.host + "/api/device/" + data[0], {
          cmd: {
            op: "join",
            type: "HDMI",
            index: 0,
            address: data[1],
            display_mode: "GENLOCKED",
            source_device: data[2],
            rect: { x: 0, y: 0, width: 3840, height: 2160 },
          },
        })
        .then(function (respone) {
          console.log("respone set rx:", respone.data);
          that.saveInf();
        })
        .catch(function (error) {
          console.log("error rx", error);
        });
    },

    getDeviceInf(that) {
      axios
        .post("http://" + location.host + "/api/device/all", {
          cmd: {
            op: "get",
            subset: "settings",
          },
        })
        .then(function (respone) {
          console.log("respone1:", respone.data);
          that.getDevice(that, respone.data.request_id);
        })
        .catch(function (error) {
          console.log("error1", error);
        });
    },

    getDevice(that, id) {
      axios
        .get("http://" + location.host + "/api/request/" + id)
        .then(function (respone) {
          console.log(respone.data.result.devices);
          // that.initInfo();
          var temp = respone.data.result.devices;
          for (const k in temp) {
            var device = {
              deviceMac: temp[k].device_id,
              streamAddr: "",
              sourceMac: "",
              sourceAddr: "",
              streams_index: 0,
              color: "#c9c9c9",
              sub_index: [],
            };
            if (temp[k].streams.length != 0) {
              for (const a in temp[k].streams) {
                if (
                  temp[k].streams[a].type == "HDMI" &&
                  temp[k].streams[a].status.state == "STREAMING"
                ) {
                  device.streams_index = temp[k].streams[a].index;
                  device.streamAddr = temp[k].streams[a].configuration.address;
                  if (device.streamAddr != "") {
                    var tmp = device.streamAddr.split(".");
                    if (that.addrNum < parseInt(tmp[tmp.length - 1]))
                      that.addrNum = parseInt(tmp[tmp.length - 1]);
                  }
                }
              }
            }
            if (temp[k].subscriptions.length != 0) {
              for (let a in temp[k].subscriptions) {
                if (temp[k].subscriptions[a].source_device != device.sourceMac)
                  device.sub_index.push(temp[k].subscriptions[a].index);
              }
              if (temp[k].subscriptions[0].source_device)
                device.sourceMac = temp[k].subscriptions[0].source_device;
              if (temp[k].subscriptions[0].configuration.address)
                device.sourceAddr =
                  temp[k].subscriptions[0].configuration.address;
            }
            that.txInfo.push({ ...device });
            that.rxInfo.push({ ...device });
          }
          console.log("success", JSON.stringify(that.rxInfo));
          console.log("success", JSON.stringify(that.txInfo));
          // that.$forceUpdate();
        })
        .catch(function (error) {
          console.log("error2", error);
        });
    },
  }, //method
  head: {
    title: "Matrix",
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
  
  