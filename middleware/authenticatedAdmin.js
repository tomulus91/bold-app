export default function ({ store, redirect }) {
  if (!store.state.sessionUser.userData.userIsLogged || !store.state.sessionUser.userData.userIsAdmin) {
    return redirect('/')
  }
}
