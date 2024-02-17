<template style="margin:0px">
  <v-container class="container-override">
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <div style="width: 200px; height: 785px; margin-right: 20px">
        <div
          style="
            width: 200px;
            height: 20px;
            display: flex;
            font-size: 20px;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-bottom: 5px;
          "
        >
          Encoder
        </div>
        <div
          style="
            width: 200px;
            height: 775px;
            border: 4px solid #787878;
            background-color: #282828;
            border-radius: 10px;
            overflow-y: auto;
          "
        >
          <div
            style="
              width: 160px;
              height: 60px;
              border-width: 2px;
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
            draggable="true"
            v-for="(item, index) in txInfo"
            :key="index"
            :style="{
              borderColor: item.color,
              backgroundColor: item.streamAddr != '' ? '#0bdc00' : '#6d6d6d',
            }"
            @dragend="drag_end"
            @dragstart="drag_start([item.deviceMac, item.streamAddr])"
          >
            {{ item.deviceMac }}
          </div>
        </div>
      </div>

      <div>
        <v-col cols="12" style="overflow-x: auto">
          <!-- set multiview parameter -->
          <div
            style="
              width: 1170px;
              background: #282828;
              border-radius: 8px;
              font-size: 18px;
              margin-top: 10px;
              padding: 10px;
            "
          >
            <v-row no-gutters align="center">
              <div
                style="
                  font-size: 18px;
                  margin-left: 15px;
                  width: 120px;
                  background: #282828;
                "
              >
                Multiview Rx:
              </div>
              <div style="margin-left: 15px; width: 170px; background: #282828">
                <v-select v-model="select_rxmac" :items="rxmac"> </v-select>
              </div>
              <v-spacer></v-spacer>
              <v-btn
                light
                style="width: 100px; margin-right: 5px"
                color="primary"
                @click="applyMultiview"
                >Apply</v-btn
              >
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" style="overflow-x: auto">
          <v-row no-gutters style="overflow: hidden">
            <div
              id="dragview"
              style="
                width: 1170px;
                height: 665px;
                border-style: solid;
                border-width: 2px;
                border-radius: 10px;
                border-color: #787878;
                background: #282828;
              "
            >
              <div
                style="
                  width: 3841px;
                  height: 2161px;
                  border: 1px rgb(146, 146, 146) solid;
                  position: relative;
                  top: 20px;
                  left: 25px;
                  background-image: url('/icon/back_pic.jpg');
                  background-size: 100%;
                  background-repeat: 'no-repeat';
                "
                :style="{
                  zoom: zoomlevel + '%',
                }"
                v-if="all_vpm_data"
              >
                <!-- output 1 -->
                <vue-draggable-resizable
                  v-for="(item, key) in all_vpm_data"
                  parent
                  :key="key"
                  :draggable="true"
                  :rotatable="false"
                  :resizable="true"
                  :x="item.x"
                  :y="item.y"
                  :z="item.zindex"
                  :w="item.w"
                  :h="item.h"
                  :handles="['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']"
                  :handle-info="{ size: 10, offset: -5, switch: true }"
                  :scaleRatio="zoomlevel / 100"
                  @dragging="(x, y) => right_ondrag({ x, y }, key)"
                  @resizing="
                    (x, y, w, h) => right_onresize({ x, y, w, h }, key)
                  "
                  style="border: 7px solid; user-select: none"
                  :style="{ borderColor: item.color ? 'red' : 'black' }"
                >
                  <div
                    slot="tl"
                    style="width: 30px; height: 30px; cursor: se-resize"
                  ></div>
                  <div
                    slot="tm"
                    style="width: 30px; height: 30px; cursor: s-resize"
                  ></div>
                  <div
                    slot="tr"
                    style="width: 30px; height: 30px; cursor: ne-resize"
                  ></div>
                  <div
                    slot="ml"
                    style="width: 30px; height: 30px; cursor: w-resize"
                  ></div>
                  <div
                    slot="mr"
                    style="width: 30px; height: 30px; cursor: w-resize"
                  ></div>
                  <div
                    slot="bl"
                    style="width: 30px; height: 30px; cursor: ne-resize"
                  ></div>
                  <div
                    slot="bm"
                    style="width: 30px; height: 30px; cursor: s-resize"
                  ></div>
                  <div
                    slot="br"
                    style="width: 30px; height: 30px; cursor: se-resize"
                  ></div>

                  <div
                    style="width: 100%; height: 100%; overflow: hidden"
                    @mousedown="right_view_click(key)"
                  >
                    <!-- 左上角位置大小信息 -->
                    <div
                      style="
                        color: yellow;
                        font-size: 60px;
                        height: 30px;
                        margin-left: 5px;
                        margin-top: 5px;
                      "
                    >
                      X:&nbsp;{{ item.x }}&nbsp;&nbsp; Y:&nbsp;{{ item.y }}
                      <br />
                      Width:&nbsp;{{ item.w }} &nbsp;&nbsp; Height:&nbsp;{{
                        item.h
                      }}
                      <br />
                      Source Device:&nbsp; {{ item.sourceMac }}
                    </div>
                    <v-row no-gutters align="center">
                      <div
                        style="
                          font-size: 160px;
                          position: absolute;
                          left: 50%;
                          top: 50%;
                          transform: rotate(0deg) translate(-50%, -50%);
                        "
                        :style="{
                          'z-index': item.zindex,
                          color: item.color ? 'red' : 'green',
                        }"
                      >
                        {{ key + 1 }}
                      </div>
                      <div
                        style="
                          position: absolute;
                          left: 96%;
                          top: 6%;
                          transform: rotate(0deg) translate(-50%, -50%);
                          /* background-color: #282828; */
                          height: 80px;
                          width: 80px;
                        "
                        :style="{
                          'z-index': item.zindex,
                        }"
                      >
                        <v-img
                          src="/icon/x.png"
                          @click="delete_window([key, item.index])"
                        >
                        </v-img>
                      </div>
                    </v-row>
                  </div>
                </vue-draggable-resizable>
              </div>
            </div>
          </v-row>
        </v-col>
      </div>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>


<script>
import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import axios from "axios";

export default {
  data: () => ({
    select_rxmac: "",
    delete_windows: [],
    dragTxIndex: 0,
    showMultiview: false,
    zoomlevel: 30,
    devices: [],
    txInfo: [],
    rxInfo: [],
    rxmac: [],
    all_vpm_data: [],
    sleceMac: "",
    sleceAddr: "",
  }),

  created() {
    var that = this;
    this.getDeviceInf(that);
  },
  destroyed() {},

  mounted() {},

  computed: {},

  methods: {
    delete_window(data) {
      this.delete_windows.push(data[1]);
      this.all_vpm_data.splice(data[0], 1);
    },
    drag_start(data) {
      this.sleceMac = data[0];
      this.sleceAddr = data[1];
    },
    drag_end(event) {
      console.log(event);
      this.$nextTick(() => {
        var dropZone = document.getElementById("dragview");
        if (dropZone) {
          // 获取挂载好的背景图坐标
          var dropZoneRect = dropZone.getBoundingClientRect();
          // 获取鼠标释放时的坐标
          const mouseX = event.clientX;
          const mouseY = event.clientY;
          if (
            mouseX >= dropZoneRect.left &&
            mouseX <= dropZoneRect.right &&
            mouseY >= dropZoneRect.top &&
            mouseY <= dropZoneRect.bottom
          ) {
            var index = this.all_vpm_data.length;
            if (this.delete_windows.length != 0) {
              index = this.delete_windows[0];
              this.delete_windows.splice(0, 1);
            }
            this.all_vpm_data.push({
              sourceMac: this.sleceMac,
              sourceAddr: this.sleceAddr,
              index: index,
              x: 0,
              y: 0,
              h: 1080,
              w: 1920,
              color: false,
              zindex: 1,
            });
            console.log(this.all_vpm_data);
            this.sleceMac = "";
            this.sleceAddr = "";

            console.log("drage end", this.all_vpm_data);
          } else {
            console.log("Dropped outside the drop zone.");
          }
        }
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

    async leaveDevice(index) {
      await axios
        .post("http://" + location.host + "/api/device/" + this.select_rxmac, {
          cmd: {
            op: "leave",
            type: "HDMI",
            index: index,
          },
        })
        .then(function (response) {
          console.log("success", response);
        })
        .catch(function (error) {
          console.log("error", error);
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
              index: 0,
              color: "#c9c9c9",
              sub_index: [],
            };
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
            if (temp[k].streams.length != 0) {
              for (const a in temp[k].streams) {
                if (
                  temp[k].streams[a].type == "HDMI" &&
                  temp[k].streams[a].status.state == "STREAMING"
                ) {
                  device.index = temp[k].streams[a].index;
                  device.streamAddr = temp[k].streams[a].configuration.address;
                  if (device.streamAddr != "") {
                    var tmp = device.streamAddr.split(".");
                    if (that.addrNum < parseInt(tmp[tmp.length - 1]))
                      that.addrNum = parseInt(tmp[tmp.length - 1]);
                  }
                }
              }
            }
            if (device.streamAddr != "") {
              that.txInfo.push({ ...device });
            }
            that.rxmac.push(device.deviceMac);
          }
        })
        .catch(function (error) {
          console.log("error2", error);
        });
    },

    setMultiview(data) {
      //cmd:
      // {
      //  op: "join",
      //  type: "HDMI",
      //  index: 0,
      // source_device :"8212a68b5648",
      // display_mode:"GENLOCKED",
      //  address: "255.0.0.12",
      // aspect ratio mode: "keep"
      //  rect: { x: 0, y: 0, width: 1920, height: 1080 },
      // },
      axios
        .post("http://" + location.host + "/api/device/" + this.select_rxmac, {
          cmd: {
            op: "join",
            type: "HDMI",
            index: data.index,
            source_device: data.sourceMac,
            display_mode: "GENLOCKED",
            address: data.sourceAddr,
            aspect_ratio_mode: "keep",
            rect: { x: data.x, y: data.y, width: data.w, height: data.h },
          },
        })
        .then(function (response) {
          console.log("success", response);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    applyMultiview() {
      if (this.delete_windows.length != 0) {
        for (let k in this.delete_windows) {
          this.leaveDevice(this.delete_windows[k]);
        }
      }
      for (let i in this.all_vpm_data) {
        this.setMultiview(this.all_vpm_data[i]);
      }
      setTimeout(() => {
        this.saveInf();
      }, 1000);
    },

    right_ondrag(e, num) {
      for (var a = 0; a < this.all_vpm_data.length; a++) {
        if (num == a) {
          this.all_vpm_data[a].x = Number(Math.round(e.x));
          this.all_vpm_data[a].y = Number(Math.round(e.y));
          if (e.x < 0) {
            this.all_vpm_data[a].x = 0;
          }
          if (e.y < 0) {
            this.all_vpm_data[a].y = 0;
          }
        }
      }
    },
    right_onresize(e, num) {
      for (var a = 0; a < this.all_vpm_data.length; a++) {
        if (num == a) {
          this.all_vpm_data[a].x = Number(Math.round(e.x));
          this.all_vpm_data[a].y = Number(Math.round(e.y));
          this.all_vpm_data[a].w = Number(Math.round(e.w));
          this.all_vpm_data[a].h = Number(Math.round(e.h));
          if (e.x < 0) {
            this.all_vpm_data[a].x = 0;
          }
          if (e.y < 0) {
            this.all_vpm_data[a].y = 0;
          }
        }
      }
    },
    right_view_click(num) {
      for (var a = 0; a < this.all_vpm_data.length; a++) {
        if (num == a) {
          this.all_vpm_data[a].color = true;
          this.all_vpm_data[a].zindex = 2;
        } else {
          this.all_vpm_data[a].color = false;
          this.all_vpm_data[a].zindex = 1;
        }
      }
    },

    input_limit(index) {
      if (this.all_vpm_data[index].w1 > 3840) {
        this.all_vpm_data[index].w1 = 3840;
      }
      if (this.all_vpm_data[index].h1 > 2160) {
        this.all_vpm_data[index].h1 = 2160;
      }
      if (this.all_vpm_data[index].w2 > 3840) {
        this.all_vpm_data[index].w2 = 3840;
      }
      if (this.all_vpm_data[index].h2 > 2160) {
        this.all_vpm_data[index].h2 = 2160;
      }
      if (this.all_vpm_data[index].x1 > 3840) {
        this.all_vpm_data[index].x1 = 3840;
      }
      if (this.all_vpm_data[index].y1 > 2160) {
        this.all_vpm_data[index].y1 = 2160;
      }
      if (this.all_vpm_data[index].x2 > 3840) {
        this.all_vpm_data[index].x2 = 3840;
      }
      if (this.all_vpm_data[index].y2 > 2160) {
        this.all_vpm_data[index].y2 = 2160;
      }
      if (this.all_vpm_data[index].w1 < 0) {
        this.all_vpm_data[index].w1 = 0;
      }
      if (this.all_vpm_data[index].h1 < 0) {
        this.all_vpm_data[index].h1 = 0;
      }
      if (this.all_vpm_data[index].w2 < 0) {
        this.all_vpm_data[index].w2 = 0;
      }
      if (this.all_vpm_data[index].h2 < 0) {
        this.all_vpm_data[index].h2 = 0;
      }
      if (this.all_vpm_data[index].x1 < 0) {
        this.all_vpm_data[index].x1 = 0;
      }
      if (this.all_vpm_data[index].y1 < 0) {
        this.all_vpm_data[index].y1 = 0;
      }
      if (this.all_vpm_data[index].x2 < 0) {
        this.all_vpm_data[index].x2 = 0;
      }
      if (this.all_vpm_data[index].y2 < 0) {
        this.all_vpm_data[index].y2 = 0;
      }
    },
    ws_open() {
      let self = this;
      this.wsconn = new WebSocket("ws://" + location.host + "/ws/uart");
      this.wsconn.onmessage = function (event) {};
      this.wsconn.onopen = function (event) {
        // if (self.wsconn) {
        //   //IN
        //   self.wsconn.send("\r\nA00 GET IN0 TMDS\r\n");
        //   self.wsconn.send("\r\nA00 GET IN0 EDID\r\n");
        //   self.wsconn.send("\r\nA00 GET IN0 EXMX MODE\r\n");
        //   self.wsconn.send("\r\nA00 GET IN0 SIG STA\r\n");
        //   //HDMI
        //   self.wsconn.send("\r\nA00 GET OUT0 VPIPM\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 ASPR\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 STREAM\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 SGMT\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 VIDEO\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 CSC MODE\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 HA MUTE\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 HPD\r\n");
        //   //HDBT
        //   self.wsconn.send("\r\nA00 GET OUT0 TP STREAM\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 TP SGM\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 TP VIDEO\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 TP CSC MODE\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 TP HA MUTE\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 TP HPD\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 LR MODE\r\n");
        //   //AUDIO
        //   self.wsconn.send("\r\nA00 GET EXAMX MODE\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 EXA\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 EXAUD LEV\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 EXEQ MODE\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 EXA LVL\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 EXA RVL\r\n");
        //   self.wsconn.send("\r\nA00 GET OUT0 EXADL PH\r\n");
        //   //MULTIVIEW AUDIO
        //   self.wsconn.send("\r\nA00 GET MVAUD IN\r\n");
        //   //Dolby Settings
        //   self.wsconn.send("\r\nA00 GET DLB MAT\r\n"); // Get MAT support
        //   self.wsconn.send("\r\nA00 GET DV2SL\r\n"); // Get DV LL require
        //   self.wsconn.send("\r\nA00 GET VPPIN\r\n"); // Get DV LL require
        // }
        console.log("Successfully connected");
      };
      this.wsconn.onclose = function (event) {
        console.log("connection closed");
      };
      this.wsconn.onerror = function (event) {
        console.log("connection error");
      };
    },

    ws_close() {
      this.wsconn.close();
      this.wsconn.onmessage = null;
      this.wsconn.onopen = null;
      this.wsconn.onclose = null;
      this.wsconn.onerror = null;
      this.wsconn = null;
    },
  }, // end Methods
  head: {
    title: "Multiview",
  },
  components: {
    VueSlider,
    VueDraggableResizable,
  },
};
</script>

<style scoped>
.v-select {
  font-size: 0.9em;
}
</style>
<style>
.vue-slider-process {
  background-color: rgb(34, 139, 34);
}
.container {
  max-width: 100%;
}
</style>
