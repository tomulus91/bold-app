export default function ({ store, redirect }) {
  if (!store.state.sessionUser.userData.userIsLogged) {
    return redirect('/')
  }
}
