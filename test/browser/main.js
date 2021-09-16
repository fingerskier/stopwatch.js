import {EventTimer} from '../../index.js'


export default function test(tag) {
  function assert(condition, message, detail) {
    if (condition) {
      console.log(`<${tag}>PASS`, message, detail)
    } else {
      console.error(`<${tag}>FAIL`, message, detail)
    }
  }
  
  
  const expectedError = 17  // this number is highest I could get under testing circumstances
  const testDelay = 2560
  const testInterval = 500
  
  
  const T = new EventTimer({
    delay: testDelay,
    interval: testInterval,
  })
  
  
  let startTime   // set below
  let priorTime
  
  
  T.addEventListener('elapsed', ({detail})=>{
    const stopTime = Date.now()
    const error = Math.abs(stopTime-startTime-testDelay)
    
    assert((error < expectedError), 'elapsed fired', [error, detail])
  })
  
  
  T.addEventListener('tick', ({detail})=>{
    const nowTime = Date.now()
    
    const error = Math.abs(detail.dt - testInterval)
    
    
    assert((detail.dt), 'detail.dt exists', detail.dt)
    assert((detail.elapsed), 'detail.elapsed exists', detail.elapsed)
    assert((error < expectedError), 'tick in time', [error, detail])

    
    priorTime = nowTime
  })
  
  
  
  startTime = Date.now()
  priorTime = startTime
  T.start()
}