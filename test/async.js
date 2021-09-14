const expect = require('chai').expect

const Timerinator = require('..')


describe('async timeout', () => {
  it('should elapse approximately 1s', async()=>{
    const T = new Timerinator({
      delay: 2500,
      interval: 500,
    })


    const before = Date.now()
    
    await T.timeout(1000)

    const after = Date.now()

    const delay = after - before

    const error = Math.abs(delay - 1000)


    error.should.be.lessThan(50)
  })
})


describe('async interval w/ ticker', () => {
  it('should log every tick and finish on-time', async()=>{
    const T = new Timerinator({
      delay: 1750,
      interval: 250,
    })

    let tickData = {}

    
    /**
     * When the timer completes it returns the final state
     * On each `tick` we run the given callback
     */
    const result = await T.timer(res=>{
      tickData=res

      console.log(tickData)
    })


    expect(tickData.count).to.be.a('number')
    expect(tickData.dt).to.be.a('number')
    expect(tickData.elapsed).to.be.a('number')

    result.should.be.an('object')
    result.count.should.equal(7)
    result.elapsed.should.be.a('number')
  })
})