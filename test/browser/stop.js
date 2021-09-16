import {EventTimer} from '../../index.js'


export default function test(tag) {
  function assert(condition, message, detail) {
    if (condition) {
      console.log(`<${tag}>PASS`, message, detail)
    } else {
      console.error(`<${tag}>FAIL`, message, detail)
    }
  }
  
  
  const expectedError = 17  // this number is highest I could get
  const testStopDelay = 1234
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
    
    assert(false, 'should not elapse', [error, detail])
  })
  
  
  T.addEventListener('stop', ({detail})=>{
    const stopTime = Date.now()
    const error = Math.abs(stopTime-startTime-testStopDelay)
    
    assert((error<expectedError), 'should stop after 1234ms', [error, detail])
  })


  T.addEventListener('tick', ({detail})=>{
    const nowTime = Date.now()
    
    const error = Math.abs(detail.dt - testInterval)
    
    
    assert((error < expectedError), 'tick in time', [error, detail])

    
    priorTime = nowTime
  })

  
   
  startTime = Date.now()
  priorTime = startTime
  
  T.start()

  setTimeout(() => {
    T.stop()
  }, testStopDelay);
}