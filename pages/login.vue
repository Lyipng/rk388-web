<template>
<v-container>
<v-row>
<v-spacer/>
<v-col cols="12" md="8" lg="6" xl="4" class="flex-justify-center">
  <v-card
   style="padding:20px;">
  <v-form v-model="loginValid" @submit="attempt_login">
  <v-row no-gutters>
    <v-col cols="4">Username:</v-col>
    <v-col cols="8">
      <v-text-field
       v-model="username"
       dense
       :rules="[v => !!v || 'Username is required']"
       autocomplete="username"
       style="height:25px;margin-top:0px;margin-right:30px;font-size:13px;"
      />
      
    </v-col>
  </v-row>

  <v-row no-gutters style="margin-top: 20px;">
    <v-col cols="4">Password:</v-col>
    <v-col cols="8">
      <v-text-field
       v-model="password"
       dense
       :rules="[v => !!v || 'Password is required']"
       style="height:25px;margin-top:0px;margin-right:30px;font-size:13px;"
       :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
       :type="show_password ? 'text' : 'password'"
       autocomplete="password"
       @click:append="show_password = !show_password"
       single-line
       @keydown="checkForm"
      />
    </v-col>
  </v-row>
  </v-form>
  <v-row no-gutters v-if="output_message" style="margin-top: 20px;">
  <div style="text-align:center;margin:auto;">
  {{output_message}}
  </div>
  </v-row>  
  <v-row no-gutters style="margin-top: 20px;">
    <v-spacer/>
    <v-btn
     color="primary"
     @click="attempt_login">
      Login
    </v-btn>
  </v-row>
  </v-card>
</v-col>
<v-spacer/>
</v-row>
</v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    output_message: '',
    username: '',
    password: '',
    loginValid: false,
    show_password: false
  }),
  computed: {
      ...mapState(['webauth','webuser','webredirect']),
  },
  mounted(){

  },
  methods: {
    checkForm(kevent){
      if(kevent.key === "Enter" && this.loginValid){
        this.attempt_login();
      }
    },
    login_success(isAdmin){
      var newuser = JSON.parse(JSON.stringify(this.$store.state.webuser));
      newuser.loggedin = true;
      newuser.admin = isAdmin;
      this.$store.commit('webuser', newuser);
      console.log('Attempting redirect to ' + this.webredirect);
      this.$router.push(this.$store.state.webredirect);
    },
    attempt_login(){
      if(this.username === this.webauth.adminusername && this.password === this.webauth.adminpassword){
        this.login_success(true);
      }else if(this.username === this.webauth.userusername && this.password === this.webauth.userpassword){
        this.login_success(false);
      }else{
        this.output_message = 'Incorrect username or password'
      }
    }
  }
}

</script>
