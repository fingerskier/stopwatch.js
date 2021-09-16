const expect = chai.expect


describe('events', () => {
  it('elapsed after approximately 1s', done=>{
    const startTime = Date.now()
    const T = new EventTimer({
      delay: 1000,
    })


    const before = Date.now()

    T.addEventListener('elapsed', res=>{
      const stopTime = Date.now()
      const error = Math.abs(stopTime-startTime)

      expect(error).to.be.lessThan(50)

      done()
    })
    
    T.start()
  })
})
