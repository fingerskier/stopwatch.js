export default tag=>{
  return (condition, message, detail, tag='')=>{
    if (condition) {
      console.log(`<${tag}>PASS`, message, detail)
    } else {
      console.error(`<${tag}>FAIL`, message, detail)
    }
  }
}