/**
 * Emits events at specified times based on the configuration.
 * 
 */
class EventTimer extends EventTarget {
  count = 0
  currentTime = 0
  delay = 0   // time(ms) after which the timer stops
              // 0 means none
  dT = 0
  interval = 1000
  onElapsed = 'elapsed'   // callback only when timer is elapsed
  onStop = 'stopped'  // callback anytime the timer is stopped
  onTick = 'tick'
  runTime = 0
  startTime = 0
  timerID = 0
  
  
  constructor(config) {
    super()

    for (let X in config) this[X] = config[X]
  }


  /**
   * Runs a callback every tick (interval)
   * Stops after the `delay` time
   * @param {Function} tickHandler 
   * @returns an Object containing info about this timer run
   */
  async start(tickHandler) {
    this.startTime = Date.now()
    this.count = 1
    this.runTime = 0


    this.timerID = setInterval(()=>{
      this.currentTime = Date.now()

      this.runTime = this.currentTime - this.startTime
      
      this.dT = this.currentTime - this.priorTime
  
      ++this.count
  

      if (this.onTick) {
        this.dispatchEvent(new Event(this.onTick, {details: {
          count: this.count,
          dt: this.dT,
          elapsed: this.runTime,
        }}))
      }
      
      
      this.priorTime = this.currentTime
    }, this.interval)


    if (this.delay) {
      setTimeout(() => {
        this.stop()

        this.dispatchEvent(new Event(onElapsed, {details: {
          count: this.count,
          elapsed: this.runTime,
        }}))
      }, this.delay);
    }
  }

  
  /**
   * 
   * @param {Function} finalCallback - optional callback when stopping, this is the same function as in the constructor configuration object
   * @returns {Integer} - the final count of the stopwatch
   */
  stop() {
    clearInterval(this.timerID)

    if (this.onStop) this.dispatchEvent(new Event(onStop, {details: {
      count: this.count,
      elapsed: this.runTime,
    }}))

    return this.count
  }
}


window.EventTimer = EventTimer