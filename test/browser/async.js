import assertion from '../assert.js'

import {AsyncTimer} from '../../index.js'

const expectedError = 17


export default async function test(tag) {
  const assert = assertion(tag)

  async function Test0() {
    try {
      const T = new AsyncTimer({
        delay: 2500,
        interval: 500,
      })
      
      
      const before = Date.now()
      
      await T.timeout(1000)
      
      const after = Date.now()
      
      const delay = after - before
      
      const error = Math.abs(delay - 1000)
      
      
      assert((error<expectedError), 'async timeout')
    } catch (error) {
      console.error(error)
    }
  }
  
  
  async function Test1() {
    try {
      const expectedCount = 7
      const testInterval = 250

      const testDelay = expectedCount * testInterval

      const T = new AsyncTimer({
        delay: testDelay,
        interval: testInterval,
      })
      
      /**
       * When the timer completes it returns the final state
       * On each `tick` we run the given callback
       */
      const result = await T.timer(res=>{
        
        assert(res.count, 'tick data has count', res.count)
        assert(res.dt, 'tick data has dt', res.dt)
        assert(res.elapsed, 'tick data has elapsed', res.elapsed)
      })
      
      
      assert((result.count===expectedCount), 'result has count', result.count)
      assert((typeof result.elapsed === 'number'), 'result has elapsed:Number', result.elapsed)
    } catch (error) {
      console.error(error)
    }
  }
  
 
  try {
    await Test0()
    
    await Test1()
  } catch (error) {
    console.error(error)
  }
}