import AsyncTest from './async.js'

import MainTest from './main.js'

import StopTest from './stop.js'


window.addEventListener('load', event=>{
  MainTest('Main')

  StopTest('Stop')

  AsyncTest('Async')
})