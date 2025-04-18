// /Users/michaelpaulukonis/projects/sketches/components/mona-blocks.js
export default function Sketch (config) {
  // Destructure p5 instance and potentially size from config
  const { p5Instance: p5, size: initialSize, imageUrl } = config

  // --- Sketch-scoped variables ---
  let paddle
  let ball
  let blocks = []
  let DEBUG = false

  // Grid Layout Configuration (remains constant)
  const desiredBlockSize = 15
  const gap = 1 // Gap between blocks
  const marginTop = 20 // Space above grid
  const marginBottom = 75 // Space below grid
  const marginHorizontal = 20 // Space on left/right sides

  // Calculated Grid Properties (will be set in createDynamicBlocks)
  let gridCols = 0
  let gridRows = 0
  let gridStartX = 0
  let gridStartY = 0
  let gridActualWidth = 0
  let gridActualHeight = 0

  // Game states
  const GAME_START = 'start'
  const GAME_PLAYING = 'playing'
  const GAME_PAUSED = 'pause'
  const GAME_OVER = 'gameover'

  // Game variables
  let gameState = GAME_START
  const score = {
    launches: 0,
    blocksDestroyed: 0,
    totalBlocks: 0 // Initialized in createDynamicBlocks
  }

  let sourceImage
  const sounds = {
    mute: false,
    blockHit: null,
    paddleHit: null, // Need to load these if desired
    ballMiss: null,
    ballLaunch: null,
    wallHit: null,
    gameStart: null,
    gameOver: null,
    pause: null,
    victory: null
  }

  class Block {
    constructor (x, y, size) {
      this.size = size
      this.x = x
      this.y = y
      this.active = true
      this.fillColor = p5.color(200) // Default fill
      this.strokeColor = p5.color(0)
      this.color = p5.color(128) // Default color if image processing fails
    }

    draw () {
      if (this.active) {
        p5.fill(this.color)
        p5.stroke(this.strokeColor)
        p5.strokeWeight(2)

        p5.rectMode(p5.CORNER)
        p5.rect(this.x, this.y, this.size, this.size)
      }
    }

    handleBlockCollision (ball, block) {
      const ballCenterX = ball.x + ball.size / 2
      const ballCenterY = ball.y + ball.size / 2
      const blockCenterX = this.x + this.size / 2
      const blockCenterY = this.y + this.size / 2

      const halfTotalWidth = (ball.size + this.size) / 2
      const halfTotalHeight = (ball.size + this.size) / 2

      const vecX = ballCenterX - blockCenterX
      const vecY = ballCenterY - blockCenterY

      const overlapX = halfTotalWidth - Math.abs(vecX)
      const overlapY = halfTotalHeight - Math.abs(vecY)

      const overlapTolerance = 0.5
      const resolutionEpsilon = 0.01

      if (overlapX > 0 && overlapY > 0) {
        let collisionAxis = null

        if (Math.abs(overlapX - overlapY) < overlapTolerance) {
          if (Math.abs(ball.dx) > Math.abs(ball.dy)) {
            collisionAxis = 'horizontal'
            if (DEBUG) {
              console.log(
                `Ambiguous Hit (Overlap): Favoring Horizontal (vx=${ball.dx.toFixed(
                  2
                )}, vy=${ball.dy.toFixed(2)})`
              )
            }
          } else {
            collisionAxis = 'vertical'
            if (DEBUG) {
              console.log(
                `Ambiguous Hit (Overlap): Favoring Vertical (vx=${ball.dx.toFixed(
                  2
                )}, vy=${ball.dy.toFixed(2)})`
              )
            }
          }
        } else if (overlapX < overlapY) {
          collisionAxis = 'horizontal'
          if (DEBUG) {
            console.log(
              `Clear Horizontal Hit: overlapX=${overlapX.toFixed(
                2
              )}, overlapY=${overlapY.toFixed(2)}`
            )
          }
        } else {
          collisionAxis = 'vertical'
          if (DEBUG) {
            console.log(
              `Clear Vertical Hit: overlapX=${overlapX.toFixed(
                2
              )}, overlapY=${overlapY.toFixed(2)}`
            )
          }
        }

        if (collisionAxis === 'horizontal') {
          ball.dx *= -1
          const resolveDistX = overlapX + resolutionEpsilon
          ball.x += Math.sign(vecX) * resolveDistX
          if (DEBUG) {
            console.log(
              `   Reflecting dx, Resolving X by ${
                Math.sign(vecX) * resolveDistX
              }`
            )
          }
        } else if (collisionAxis === 'vertical') {
          ball.dy *= -1
          // Corrected direction: push ball *away* from block center along Y
          const resolveDistY = overlapY + resolutionEpsilon
          ball.y += Math.sign(vecY) * resolveDistY // Push in direction of vecY
          if (DEBUG) {
            console.log(
              `   Reflecting dy, Resolving Y by ${
                Math.sign(vecY) * resolveDistY
              }`
            )
          }
        }
      }
    }

    checkCollision (ball) {
      if (!this.active) {
        return false
      }

      // AABB collision check using ball CENTER and block CORNER+SIZE
      // Use ball.x/y which are center points for ellipse
      if (
        ball.x + ball.size / 2 > this.x && // Ball right edge > Block left edge
        ball.x - ball.size / 2 < this.x + this.size && // Ball left edge < Block right edge
        ball.y + ball.size / 2 > this.y && // Ball bottom edge > Block top edge
        ball.y - ball.size / 2 < this.y + this.size // Ball top edge < Block bottom edge
      ) {
        if (!sounds.mute && sounds.blockHit && sounds.blockHit.isLoaded()) {
          sounds.blockHit.play()
        }

        this.handleBlockCollision(ball, this)

        this.active = false
        score.blocksDestroyed++

        if (
          score.blocksDestroyed >= score.totalBlocks &&
          score.totalBlocks > 0
        ) {
          gameState = GAME_OVER
          // if (!sounds.mute && sounds.victory && sounds.victory.isLoaded()) sounds.victory.play();
        }

        return true
      }
      return false
    }
  }

  class Paddle {
    constructor () {
      this.width = 80
      this.height = 4
      this.x = p5.width / 2 + p5.random(-50, 50)
      this.y = p5.height - 30
      this.speed = 5
    }

    move () {
      // Use p5 versions of key constants and functions
      if (p5.keyIsDown(p5.LEFT_ARROW)) {
        this.x = p5.max(this.width / 2, this.x - this.speed)
      }
      if (p5.keyIsDown(p5.RIGHT_ARROW)) {
        this.x = p5.min(p5.width - this.width / 2, this.x + this.speed)
      }

      // Use p5 mouse variables
      if (p5.mouseIsPressed) {
        this.x = p5.constrain(
          p5.mouseX,
          this.width / 2,
          p5.width - this.width / 2
        )
      }
    }

    draw () {
      p5.fill(255)
      p5.rectMode(p5.CENTER)
      p5.rect(this.x, this.y, this.width, this.height)
    }
  }

  class Ball {
    constructor () {
      this.size = 8
      // Reset needs p5.width/height, call it from setup or similar
      // Initial placeholder values
      this.x = 0
      this.y = 0
      this.dx = 0
      this.dy = 0
      this.speed = 5
      this.launched = false
    }

    reset () {
      // Use p5.width/height
      this.x = p5.width / 2
      this.y = p5.height - 50 // Position above paddle area
      this.dx = 0
      this.dy = 0
      this.launched = false
    }

    launch () {
      if (!this.launched) {
        this.launched = true
        this.dy = this.speed // Initial launch downwards
        // Use p5 constants and functions
        const angle = p5.random(-p5.PI / 6, p5.PI / 6) // Random angle +/- 30 degrees
        this.dx = this.speed * p5.sin(angle)
        // Ensure dy is pointing downwards, adjust based on angle if needed, but simple downward is fine
        // this.dy = this.speed * p5.cos(angle); // This would make it go up if angle is large
        score.launches++
        // if (!sounds.mute && sounds.ballLaunch && sounds.ballLaunch.isLoaded()) sounds.ballLaunch.play();
      }
    }

    move () {
      if (!this.launched) {
        // Ball follows paddle before launch
        this.x = paddle.x
        this.y = p5.height - 50 // Keep it relative to bottom or paddle
        return
      }

      this.x += this.dx
      this.y += this.dy

      // Wall collisions - use p5.width/height
      if (this.x <= this.size / 2 || this.x >= p5.width - this.size / 2) {
        this.dx *= -1
        this.x = p5.constrain(this.x, this.size / 2, p5.width - this.size / 2) // Prevent sticking
        // if (!sounds.mute && sounds.wallHit && sounds.wallHit.isLoaded()) sounds.wallHit.play();
      }
      if (this.y <= this.size / 2) {
        this.dy *= -1
        this.y = this.size / 2 // Prevent sticking
        // if (!sounds.mute && sounds.wallHit && sounds.wallHit.isLoaded()) sounds.wallHit.play();
      }

      // Bottom screen check - reset ball if missed
      if (this.y >= p5.height) {
        // if (!sounds.mute && sounds.ballMiss && sounds.ballMiss.isLoaded()) sounds.ballMiss.play();
        this.reset()
      }

      // Paddle collision
      if (
        this.y + this.size / 2 >= paddle.y - paddle.height / 2 &&
        this.y - this.size / 2 <= paddle.y + paddle.height / 2 &&
        this.x + this.size / 2 >= paddle.x - paddle.width / 2 && // Check horizontal overlap too
        this.x - this.size / 2 <= paddle.x + paddle.width / 2
      ) {
        // Only reflect if moving downwards
        if (this.dy > 0) {
          // Calculate new angle based on hit position relative to paddle center
          let relativeHitPosition = (this.x - paddle.x) / (paddle.width / 2)
          // Clamp relative position to avoid extreme angles from edge hits
          relativeHitPosition = p5.constrain(relativeHitPosition, -1, 1)
          const angle = relativeHitPosition * (p5.PI / 3) // Max 60-degree angle change

          this.dx = this.speed * p5.sin(angle)
          this.dy = -this.speed * p5.cos(angle) // Reflect upwards

          // Ensure ball doesn't get stuck in paddle - move it just above
          this.y = paddle.y - paddle.height / 2 - this.size / 2 - 0.1 // Small offset

          // if (!sounds.mute && sounds.paddleHit && sounds.paddleHit.isLoaded()) sounds.paddleHit.play();
        }
      }
    }

    draw () {
      p5.fill(255)
      p5.noStroke() // Typically no stroke for the ball
      p5.ellipseMode(p5.CENTER) // Use ellipseMode for clarity with x,y as center
      p5.ellipse(this.x, this.y, this.size, this.size)
    }
  }

  // --- Helper functions defined within Sketch scope ---

  function processImage () {
    if (!sourceImage || blocks.length === 0 || gridCols <= 0 || gridRows <= 0) {
      console.warn(
        'Cannot process image: Image not loaded or grid not created/invalid.'
      )
      return
    }

    // Define your tint/shade amount (0.0 = no change, 1.0 = fully white/black)
    // const tintAmount = 0.3 // Example: 30% towards white
    const shadeAmount = 0.5 // Example: 30% towards black

    // Define target colors using p5 instance
    // const whiteColor = p5.color(255)
    const blackColor = p5.color(0)

    // Ensure pixels are loaded (might already be if accessed before)
    sourceImage.loadPixels()
    if (!sourceImage.pixels || sourceImage.pixels.length === 0) {
      console.error('Image pixel data is not available after loadPixels().')
      return
    }

    const gridAspectRatio = gridActualWidth / gridActualHeight // Use calculated actual grid dimensions
    const imageAspectRatio = sourceImage.width / sourceImage.height

    let sampleX = 0
    let sampleY = 0
    let sampleWidth = sourceImage.width
    let sampleHeight = sourceImage.height

    if (gridAspectRatio > imageAspectRatio) {
      sampleHeight = sourceImage.width / gridAspectRatio
      sampleY = (sourceImage.height - sampleHeight) / 2
    } else if (gridAspectRatio < imageAspectRatio) {
      sampleWidth = sourceImage.height * gridAspectRatio
      sampleX = (sourceImage.width - sampleWidth) / 2
    }

    sampleWidth = p5.max(1, sampleWidth)
    sampleHeight = p5.max(1, sampleHeight)
    sampleX = p5.max(0, sampleX)
    sampleY = p5.max(0, sampleY)

    const blockAndGapWidth = desiredBlockSize + gap
    const blockAndGapHeight = desiredBlockSize + gap

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]

      // Calculate col/row based on block's position relative to grid start
      let col = Math.round((block.x - gridStartX) / blockAndGapWidth)
      let row = Math.round((block.y - gridStartY) / blockAndGapHeight)

      col = p5.constrain(col, 0, gridCols - 1)
      row = p5.constrain(row, 0, gridRows - 1)

      // Map block col/row to the *sampling region* coordinates
      let imgX = p5.map(
        col,
        0,
        gridCols - 1,
        sampleX,
        sampleX + sampleWidth - 1
      )
      let imgY = p5.map(
        row,
        0,
        gridRows - 1,
        sampleY,
        sampleY + sampleHeight - 1
      )

      imgX = Math.floor(imgX)
      imgY = Math.floor(imgY)

      imgX = p5.constrain(imgX, 0, sourceImage.width - 1)
      imgY = p5.constrain(imgY, 0, sourceImage.height - 1)

      const index = 4 * (imgY * sourceImage.width + imgX)

      if (index >= 0 && index + 3 < sourceImage.pixels.length) {
        // Get the original color from the image pixels
        const originalColor = p5.color(
          sourceImage.pixels[index], // R
          sourceImage.pixels[index + 1], // G
          sourceImage.pixels[index + 2], // B
          255 // A (Keep it opaque)
        )

        // --- CHOOSE ONE of the following lines ---

        // Option A: Tint the color (make it lighter)
        // block.color = p5.lerpColor(originalColor, whiteColor, tintAmount)

        // Option B: Shade the color (make it darker)
        block.color = p5.lerpColor(originalColor, blackColor, shadeAmount)

        // Option C: Keep original color (for reference)
        // block.color = originalColor;

        // --- End of choices ---
      } else {
        console.warn(
          `Invalid pixel index: ${index} for block col ${col}, row ${row} (img ${imgX}, ${imgY})`
        )
        block.color = p5.color(128) // Fallback gray
      }
    }
    // No need to call updatePixels() if just reading
    console.log('Image processed onto blocks (with cropping).')
  }

  function createDynamicBlocks () {
    blocks = [] // Clear existing blocks

    // Use p5.width/height for calculations
    const availableWidth = p5.width - 2 * marginHorizontal
    const availableHeight = p5.height - marginTop - marginBottom

    if (availableWidth <= 0 || availableHeight <= 0) {
      console.error('Not enough space for blocks with current margins.')
      score.totalBlocks = 0
      return
    }

    const blockAndGapWidth = desiredBlockSize + gap
    const blockAndGapHeight = desiredBlockSize + gap

    // Use p5.floor
    gridCols = p5.floor((availableWidth + gap) / blockAndGapWidth)
    gridRows = p5.floor((availableHeight + gap) / blockAndGapHeight)

    if (gridCols <= 0 || gridRows <= 0) {
      console.error(
        'Calculated 0 columns or rows. Check block size, gap, and margins relative to canvas size.'
      )
      score.totalBlocks = 0
      return
    }

    gridActualWidth =
      gridCols * desiredBlockSize + p5.max(0, gridCols - 1) * gap
    gridActualHeight =
      gridRows * desiredBlockSize + p5.max(0, gridRows - 1) * gap

    gridStartX = marginHorizontal + (availableWidth - gridActualWidth) / 2
    gridStartY = marginTop + (availableHeight - gridActualHeight) / 2

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const x = gridStartX + col * blockAndGapWidth
        const y = gridStartY + row * blockAndGapHeight
        blocks.push(new Block(x, y, desiredBlockSize)) // Block constructor uses p5.color
      }
    }

    score.totalBlocks = gridCols * gridRows
    score.blocksDestroyed = 0 // Reset destroyed count when creating blocks
    console.log(
      `Created grid: ${gridCols}x${gridRows}, Start: (${gridStartX.toFixed(
        1
      )}, ${gridStartY.toFixed(1)}), Size: ${gridActualWidth.toFixed(
        1
      )}x${gridActualHeight.toFixed(1)}, Total: ${score.totalBlocks}`
    )

    // Process the image onto the newly created blocks if the image is loaded
    if (sourceImage && sourceImage.width > 0) {
      processImage()
    } else {
      console.log(
        'Image not ready during createDynamicBlocks, will process later if needed.'
      )
      // Blocks will have their default color initially
    }
  }

  function drawStartScreen () {
    p5.fill(255)
    p5.textSize(32)
    p5.text('BLOCK BREAKER', p5.width / 2, p5.height / 3)

    p5.textSize(16)
    p5.text('Controls:', p5.width / 2, p5.height / 2 - 40)
    p5.text('← → Arrow Keys or Mouse to move', p5.width / 2, p5.height / 2)
    p5.text('SPACE to launch ball', p5.width / 2, p5.height / 2 + 30)
    p5.text('P to pause', p5.width / 2, p5.height / 2 + 60)
    p5.text('M to mute/unmute', p5.width / 2, p5.height / 2 + 90)

    p5.textSize(20)
    p5.text('Press SPACE to start', p5.width / 2, (p5.height * 3) / 4)
  }

  function drawPauseScreen () {
    p5.rectMode(p5.CORNER)
    p5.fill(0, 0, 0, 127) // Semi-transparent overlay
    p5.rect(0, 0, p5.width, p5.height)

    p5.fill(255)
    p5.textSize(32)
    p5.text('PAUSED', p5.width / 2, p5.height / 2)
    p5.textSize(16)
    p5.text('Press P to continue', p5.width / 2, p5.height / 2 + 40)
  }

  function drawGameOverScreen () {
    p5.rectMode(p5.CORNER)
    p5.fill(0, 0, 0, 127)
    p5.rect(0, 0, p5.width, p5.height)

    p5.fill(255)
    p5.textSize(32)
    const message =
      score.blocksDestroyed >= score.totalBlocks ? 'YOU WIN!' : 'GAME OVER'
    p5.text(message, p5.width / 2, p5.height / 3)

    p5.textSize(20)
    p5.text(`Launches: ${score.launches}`, p5.width / 2, p5.height / 2)
    p5.text(
      `Blocks Destroyed: ${score.blocksDestroyed}/${score.totalBlocks}`,
      p5.width / 2,
      p5.height / 2 + 30
    )

    p5.textSize(16)
    p5.text('Press SPACE to play again', p5.width / 2, (p5.height * 3) / 4)
  }

  function drawGame () {
    // Background image drawing (cropped and aligned)
    if (
      sourceImage &&
      sourceImage.width > 0 &&
      gridActualWidth > 0 &&
      gridActualHeight > 0
    ) {
      const gridAspect = gridActualWidth / gridActualHeight
      const imageAspect = sourceImage.width / sourceImage.height

      const destX = gridStartX
      const destY = gridStartY
      const destW = gridActualWidth
      const destH = gridActualHeight

      let sourceX = 0
      let sourceY = 0
      let sourceW = sourceImage.width
      let sourceH = sourceImage.height

      if (imageAspect > gridAspect) {
        sourceW = sourceImage.height * gridAspect
        sourceX = (sourceImage.width - sourceW) / 2
      } else if (imageAspect < gridAspect) {
        sourceH = sourceImage.width / gridAspect
        sourceY = (sourceImage.height - sourceH) / 2
      }

      sourceX = p5.max(0, sourceX)
      sourceY = p5.max(0, sourceY)
      sourceW = p5.max(1, sourceW)
      sourceH = p5.max(1, sourceH)
      sourceW = p5.min(sourceW, sourceImage.width - sourceX)
      sourceH = p5.min(sourceH, sourceImage.height - sourceY)

      // Use p5.image
      p5.image(
        sourceImage,
        destX,
        destY,
        destW,
        destH,
        sourceX,
        sourceY,
        sourceW,
        sourceH
      )
    } else {
      // Fallback background if image not ready
      p5.background(50) // Dark grey fallback
    }

    // Update positions if not paused
    if (gameState !== GAME_PAUSED) {
      paddle.move()
      ball.move()
    }

    // Collision detection if playing and ball launched
    if (gameState === GAME_PLAYING && ball.launched) {
      for (const block of blocks) {
        // checkCollision now handles sound, state change, score
        if (block.checkCollision(ball)) {
          // Collision happened, block made inactive.
          // No need to break if multiple blocks can be hit per frame,
          // but breaking might be slightly more performant if only one matters.
          // break;
        }
      }
    }

    // Draw everything
    for (const block of blocks) {
      block.draw() // Block draw handles active state
    }

    paddle.draw()
    ball.draw()

    // Draw score information
    p5.fill(255)
    p5.textSize(12)
    p5.textAlign(p5.LEFT, p5.CENTER)
    p5.text(`Launches: ${score.launches}`, 10, p5.height - 15)
    p5.textAlign(p5.RIGHT, p5.CENTER)
    p5.text(
      `Blocks: ${score.blocksDestroyed}/${score.totalBlocks}`,
      p5.width - 10,
      p5.height - 15
    )

    // Reset text alignment for other potential text
    p5.textAlign(p5.CENTER, p5.CENTER)
  }

  function resetGame () {
    score.launches = 0
    // score.blocksDestroyed = 0; // This is reset in createDynamicBlocks
    gameState = GAME_START // Go back to start screen
    createDynamicBlocks() // Recreate blocks (also resets score.blocksDestroyed and calls processImage)
    paddle = new Paddle() // Recreate paddle in new position
    ball = new Ball() // Recreate ball
    ball.reset() // Position ball correctly
  }

  // --- p5 lifecycle functions assigned to p5 instance ---

  p5.preload = () => {
    // Use p5.loadImage / p5.loadSound
    // Ensure paths are correct relative to where the sketch/assets are served
    try {
      sourceImage = p5.loadImage(
        imageUrl,
        _ => console.log('Image loaded successfully in preload'),
        err => console.error('Failed to load image:', err)
      )
      // sounds.blockHit = p5.loadSound('@/assets/mon-blocks/704260__baggonotes__mug_tap.wav',
      //     sound => { console.log("Block hit sound loaded"); },
      //     err => { console.error("Failed to load block hit sound:", err); }
      // );
      // Load other sounds here if needed
    } catch (error) {
      console.error('Error during preload:', error)
    }
  }

  p5.setup = () => {
    // Use initialSize from config or default values
    const cWidth = initialSize ? initialSize.width : 400
    const cHeight = initialSize ? initialSize.height : 600
    const canvas = p5.createCanvas(cWidth, cHeight)
    canvas.parent('p5Canvas') // Make sure 'p5Canvas' element exists in your Vue template

    p5.textAlign(p5.CENTER, p5.CENTER) // Set default text align

    // Instantiate objects now that p5.width/height are set
    paddle = new Paddle()
    ball = new Ball()
    ball.reset() // Initialize ball position based on canvas size

    createDynamicBlocks() // Create the grid (this will also call processImage if sourceImage is ready)

    console.log('p5 setup complete.')
    gameState = GAME_START // Ensure game starts at the start screen
  }

  p5.draw = () => {
    // Main draw loop delegates based on gameState
    p5.background(0) // Clear background each frame

    switch (gameState) {
      case GAME_START:
        drawGame() // Draw underlying game elements (paddle, ball placeholder)
        drawStartScreen() // Overlay start screen text
        break
      case GAME_PLAYING:
        drawGame()
        break
      case GAME_PAUSED:
        drawGame() // Draw the static game state
        drawPauseScreen() // Overlay pause screen text
        break
      case GAME_OVER:
        drawGame() // Draw the final game state
        drawGameOverScreen() // Overlay game over text
        break
    }
  }

  p5.keyPressed = () => {
    // Use p5.key for character keys, p5.keyCode for special keys if needed
    // Note: p5.key handles case ('p' vs 'P') automatically in recent versions

    if (p5.key === 'm') {
      sounds.mute = !sounds.mute
      console.log('Mute toggled:', sounds.mute)
    } else if (p5.key === 'd') {
      DEBUG = !DEBUG
      console.log('DEBUG toggled:', DEBUG)
    }

    switch (gameState) {
      case GAME_START:
        if (p5.key === ' ') {
          gameState = GAME_PLAYING
          // Don't launch ball immediately, wait for another space press
        }
        break

      case GAME_PLAYING:
        if (p5.key === ' ' && !ball.launched) {
          ball.launch()
        } else if (p5.key === 'p' || (p5.key === ' ' && ball.launched)) {
          gameState = GAME_PAUSED
          // if (!sounds.mute && sounds.pause && sounds.pause.isLoaded()) sounds.pause.play();
        }
        break

      case GAME_PAUSED:
        if (p5.key === 'p' || p5.key === ' ') {
          gameState = GAME_PLAYING
        }
        break

      case GAME_OVER:
        if (p5.key === ' ') {
          resetGame() // Resets score, blocks, ball, paddle, sets state to GAME_START
          // gameState is set to GAME_START inside resetGame
        }
        break
    }
    return false // Prevent default browser behavior for keys like space
  }

  // Optional: Add windowResized handler for responsiveness
  p5.windowResized = () => {
    const currentWidth = p5.windowWidth // Or use a container div's size
    const currentHeight = p5.windowHeight
    // You might want to constrain the resize logic, e.g., use parent element size
    // For now, just resize to window dimensions
    p5.resizeCanvas(currentWidth, currentHeight)

    // Recalculate layout and elements based on new size
    createDynamicBlocks() // Recreate blocks for new dimensions

    // Reset paddle and ball positions appropriately
    paddle = new Paddle() // Recreate paddle centered
    ball = new Ball()
    ball.reset() // Reset ball position

    // If the game was in progress, maybe reset to start? Or try to adapt?
    // Resetting to start is simplest for this game type on resize.
    gameState = GAME_START
    score.launches = 0 // Reset launches as well if resetting state

    console.log(`Resized canvas to ${currentWidth}x${currentHeight}`)
  }
} // End of export default function Sketch
