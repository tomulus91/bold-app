import localforage from 'localforage'

export default localforage.createInstance({
  name: 'bold-app',
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]
})
