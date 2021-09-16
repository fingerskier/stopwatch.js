export default class AsyncTimer {
  count = 0
  currentTime = 0
  delay = undefined   // time(ms) after which the timer stops
  dT = 0
  interval = 1000
  onStop = undefined  // callback anytime the timer is stopped
  onElapsed = undefined   // callback only when timer is elapsed
  onTick = undefined
  runTime = 0
  startTime = 0
  timerID = 0

  
  constructor(config) {
    for (let X in config) this[X] = config[X]
  }


  /**
   * Runs a callback every tick (interval)
   * Stops after the `delay` time
   * @param {Function} tickHandler 
   * @returns an Object containing info about this timer run
   */
  async timer(tickHandler) {
    this.startTime = Date.now()
    this.count = 1
    this.runTime = 0


    return await new Promise(resolve=>{
      this.timerID = setInterval(()=>{
        this.currentTime = Date.now()

        this.runTime = this.currentTime - this.startTime
        
        this.dT = this.currentTime - this.priorTime
    
        ++this.count
    
        // the instantiated tick handler
        if (this.onTick && (typeof this.onTick === 'function')) this.onTick({
          count: this.count,
          dt: this.dT,
          elapsed: this.runTime,
        })
    
        // one-off tick handler
        if (tickHandler && (typeof tickHandler === 'function')) tickHandler({
          count: this.count,
          dt: this.dT,
          elapsed: this.runTime,
        })
        
        this.priorTime = this.currentTime
      }, this.interval)


      if (this.delay) {
        setTimeout(() => {
          this.stop()
          
          resolve({
            count: this.count,
            elapsed: this.runTime,
          })
        }, this.delay);
      }
    })
  }

  
  /**
   * Waits for a specified amount of time:
   * async/await alternative utility for setTimeout
   * @param {Integer} ms 
   * @returns 
   */
  async timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
  /**
   * 
   * @param {Function} finalCallback - optional callback when stopping, this is the same function as in the constructor configuration object
   * @returns {Integer} - the final count of the stopwatch
   */
  stop(finalCallback) {
    clearInterval(this.timerID)

    if (finalCallback) this.onStop = finalCallback

    if (this.onStop && (typeof this.onStop === 'function')) this.onStop({
      count: this.count,
      elapsed: this.runTime,
    })

    return this.count
  }
}