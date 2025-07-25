import axios from 'axios'

;(function (window) {
  'use strict'

  /**
   *
   * @param params
   * @param params.name {'request'}
   * @param params.args
   * @param params.args.url {string}
   * @param params.args.method {'post'|'get'}
   * @param params.args.header {Object}
   * @param params.args.data {data}
   * @param params.args.showLoading {boolean}
   * @param success {function}
   * @param fail {function}
   */
  function invokeCustomAPI(params, success, fail) {
    if (params.name === 'request') {
      const axiosMethod = params.args.method?.toLocaleLowerCase() || 'post'
      axios[axiosMethod](params.args.url, params.args.data, { headers: params.args.headers })
        .then(success)
        .catch(fail)
    }
  }

  window.substitute_tt = {
    invokeCustomAPI,
  }
})(window)
