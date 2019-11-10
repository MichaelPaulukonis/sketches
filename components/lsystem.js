export default function Sketch (config) {
  const { p5, tm } = config
  // https://p5js.org/examples/simulate-l-systems.html

  // TURTLE STUFF:
  let x, y // the current position of the turtle
  let currentangle = 0 // which way the turtle is pointing
  const step = 20 // how much the turtle moves with each 'F'
  const turn = 90 // how much the turtle turns with a '-' or '+'

  // LINDENMAYER STUFF (L-SYSTEMS)
  let thestring = 'A' // "axiom" or start of the string
  const numloops = 5 // how many iterations to pre-compute
  const therules = [] // array for rules
  therules[0] = ['A', '-BF+AFA+FB-'] // first rule
  therules[1] = ['B', '+AF-BFB-FA+'] // second rule

  let whereinstring = 0 // where in the L-system are we?

  let pr = 0
  let pg = 10000
  let pb = 20000
  let pa = 30000

  p5.setup = () => {
    const canvas = p5.createCanvas(710, 400)
    canvas.parent('p5Canvas')
    p5.background(255)
    // stroke(0, 0, 0, 255)

    // start the x and y position at lower-left corner
    x = 0
    y = p5.height - 1

    // COMPUTE THE L-SYSTEM
    for (let i = 0; i < numloops; i++) {
      thestring = lindenmayer(thestring)
    }
  }

  p5.draw = () => {
    // TODO: capture each position in a grid (you know, an array. whatever)
    // if already populated, do not paint
    // draw the current character in the string:
    drawIt(thestring[whereinstring])

    // increment the point for where we're reading the string.
    // wrap around at the end.
    whereinstring++
    if (whereinstring > thestring.length - 1) {
      whereinstring = 0
    }
    pr += 0.01
    pg += 0.01
    pb += 0.01
    pa += 0.01
  }

  // interpret an L-system
  function lindenmayer (s) {
    let outputstring = '' // start a blank output string

    // iterate through 'therules' looking for symbol matches:
    for (let i = 0; i < s.length; i++) {
      let ismatch = 0 // by default, no match
      for (let j = 0; j < therules.length; j++) {
        if (s[i] === therules[j][0]) {
          outputstring += therules[j][1] // write substitution
          ismatch = 1 // we have a match, so don't copy over symbol
          break // get outta this for() loop
        }
      }
      // if nothing matches, just copy the symbol over.
      if (ismatch === 0) {
        outputstring += s[i]
      }
    }

    return outputstring // send out the modified string
  }

  // this is a custom function that draws turtle commands
  function drawIt (k) {
    const c = tm.getWord()
    const ch = step
    const cw = p5.textWidth(c)

    if (k === 'F') { // draw forward
      // polar to cartesian based on step and currentangle:
      // const x1 = x + step * p5.cos(p5.radians(currentangle))
      // const y1 = y + step * p5.sin(p5.radians(currentangle))
      const x1 = x + cw * p5.cos(p5.radians(currentangle))
      const y1 = y + ch * p5.sin(p5.radians(currentangle))

      // update the turtle's position:
      x = x1
      y = y1
    } else if (k === '+') {
      currentangle += turn // turn left
    } else if (k === '-') {
      currentangle -= turn // turn right
    }

    // give me some p5.random color values:
    // let r = Math.floor(p5.random(0, 255))
    // let g = Math.floor(p5.random(0, 255))
    // let b = Math.floor(p5.random(0, 255))
    // let a = Math.floor(p5.random(50, 100))
    const r = Math.floor(p5.noise(pr) * 255)
    const g = Math.floor(p5.noise(pg) * 255)
    const b = Math.floor(p5.noise(pb) * 255)
    const a = Math.floor(p5.noise(pa) * 100)

    // draw the stuff:
    p5.fill(r, g, b, a)
    p5.text(c, x, y)
  }
}
