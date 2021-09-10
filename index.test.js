const Gnomon = require('.')
const assert = require('assert')


async function basic_test() {
  const clepsydra = new Gnomon({
    interval: 250,
    
    onTick: console.log,
  })
  
  
  clepsydra.start()
  
  setTimeout(() => {
    clepsydra.stop(res=>{
      console.log('T0 stopped', res)

      assert(res.count === 3)
    })
  }, 2345);  
}


async function tick_test() {
  const clepsydra = new Gnomon({
    interval: 345,
    
    onTick: res=>console.log(res),
  })
  
  
  clepsydra.start()
  
  setTimeout(() => {
    clepsydra.stop(res=>console.log('T1 stopped', res))
  }, 1234);
  
}





Promise.all([
  basic_test(),
  tick_test(),
]).catch(console.error)