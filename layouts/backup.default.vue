<template>
  <v-app style="min-width: max-content; background: #383838">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :fixed="true"
      :dark="true"
      :width="110"
      :value="true"
      app
      style="background: #383838"
    >
      <div class="div1">
        <!-- I/O Config btn -->
        <div
          :class="click_flag == 2 ? 'menu_click' : 'menu_nomal'"
          align="center"
          @click="menuClick(2)"
        >
          <img src="@/static/icon/Matrix_Switch.png" class="menu_icon" />
          <div class="menu_text">Matrix</div>
        </div>

        <!-- I/O Config btn -->
        <div
          :class="click_flag == 2 ? 'menu_click' : 'menu_nomal'"
          align="center"
          @click="menuClick(2)"
        >
          <img src="@/static/icon/IO_Settings_Icon.png" class="menu_icon" />
          <div class="menu_text">I/O Config</div>
        </div>

        <!-- System btn -->
        <div
          :class="click_flag == 3 ? 'menu_click' : 'menu_nomal'"
          align="center"
          @click="menuClick(3)"
        >
          <img src="@/static/icon/System_Settings_Icon.png" class="menu_icon" />
          <div class="menu_text">System</div>
        </div>
      </div>
    </v-navigation-drawer>
    <div style="background: #252525; height: 88px">
      <div style="line-height: 88px">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </div>
      <div style="margin-top: -72px; text-align: center">
        <img src="../static/icon/pro.png" />
      </div>
    </div>
    <v-content style="background: #383838">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" style="background: #383838" app>
      <span></span>
      <v-dialog v-model="fixed" max-width="800px">
        <v-alert
          dense
          class="my-0"
          type="error"
          v-for="(item, i) in cmderrors"
          :key="i"
          >{{ item }}</v-alert
        >
      </v-dialog>
      <v-overlay :value="overlay">
        <v-progress-circular color="primary" indeterminate />
      </v-overlay>
      <v-snackbar v-model="snackbar" :color="snackcolor" multi-line>
        {{ snacktext
        }}<v-icon large @click="snackbar = false">mdi-close</v-icon>
      </v-snackbar>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  created() {
    this.$store.dispatch("init");
    console.log("self.location.href:" + self.location.href);
    if (self.location.href.indexOf("ioconfig") != -1) this.menuClick(2);
    else if (self.location.href.indexOf("system") != -1) this.menuClick(3);
    else this.menuClick(1);
  },

  computed: {
    ...mapState(["overlay", "cmdstate", "cmderrors"]),
  },

  watch: {
    overlay(val) {
      if (val) return;
      this.snackcolor = this.cmdstate.error ? "error" : "info";
      this.snacktext = this.cmdstate.text;
      this.snackbar = Boolean(this.snacktext);
    },
  },

  data: () => ({
    click_flag: 1,

    snackbar: false,
    snacktext: "",
    snackcolor: "",

    clipped: true,
    drawer: true,
    fixed: false,

    miniVariant: false,
  }),

  methods: {
    menuClick(index) {
      switch (index) {
        case 1:
          this.click_flag = 1;
          this.$router.push({ path: "/" });
          break;
        case 2:
          this.click_flag = 2;
          this.$router.push({ path: "/ioconfig" });
          break;
        case 3:
          this.click_flag = 3;
          this.$router.push({ path: "/system" });
          break;
        default:
          this.click_flag = 1;
          this.$router.push({ path: "/" });
          break;
      }
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "myfont";
  src: url("../static/fonts/BebasKai-Regular.otf");
}
.menu_icon {
  width: 60px;
  height: 60px;
}
.menu_text {
  margin-top: -11px;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
}
.menu_normal {
  text-align: center;
}
.menu_click {
  background-color: #8dc63f;
  text-align: center;
}
</style>