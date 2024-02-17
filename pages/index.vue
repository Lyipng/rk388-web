<template style="margin:0px"></template>


<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  middleware({ store, redirect }) {
    // If the user is not authenticated
    // if (store.state.webauth.usersecure && !store.state.webuser.loggedin) {
    //   store.state.webredirect = "/ioconfig";
    //   return redirect("/login");
    // } else {
    //   return redirect("/matrix");
    // }
  },

  head: {
    title: "AVPro Edge",
  },
};
</script>
