# Timerinator

## Usage

See tests for examples.

### EventTimer

```
  const T = new EventTimer({
    delay: testDelay,
    interval: testInterval,
  })
  
  
  let startTime   // set below
  let priorTime
  
  
  T.addEventListener('elapsed', ({detail})=>{
    console.log('elapsed', detail)
  })
  
  T.addEventListener('stopped', ({detail})=>{
    console.log('stopped', detail)
  })

  
  T.addEventListener('tick', ({detail})=>{
    console.log('tick', detail)
  })
```