import apilist from './api.js'

const install = function(Vue) {
  if (install.installed) {
    install.installed = true
    return install.installed
  }

  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apilist
      }
    }
  })
}

export default install
