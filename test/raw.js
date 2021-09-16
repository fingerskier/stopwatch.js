import Gnomon from './index.js'
import assert from 'assert'


// T0
async function basic_test() {
  const clepsydra = new Gnomon({
    interval: 250,
    
    onTick: res=>{
      console.log(`T0 ${res.count}`)
    },
  })
  
  
  clepsydra.start()

  console.log('T0', clepsydra.timer)
  
  await timeout(2345)

  clepsydra.stop(res=>{
    console.log('T0 stopped', res)

    assert(res.count === 9)
  })
}
// T0


// T1
async function tick_test() {
  const clepsydra = new Gnomon({
    interval: 345,
    
    onTick: res=>{
      console.log(`T1 ${res.count}`)
    },
  })
  
  
  clepsydra.start()

  console.log('T1', clepsydra.timer)

  
  await timeout(1234)

  clepsydra.stop(res=>{
    console.log('T1 stopped', res)
    
    assert(res.count === 3)
  })
}
// T1


// T2
async function stop_test() {
  let stopCount = 0

  const clepsydra = new Gnomon({
    interval: 500,

    onElapsed: res=>{
      stopCount++
    },
    
    onTick: res=>{
      console.log(`T2 ${res.count}`)
    },

    delay: 3456,
  })
  
  
  clepsydra.start()

  console.log('T2', clepsydra.timer)

  
  setTimeout(() => {
    clepsydra.stop(res=>{
      console.log('T2 stopped', res)
      
      assert((res.count === 6) && !stopCount)
    })
  }, 3400);
}
// T2


// T3
async function elapsed_test() {
  let stopCount = 0

  const clepsydra = new Gnomon({
    interval: 500,

    onElapsed: res=>{
      stopCount++
      console.log('T3 elapsed', stopCount)
    },
    
    onTick: res=>{
      console.log(`T3 ${res.count}`)
    },

    timeout: 3500,
  })
  
  
  clepsydra.start()

  console.log('T3', clepsydra.timer)

  
  setTimeout(() => {
    clepsydra.stop(res=>{
      console.log('T3 stopped', res, stopCount)
      
      assert((res.count === 7) && (stopCount === 1))
    })
  }, 4000);
}
// T3


// Promise.all([
//   basic_test(),
//   tick_test(),
//   stop_test(),
//   elapsed_test(),
// ]).catch(console.error)
