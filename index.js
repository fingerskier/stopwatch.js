class Stopwatch {
  count = 0
  currentTime = 0
  dT = 0
  elapsed = 0
  onStop = undefined  // callback anytime the timer is stopped
  onElapsed = undefined   // callback only when timer is elapsed
  onTick = undefined
  interval = 1000
  startTime = 0
  timer = 0
  timeout = undefined

  
  constructor(config) {
    for (let X in config) this[X] = config[X]
  }


  /**
   * 
   * @returns {Integer} the count from the previous run and zeroes the stopwatch
   */
  reset() {
    const val = this.count
    this.count = 0
    this.elapsed = 0
    this.startTime = 0
    return val
  }


  /**
   * This function starts the timer
   * @param {Integer} timeout - milliseconds until stopping, if undefined it runs forever
   */
  start(timeout) {
    this.startTime = Date.now()
    if (timeout) this.timeout = timeout


    this.timer = setInterval(()=>{
      this.currentTime = Date.now()

      this.elapsed = this.currentTime - this.startTime
      
      this.dT = this.currentTime - this.priorTime
  
      ++this.count
  
      if (this.onTick && (typeof this.onTick === 'function')) this.onTick({
        count: this.count,
        dt: this.dT,
        elapsed: this.elapsed,
      })
  
      this.priorTime = this.currentTime

      if (this.timeout && (this.elapsed >= this.timeout)) {
        if (this.onElapsed && (typeof this.onElapsed === 'function')) this.onElapsed({
          count: this.count,
          elapsed: this.elapsed,
        })

        this.stop()
      }
    }, this.interval);
  }


  /**
   * 
   * @param {Function} finalCallback - optional callback when stopping, this is the same function as in the constructor configuration object
   * @returns {Integer} - the final count of the stopwatch
   */
  stop(finalCallback) {
    clearInterval(this.timer)

    if (finalCallback) this.onStop = finalCallback

    if (this.onStop && (typeof this.onStop === 'function')) this.onStop({
      count: this.count,
      elapsed: this.elapsed,
    })

    return this.count
  }
}


module.exports = Stopwatch