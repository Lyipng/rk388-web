import colors from "vuetify/es5/util/colors";

export default {
  /*mode: 'spa',  depracated. Use ssr: false instead of mode: spa*/
  ssr: false,
  // Static sites should have a target of static (default is server)
  target: "static",
  server: { host: "0.0.0.0", port: 7001 },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk;
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "stylesheet", type: "text/css", href: "/fonts/mdicons.css" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxt/http",
    "nuxtjs-mdi-font",
    [
      "nuxt-vuex-localstorage",
      {
        sessionStorage: ["webuser", "webredirect"],
        localStorage: ["webauth"],
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: {
      font: false,
      icons: false,
    },

    theme: {
      dark: true,
      themes: {
        dark: {
          primary: "#8dc63f",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.performance = {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
      };
    },
  },

  generate: {
    dir: "../www",
  },
  http: {},
};
