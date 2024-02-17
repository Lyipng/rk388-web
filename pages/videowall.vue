<template >
  <v-container fluid>
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <!-- Tx -->
      <v-col>
        <div
          style="
            width: 220px;
            height: 760px;
            border: 2px solid #787878;
            border-radius: 10px;
            margin-right: 10px;
          "
        >
          <v-list style="border-radius: 7px; background-color: #787878">
            <v-list-group v-for="(item, key) in all_devices" :key="key">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.type"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="(child, key) in item.items" :key="key">
                <v-list-item-content>
                  <div
                    style="
                      width: max-content;
                      height: 50px;
                      background-color: rgb(23, 171, 0);
                      border: 2px solid #787878;
                      border-radius: 10px;
                      font-size: 18px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                    :style="{
                      backgroundColor:
                        item.type == 'Encoder'
                          ? child.streamAddr != ''
                            ? '#0bdc00'
                            : '#6d6d6d'
                          : '#6d6d6d',
                    }"
                    :draggable="true"
                    @dragstart="drag_event()"
                    @dragend="drag_end([child, item.type, key])"
                  >
                    {{ child.deviceMac }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </div>
      </v-col>
      <v-col>
        <!-- rect1 -->
        <v-row no-gutters>
          <div
            style="
              width: 1200px;
              height: 70px;
              border-style: solid;
              border-width: 2px;
              border-radius: 10px;
              border-color: #787878;
            "
          >
            <!-- set Video Wall Preset Mode -->
            <v-row no-gutters align="center" style="padding: 16px">
              <div
                style="
                  font-family: myfont1;
                  font-size: 20px;
                  margin-left: 20px;
                  width: 320px;
                "
              >
                VIDEO WALL CONFIGURATION:
              </div>
              <div style="width: 500px; display: flex; flex-direction: row">
                <div
                  style="
                    font-family: myfont1;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                  "
                >
                  Rows：
                </div>
                <input
                  type="number"
                  style="
                    height: 30px;
                    width: 90px;
                    color: rgb(255, 255, 255);
                    margin-left: 5px;
                    margin-right: 10px;
                  "
                  :min="1"
                  :max="32"
                  v-model.number="row"
                  @change="updateData"
                />
                <div
                  style="
                    font-family: myfont1;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                  "
                >
                  Cols：
                </div>
                <input
                  type="number"
                  style="
                    height: 30px;
                    width: 90px;
                    color: rgb(255, 255, 255);
                    margin-left: 5px;
                  "
                  :min="1"
                  :max="32"
                  v-model.number="col"
                  @change="updateData"
                />
                <div
                  style="
                    font-family: myfont1;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                  "
                >
                  Horiz：
                </div>
                <input
                  type="number"
                  style="
                    height: 30px;
                    width: 90px;
                    color: rgb(255, 255, 255);
                    margin-left: 5px;
                  "
                  :min="1"
                  :max="32"
                  v-model.number="horiz"
                />
                <div
                  style="
                    font-family: myfont1;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                  "
                >
                  Vert：
                </div>
                <input
                  type="number"
                  style="
                    height: 30px;
                    width: 90px;
                    color: rgb(255, 255, 255);
                    margin-left: 5px;
                  "
                  :min="1"
                  :max="32"
                  v-model.number="vert"
                />
              </div>
              <v-spacer></v-spacer>
              <v-btn
                light
                style="font-family: myfont1; width: 100px; margin-right: 20px"
                color="primary"
                @click="applay()"
                >APPLAY</v-btn
              >
            </v-row>
          </div>
        </v-row>
        <!-- rect2 -->
        <v-row no-gutters style="margin-top: 20px; overflow: hidden">
          <div
            style="
              width: 1200px;
              height: 665px;
              border-style: solid;
              border-width: 2px;
              border-radius: 10px;
              border-color: #787878;
              overflow: auto;
              display: flex;
              flex-direction: row;
            "
          >
            <div id="wall" v-for="i in col" :key="i">
              <div v-for="k in row" :key="k">
                <div
                  style="
                    border: 2px solid #b3b3b3;
                    border-radius: 5px;
                    background-color: #787878;
                    width: 240px;
                    height: 180px;
                    margin: 5px;
                  "
                >
                  <div
                    style="width: 240px; height: 180px; position: absolute"
                    @dragleave="dragLeaveEvent"
                    @dragenter="dragEnterEvent(k, i)"
                  ></div>
                  <div
                    style="
                      color: yellow;
                      font-size: 15px;
                      height: 30px;
                      margin-left: 5px;
                      margin-top: 5px;
                    "
                  >
                    <!-- Screen Resolution:
                    <br /> -->
                    Source Device:
                    {{
                      all_vwxyz_data[i - 1] && all_vwxyz_data[i - 1][k - 1]
                        ? all_vwxyz_data[i - 1][k - 1].source_device
                        : ""
                    }}
                    <br />
                    Display:
                    {{
                      all_vwxyz_data[i - 1] && all_vwxyz_data[i - 1][k - 1]
                        ? all_vwxyz_data[i - 1][k - 1].mac
                        : ""
                    }}
                    <br />
                    Horizontal:
                    {{ horiz }}
                    <br />
                    Vertical:
                    {{ vert }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-row>
        <!-- 缩放条
        <v-slider v-model="zoomlevel" inverse-label :label="zoomlevel + '%'">
        </v-slider> -->
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>
  
  <script>
import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import axios from "axios";

export default {
  data: () => ({
    horiz: 0,
    vert: 0,
    col: 1,
    row: 1,
    select_device: { type: 0, mac: "" },
    all_devices: [
      {
        type: "Encoder",
        items: [],
      },
      {
        type: "Decoder",
        items: [],
      },
    ],

    all_vwxyz_data: [
      [
        {
          mac: "",
          grid_index_horiz: 1,
          grid_index_vert: 1,
          source_device: "",
          vert: 0,
          horiz: 0,
          height: 1080,
          width: 1920,
          fps: 0,
          source_width: 0,
          source_height: 0,
          address: "",
        },
      ],
    ],
    zoomlevel: 30,
    scaleratio: 0,
    selecet_row: 0,
    selecet_col: 0,
    select_mac: "",
    select_type: "",
    addrNum: 0,
    selectTxMac: "",
    select_height: 0,
    select_width: 0,
  }),
  watch: {},
  created() {
    var that = this;
    this.getDeviceInf(that);
  },
  components: {
    VueDraggableResizable,
  },
  methods: {
    async leaveAllDevice(data) {
      console.log("leave data", data);
      await axios
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

    openTx(data) {
      if (data[1] == "Encoder") {
        if (this.all_devices[0].items[data[0]].streamAddr == "") {
          this.all_devices[0].items[data[0]].streamAddr =
            "255.0.0." + (this.addrNum + 1);
        }
        this.startTx([
          this.all_devices[0].items[data[0]].deviceMac,
          this.all_devices[0].items[data[0]].streamAddr,
        ]);
      }
    },

    startTx(data) {
      axios
        .post("http://" + location.host + "/api/device/" + data[0], {
          cmd: {
            op: "start",
            type: "HDMI",
            index: 0,
            address: data[1],
          },
        })
        .then(function (respone) {
          console.log("respone:", respone.data);
        })
        .catch(function (error) {
          console.log("error tx", error);
        });
    },

    async gettiming(that, id) {
      // var that = this;
      await axios
        .get("http://" + location.host + "/api/request/" + id)
        .then(function (respone) {
          var nodes = respone.data.result.devices[0].nodes;
          console.log("nodes:", nodes);
          for (let i in nodes) {
            if (nodes[i].type == "HDMI_DECODER") {
              that.select_height = nodes[i].status.height;
              that.select_width = nodes[i].status.width;
              console.log("kuangao", that.select_height, that.select_width);
            }
          }
          // that.selectTxMac = temp[0].
        })
        .catch(function (error) {
          console.log("error1", error);
        });
    },

    async getTxTiming() {
      var that = this;
      await axios
        .post("http://" + location.host + "/api/device/" + this.selectTxMac, {
          cmd: {
            op: "get",
            subset: "settings",
          },
        })
        .then(function (respone) {
          console.log("respone1:", respone.data);
          that.gettiming(that, respone.data.request_id);
        })
        .catch(function (error) {
          console.log("error1", error);
        });
    },

    // apply video wall
    applay() {
      this.getTxTiming();
      setTimeout(() => {
        for (let i = 0; i < this.row; i++) {
          for (let j = 0; j < this.col; j++) {
            for (let a in this.all_devices[1].items[
              this.all_vwxyz_data[i][j].rx_index
            ].sub_index) {
              this.leaveAllDevice([
                this.all_devices[1].items[this.all_vwxyz_data[i][j].rx_index]
                  .deviceMac,
                this.all_devices[1].items[this.all_vwxyz_data[i][j].rx_index]
                  .sub_index[a],
              ]);
            }
            this.joinRx(this.all_vwxyz_data[i][j]);
          }
        }
      }, 100);

      setTimeout(() => {
        this.saveInf();
      }, 1000);
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

    updateData() {
      // 创建新的数组
      const currentRows = this.all_vwxyz_data.length;
      const currentCols = currentRows > 0 ? this.all_vwxyz_data[0].length : 0;

      // 创建新的数组
      const newData = [];
      for (let i = 0; i < this.row; i++) {
        const rowArray = [];
        for (let j = 0; j < this.col; j++) {
          if (i < currentRows && j < currentCols) {
            // 保留原始数据中不涉及新增部分的数据
            rowArray.push(this.all_vwxyz_data[i][j]);
          } else {
            // 新增的行或列使用默认数据
            rowArray.push({
              mac: "",
              grid_index_horiz: j + 1,
              grid_index_vert: i + 1,
              source_device: "",
              source_height: 0,
              source_width: 0,
              address: "",
              rx_index: 0,
            });
          }
        }
        newData.push(rowArray);
      }

      // 更新数据
      this.all_vwxyz_data = newData;
      console.log(this.all_vwxyz_data);
    },

    dragLeaveEvent() {
      // console.log("leave");
      // this.selecet_row = 0;
      // this.selecet_col = 0;
    },

    dragEnterEvent(row, col) {
      // console.log("enter");
      this.selecet_row = row;
      this.selecet_col = col;
    },

    drag_end(data) {
      // console.log(this.selecet_row, this.selecet_col);
      this.$nextTick(() => {
        if (this.selecet_row != 0 && this.selecet_col != 0) {
          console.log(
            this.all_vwxyz_data[this.selecet_col - 1][this.selecet_row - 1]
          );
          console.log(data);
          if (data[1] == "Encoder") {
            // tx
            this.all_vwxyz_data[this.selecet_col - 1][
              this.selecet_row - 1
            ].source_device = data[0].deviceMac;
            this.all_vwxyz_data[this.selecet_col - 1][
              this.selecet_row - 1
            ].address = data[0].streamAddr;
            this.selectTxMac = data[0].deviceMac;
          } else if (data[1] == "Decoder") {
            // rx
            this.all_vwxyz_data[this.selecet_col - 1][
              this.selecet_row - 1
            ].mac = data[0].deviceMac;
            this.all_vwxyz_data[this.selecet_col - 1][
              this.selecet_row - 1
            ].rx_index = data[2];
          }
          console.log(this.all_vwxyz_data);
        }
      });
    },

    drag_event(data) {
      this.selecet_row = 0;
      this.selecet_col = 0;
    },

    async joinRx(data) {
      var that = this;
      console.log(that.select_height, that.select_width);
      await axios
        .post("http://" + location.host + "/api/device/" + data.mac, {
          cmd: {
            op: "join",
            type: "HDMI",
            index: 0,
            display_mode: "WALL_GENLOCKED",
            source_device: data.source_device,
            rect: {},
            source_height: that.select_height,
            source_width: that.select_width,
            video: {
              grid_width: that.row,
              grid_height: that.col,
              grid_index_horiz: data.grid_index_vert,
              grid_index_vert: data.grid_index_horiz,
              bezel_horiz: that.horiz,
              bezel_vert: that.vert,
              width: 3840,
              height: 2160,
              fps: 60,
            },
            address: data.address,
          },
        })
        .then(function (respone) {
          console.log("join success", respone.data);
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
              sub_index: [],
            };
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
            if (device.streamAddr != "") {
              that.all_devices[0].items.push({ ...device });
            }
            that.all_devices[1].items.push({ ...device });
          }
          console.log("success", JSON.stringify(that.all_devices));
          // console.log("success", JSON.stringify(that.txInfo));
          // that.$forceUpdate();
        })
        .catch(function (error) {
          console.log("error2", error);
        });
    },
  },
  head: {
    title: "Video Wall",
  },
};
</script>
  <style scoped>
.v-btn {
  /* text-transform: none; */
  color: black;
  /* background-color: #8DC63F; */
}
</style>
  