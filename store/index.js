export const state = () => ({
  name: "",
  modelname: "AC-FRESCO-4",
  serialnumber: "",
  mac: "",
  hardver: "",
  softver: "",
  dns: "",
  eth0: "",
  rxbuf: "",
  betaupdatechannel: false,

  overlay: false,
  cmdstate: {},
  cmderrors: [],
  inputsID: [],
  outputsVideoID: [],
  outputsAudioID: [],
  audioMode: 0,

  rs232telnet: 1,
  rs232telnetport: 0,
  rs232telnetsecure: false,
  rs232telnetuser: "",
  rs232telnetpassword: "",
  webredirect: '/',
  webuser: {
    admin: false,
    loggedin: false
  },
  webauth: {
    adminsecure: false,
    adminusername: "admin",
    adminpassword: "admin",
    usersecure: false,
    userusername: "user",
    userpassword: "user123"
  },
  cloud: {
    privacyStatus: false,
    EULAStatus: false,
    cloudEnable: false
  },
  syncproEnable: true,
  syncproHost: "",
  syncproPartnerID: "",
  syncproModelID: "",
  syncdeviceID: "",
  syncdeviceAccessKey: "",
  virtualnumber: "",
  mcuVersion: "",
})

let reloading = false;
let initialized = false;

export const getters = {
  getAuth(state) {
    return state.webauth;
  }
}

export const mutations = {
  init(state, info) {
    state.name = info.name;
    state.modelname = info.modelname;
    state.serialnumber = info.serialnumber;
    state.mac = info.mac;
    state.hardver = info.hardver;
    state.softver = info.softver;
    state.dns = info.dns;
    state.eth0 = info.eth0;
    state.rxbuf = info.rxbuf;
    state.rs232telnet = info.rs232telnet;
    state.rs232telnetport = info.rs232telnetport;
    state.rs232telnetsecure = info.rs232telnetsecure;
    state.rs232telnetuser = info.rs232telnetuser;
    state.rs232telnetpassword = info.rs232telnetpassword;
    state.websecure = info.websecure;
    state.webpassword = info.webpassword;
    state.syncproEnable = info.syncproEnable;
    state.syncproHost = info.syncproHost;
    state.syncproPartnerID = info.syncproPartnerID;
    state.syncproModelID = info.syncproModelID;
    state.syncdeviceID = info.deviceID;
    state.syncdeviceAccessKey = info.deviceAccessKey;
    state.virtualnumber = info.virtualnumber;
    state.mcuVersion = info.mcuVersion;
    state.webauth.adminsecure = info.adminsecure;
    state.webauth.adminusername = info.adminusername;
    state.webauth.adminpassword = info.adminpassword;
    state.webauth.usersecure = info.usersecure;
    state.webauth.userusername = info.userusername;
    state.webauth.userpassword = info.userpassword;
    state.cloud.privacyStatus = info.privacyStatus;
    state.cloud.EULAStatus = info.EULAStatus;
    state.cloud.cloudEnable = info.cloudEnable;

    let patmp = info.portalias;
    if(patmp==""||patmp=="{}")
    {
      // patmp = '{"inputsID":[{"port":"IN 1","id":""},{"port":"IN 2","id":""},{"port":"IN 3","id":""},{"port":"IN 4","id":""}],"outputsVideoID":[{"port":"OUT 1","id":""},{"port":"OUT 2","id":""},{"port":"OUT 3","id":""},{"port":"OUT 4","id":""}],"outputsAudioID":[{"port":"OUT 1","id":""},{"port":"OUT 2","id":""},{"port":"OUT 3","id":""},{"port":"OUT 4","id":""}]}';
      var tobj = {};
      tobj.inputsID = [];
      for(var i=1; i<=16; i++)
      {
      var tmp = {};
      tmp.port = "IN "+i;
      tmp.id = "";
      tobj.inputsID.push(tmp);
      }
      tobj.outputsVideoID = [];
      for(var i=1; i<=16; i++)
      {
      var tmp = {};
      tmp.port = "OUT "+i;
      tmp.id = "";
      tobj.outputsVideoID.push(tmp);
      }
      tobj.outputsAudioID = [];
      for(var i=1; i<=1; i++)
      {
      var tmp = {};
      tmp.port = "OUT";
      tmp.id = "";
      tobj.outputsAudioID.push(tmp);
      }
      patmp = JSON.stringify(tobj);
    };
    let portalias = JSON.parse(patmp);

    state.inputsID.splice(0, state.inputsID.length);
    for (let id in portalias.inputsID) {
      state.inputsID.push(portalias.inputsID[id]);
    };

    state.outputsVideoID.splice(0, state.outputsVideoID.length);
    for (let id in portalias.outputsVideoID) {
      state.outputsVideoID.push(portalias.outputsVideoID[id]);
    };

    state.outputsAudioID.splice(0, state.outputsAudioID.length);
    for (let id in portalias.outputsAudioID) {
      state.outputsAudioID.push(portalias.outputsAudioID[id]);
    };

    initialized = true;
  },

  audioMode(state, value) { state.audioMode = value },
  name(state, value) { state.name = value },
  dns(state, value) { state.dns = value },
  eth0(state, value) { state.eth0 = value },
  rxbuf(state, value) { state.rxbuf = value },
  rs232(state, value) { state.rs232 = value },
  telnet(state, value) { state.telnet = value },
  sshservice(state, value) { state.sshservice = value },
  overlay(state, value) { state.overlay = value },
  syncproEnable(state, value) { state.syncproEnable = value },
  websecure(state, value) { state.websecure = value },
  webuser(state, value) { state.webuser = value },
  webauth(state, value) { state.webauth = value },
  webredirect(state, value) { state.webredirect = value },
  webauthsecure(state, value) { state.webauth.secure = value },
  privacyStatus(state, value) { state.cloud.privacyStatus = value },
  EULAStatus(state, value) { state.cloud.EULAStatus = value },
  cloudEnable(state, value) { state.cloud.cloudEnable = value },

  list_cmd(state, op) {
    const list= state[op.list];
    if (!list) return;
    const idx = op.index;
    idx >= 0 && op.value && Object.assign(list[idx], op.value);
    idx >= 0 && !op.value && list.splice(idx, 1);
    idx < 0  && op.value && list.push(op.value);
  },

  cmdstate(state, param) {
    state.cmdstate.text  = param.text;
    state.cmdstate.error = param.error;
    if (!param.error) return;
    let n = state.cmderrors.length;
    state.cmderrors.splice(n-1, n>=10);
    state.cmderrors.splice(0, 0, param.text);
  },

  setInputsID(state, param){
    var tmp = state.inputsID;
    for(var k in tmp)
    {
      if(tmp[k].port==param.port)
      {
        tmp[k].id = param.id;
        break;
      }
    }
  },

  setOutputsVideoID(state, param){
    var tmp = state.outputsVideoID;
    for(var k in tmp)
    {
      if(tmp[k].port==param.port)
      {
        tmp[k].id = param.id;
        break;
      }
    }
  },

  setOutputsAudioID(state, param){
    var tmp = state.outputsAudioID;
    for(var k in tmp)
    {
      if(tmp[k].port==param.port)
      {
        tmp[k].id = param.id;
        break;
      }
    }
  },

}

import axios from 'axios'

export const actions = {
  init({ dispatch, state }) {
    return initialized || dispatch('reload');
  },

  reload({ commit }) {
    if (reloading) return;
    reloading = true;
    return axios.get('/do?cmd=status').then(resp => {
      commit('init', resp.data.info);
      reloading = false;
    }).catch(error => {
      reloading = false;
    });
  },

  post({ commit, state }, data) {
    commit('overlay', true);
    let url = "/do";
    if (typeof(data)=="object" && data.append)
        url = "/upload/root/sysupdate";
    else
        data = { cmd: data };
    axios.timeout = 340000;
    axios.post(url, data).then(resp => {
      let error = 0, text;
      if (typeof(resp.data) != "object") {
        text = "Unknown response: " + resp.data.substring(1, 70);
        error = -2;
      } else if (resp.data.error) {
        text = resp.data.error;
        error = -1;
      } else {
        text = resp.data.info;
      };
      commit('cmdstate', {error: error, text: text});
      commit('overlay', false);
    })
    .catch(error => {
      commit('cmdstate', {error: -3, text: error});
      commit('overlay', false);
    });
  },
}
