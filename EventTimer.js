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
  runTime = 0
  startTime = 0
  
  #elapsedID = 0
  #timerID = 0

  #elapsedEventName = 'elapsed'   // callback only when timer is elapsed
  #stopEventName = 'stopped'  // callback anytime the timer is stopped
  #tickEventName = 'tick'
 
  
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
  start(tickHandler) {
    try {
      this.startTime = Date.now()
      this.count = 1
      this.runTime = 0
      
      this.priorTime = this.startTime


      this.#timerID = setInterval(()=>{
        this.currentTime = Date.now()

        this.runTime = this.currentTime - this.startTime
        
        this.dT = this.currentTime - this.priorTime
    
        ++this.count
    

        this.dispatchEvent(new CustomEvent(this.#tickEventName, {detail: {
          count: this.count,
          dt: this.dT,
          elapsed: this.runTime,
        }}))
        
        
        this.priorTime = this.currentTime
      }, this.interval)


      if (this.delay) {
        this.#elapsedID = setTimeout(() => {
          this.stop()

          this.dispatchEvent(new CustomEvent(this.#elapsedEventName, {detail: {
            count: this.count,
            elapsed: this.runTime,
          }}))
        }, this.delay);
      }
    } catch (error) {
      console.error(error)
    }
  }

  
  /**
   * 
   * @param {Function} finalCallback - optional callback when stopping, this is the same function as in the constructor configuration object
   * @returns {Integer} - the final count of the stopwatch
   */
  stop() {
    clearInterval(this.#elapsedID)
    clearInterval(this.#timerID)

    this.dispatchEvent(new CustomEvent(this.#stopEventName, {detail: {
      count: this.count,
      elapsed: this.runTime,
    }}))

    return this.count
  }
}


export default EventTimer