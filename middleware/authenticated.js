export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (store.state.webauth.secure && !store.state.webauth.loggedin) {
    return redirect('/')
  }
}
