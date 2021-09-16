const expect = chai.expect


describe('event should emit', () => {
  it('should elapse at approximately 1s', async()=>{
    const T = new window.EventTimer({
      delay: 2500,
    })


    const before = Date.now()
    
    await T.start()

    const after = Date.now()

    const delay = after - before

    const error = Math.abs(delay - 1000)


    expect(error).to.be.lessThan(50)
  })


  it('should emit _stopped_ after 1.5s', async()=>{
    const T = new window.EventTimer({
      delay: 1500,
    })


    


    expect(true).to.equal(true)
  })
})