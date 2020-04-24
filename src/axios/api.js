import fetch from './fetch.js'
function getQueryStr(obj) {
  if (!obj) return ''
  return cleanArray(Object.keys(obj).map(key => {
    if (obj[key] === undefined) return ''
    return key + '=' + obj[key]
  })).join('&')
}
function getQuery(obj) {
  if (!obj) return ''
  return cleanArray(Object.keys(obj).map(key => {
    if (obj[key] === undefined) return ''
    return key + ':' + obj[key]
  })).join(',')
}
function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

// 签收
const getSql = params => {
  return fetch({
    url: '/v1/get/config',
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}
const getWebsites = params => {
  var queryStr = getQuery(params)

  return fetch({
    url: '/v2/website_use?query='+queryStr,
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}
const deleteSeletedSites = params => {
  var queryStr = getQueryStr(params)
  return fetch({
    url: '/v2/website_use/:id='+queryStr,
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}
const getPageLimit = params => {
  var queryStr = getQueryStr(params)
  return fetch({
    url: '/v2/website_use/?'+queryStr,
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}

const getWebsiteId = params => {
  var queryStr = getQueryStr(params)
  return fetch({
    url: '/v2/website_use/'+queryStr,
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}

const submitSetting = params => {
  return fetch({
    url: '/v2/config',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': '	text/plain'

    },
    dataType: "json"
  })
}


const openHint = params => {
  return fetch({
    url: '/v2/start/hint/',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}
const getEmailList = params => {
  var queryStr = getQueryStr(params)
  return fetch({
    url: '/v2/config/email/'+queryStr,
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}


const changeEmails = params => {
  return fetch({
    url: '/v2/config/email/',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'text/plain'
    },
    dataType: true
  })
}

const getTaskList = params => {
  var queryStr = getQueryStr(params)
  return fetch({
    url: '/v2/website_state/',
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}
const getTaskDetail = params => {
  var queryStr = getQueryStr(params)
  return fetch({
    url: '/v2/website_state/'+queryStr,
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'text/plain'
    },
    dataType: true
  })
}
const getWebsiteStateInfo = params => {
  var queryStr = getQueryStr(params)
  return fetch({
    url: '/v2/website_state_info/'+queryStr,
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}
const getWebsiteList = params => {
  var queryStr = getQueryStr(params)
  return fetch({
    url: '/v2/website_state_info/'+queryStr,
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: true
  })
}

const apiList = {
 
  getSql,
  getWebsites,
  getPageLimit,
  getWebsiteId,
  submitSetting,
  openHint,
  getEmailList,
  changeEmails,
  getTaskList,
  getTaskDetail,
  getWebsiteStateInfo,
  getWebsiteList
}

export default apiList
