<template>
  <v-app dark>
    <v-expand-x-transition appear>
    <v-navigation-drawer
      v-if="drawer"
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
      clipped
      permanent
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          @click="menuItemClick(item)"
          router
          exact
          color="#91ff00"
        >
          <v-list-item-action>
            <v-icon 
             :color="item.icon == 'mdi-logout' ? '#F44336' : item.icon === 'mdi-login' ? '#8DC63F' : ''"
            >{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span :style="item.title === 'Log Out' ? 'color:#F44336;' : item.title === 'Log In' ? 'color:#8DC63F' : ''">
                {{item.title}}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </v-expand-x-transition>
    <v-app-bar
      clipped-left
      fixed
      app
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        v-if="drawer"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
   
   <!-- position:relative left:-24px to align ignorning 50% of the width of the menu icon -->
      <img
        class="mx-auto"
        src="~assets/images/AVPro_Edge_UI_white.svg"
        v-bind:style="{ left:logoleft + 'px'}"
        style="max-height:100%; position:relative; left:-24px; display: block; margin:auto;"
      ></img> 
      <!-- <div class="d-none d-sm-block">{{modelname}}</div> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
   <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Config",
          to: "/ioconfig",
        },
      ],
      miniVariant: false,
      title: "AVPro Edge",
    };
  },
  computed: {
    logoleft() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return -24;
      }
      return 30;
    },
    //com
    ...mapState(["modelname", "serialnumber"]),
    //network
    ...mapState([
      "webuser",
      "webauth",
      "webredirect",
      "websecure",
      "webpassword",
    ]),
  },
  methods: {
    goToLogin() {
      this.$store.commit("webredirect", this.$router.history.current.path);
      this.$router.push("/login");
    },
    getColor(input) {
      if (input === "Log Out") {
        return "red";
      }
    },
    async LogOut() {
      console.log("Logging out");
      var newuser = JSON.parse(JSON.stringify(this.webuser));
      newuser.loggedin = false;
      newuser.admin = false;
      await this.$store.commit("webuser", newuser);
      this.$router.push("/");
    },
    menuItemClick(item) {
      if (item.title === "Log Out") {
        this.LogOut();
      } else if (item.title === "Log In" && this.$route.path != "/login") {
        this.goToLogin();
      }
      this.updateMenu();
    },
    updateMenu() {
      if (
        (this.webuser.loggedin && this.webuser.admin) ||
        (!this.webauth.adminsecure && !this.webauth.usersecure)
      ) {
        this.items = [
          {
            icon: "mdi-apps",
            title: "Matrix",
            to: "/matrix",
          },
          {
            icon: "mdi-monitor-multiple",
            title: "Multiview",
            to: "/multiview",
          },
          {
            icon: "mdi-wall",
            title: "Video Wall",
            to: "/videowall",
          },
          {
            icon: "mdi-cellphone-link",
            title: "Devices",
            to: "/devices",
          },
        ];
      } else if (this.webuser.loggedin || !this.webauth.usersecure) {
        this.items = [
          {
            icon: "mdi-apps",
            title: "Config",
            to: "/multiview",
          },
        ];
      } else {
        this.items = [];
      }
      if (
        this.webuser.loggedin &&
        (this.webauth.adminsecure || this.webauth.usersecure)
      ) {
        this.items.push({
          icon: "mdi-logout",
          title: "Log Out",
        });
      } else if (
        !this.webuser.loggedin &&
        (this.webauth.adminsecure || this.webauth.usersecure)
      ) {
        this.items.push({
          icon: "mdi-login",
          title: "Log In",
        });
      }
    },
    updateWebAuth() {
      updateMenu();
      var match = false;
      this.items.forEach((item) => {
        if (item.to === this.$route.path) {
          match = true;
        }
      });
      if (!match) {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state) => {
        return this.$store.state.webauth; // could also put a Getter here
      },
      (newValue, oldValue) => {
        this.updateMenu();
      },
      //Optional Deep if you need it
      {
        deep: true,
      }
    );
    this.$store.watch(
      (state) => {
        return this.$store.state.webuser; // could also put a Getter here
      },
      (newValue, oldValue) => {
        this.updateMenu();
      },
      //Optional Deep if you need it
      {
        deep: true,
      }
    );
    this.updateMenu();
  },
};
</script>
