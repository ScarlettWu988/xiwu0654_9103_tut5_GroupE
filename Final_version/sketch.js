let circles = []; 
const points = [
    [4, 136], [95, 157], [137, 96], [136, 4], [97, 243], [242, 118],
    [264, 202], [305, 55], [356, 224], [201, 264], [53, 305], [75, 396],
    [0, 296], [162, 419], [183, 500], [224, 356], [316, 377], [336, 463],
    [422, 484], [489, 423], [540, 440], [462, 337], [376, 316], [500, 300],
    [418, 162], [396, 76], [458, 12], [500, 21], [296, 0], [500, 182],
    [0, 28], [25, -10], [6, 458], [40, 540], [300, 500]
];

// Class for circles with dot
class DotCircle {
  constructor(x, y, baseOuterDiameter, innerDiameter, numCircles, dotColor, fillColor) {
    this.x = x;
    this.y = y;
    this.baseOuterDiameter = baseOuterDiameter; // Store the base diameter for dynamic adjustments
    this.innerDiameter = innerDiameter;
    this.numCircles = numCircles;
    this.dotColor = dotColor; // Initial static color
    this.fillColor = fillColor;
    this.noiseOffset = random(1000);  // Initialize a random noise offset for color
    this.colorNoiseOffset = random(1000);  // Separate offset for color changes

    this.diameterStep = (this.baseOuterDiameter - this.innerDiameter) / (this.numCircles - 1);
  }

  display() {
    // Update color dynamically using noise
    let noiseValue = noise(this.colorNoiseOffset);
    this.dotColor = color(
      noiseValue * 255, // Red channel
      (1 - noiseValue) * 255, // Green channel, inverse of red
      128 + noiseValue * 127 // Blue channel
    );

    // Dynamic adjustment based on noise
    let dynamicOuterDiameter = this.baseOuterDiameter + noise(this.noiseOffset) * 10;
    this.diameterStep = (dynamicOuterDiameter - this.innerDiameter) / (this.numCircles - 1);

    noStroke();
    fill(this.fillColor);
    circle(this.x, this.y, dynamicOuterDiameter); // Use the dynamically adjusted diameter

    for (let i = 0; i < this.numCircles; i++) {
      let currentDiameter = (dynamicOuterDiameter - 4) - i * this.diameterStep;
      this.drawDashedCircle(this.x, this.y, currentDiameter, 6, this.dotColor, 2);
    }

    this.noiseOffset += 0.2;  // Update noise offset for continuous dynamic changes
    this.colorNoiseOffset += 0.2; // Update color noise offset
  }

  drawDashedCircle(x, y, diameter, dotSize, lineColor, spacing) {
    stroke(lineColor);
    noFill();

    let radius = diameter / 2;
    let circumference = TWO_PI * radius;
    let numDots = floor(circumference / (dotSize + spacing));

    for (let i = 0; i < numDots; i++) {
      let angle = map(i, 0, numDots, 0, TWO_PI);
      let xDot = x + radius * cos(angle);
      let yDot = y + radius * sin(angle);

      fill(lineColor);
      noStroke();
      circle(xDot, yDot, dotSize);
    }
  }
}

class LineCircle {
  constructor(x, y, baseRadius, numConcentricCircles, strokeSize, backColor, stokeColor) {
    this.x = x;
    this.y = y;
    this.staticBaseRadius = baseRadius; // Store static base radius value
    this.numConcentricCircles = numConcentricCircles;
    this.strokeSize = strokeSize;
    this.backColor = backColor;
    this.stokeColor = stokeColor;
    this.noiseOffset = random(1000); // Initialize noise offset
  }

  display() {
    // Dynamically calculate base radius using noise function
    let dynamicRadius = this.staticBaseRadius + noise(this.noiseOffset) * 10;

    fill(this.backColor);
    noStroke();
    circle(this.x, this.y, dynamicRadius * 2);

    // Dynamically calculate color
    let r = noise(this.noiseOffset + 1) * 255;
    let g = noise(this.noiseOffset + 2) * 255;
    let b = noise(this.noiseOffset + 3) * 255;
    stroke(color(r, g, b));
    strokeWeight(this.strokeSize);
    noFill();

    // Calculate and draw concentric circles
    let radiusStep = (dynamicRadius - 20) / this.numConcentricCircles;
    for (let i = 0; i < this.numConcentricCircles; i++) {
      let currentRadius = dynamicRadius - i * radiusStep;
      circle(this.x, this.y, currentRadius * 2);
    }

    // Increment noise offset for continuous dynamic changes
    this.noiseOffset += 0.1;
  }
}

// Class for circles with zigzag line
class ZigzagCircle {
  constructor(x, y, outerRadius, innerRadius, numLines, fillColor, strokeColor) {
    this.x = x; // X-coordinate for the center of the circle
    this.y = y; // Y-coordinate for the center of the circle
    this.outerRadius = outerRadius; // Radius for the outer boundary of the circle
    this.innerRadius = innerRadius; // Radius for the inner empty area
    this.numLines = numLines; // Number of zigzag lines to be drawn
    this.fillColor = fillColor; // Fill color for the outer circle
    this.strokeColor = strokeColor; // Color for the zigzag lines
  }

  display() {
    // Draw the filled outer circle
    fill(this.fillColor); // Set fill color
    noStroke(); // Disable stroke around the circle
    ellipse(this.x, this.y, this.outerRadius * 2); // Draw circle with diameter equal to twice the outer radius

    // Calculate the angle increment for each zigzag line
    let angleStep = TWO_PI / this.numLines; // Divide full circle by the number of lines to get angle increment

    // Arrays to store points on the outer and inner radius for zigzag connections
    let outerPoints = []; // Store points on the outer radius
    let innerPoints = []; // Store points on the inner radius

    // Draw radial lines from the center to the outer circle
    stroke(this.strokeColor); // Set stroke color for radial lines
    strokeWeight(2); // Set thickness for radial lines
    for (let i = 0; i < this.numLines; i++) {
      // Calculate the angle for the current line
      let angle1 = map(i, 0, this.numLines, 0, TWO_PI);

      // Calculate endpoint coordinates on the outer radius for the radial line
      let x1 = this.x + cos(angle1) * this.outerRadius;
      let y1 = this.y + sin(angle1) * this.outerRadius;

      // Draw radial line from the center to the outer radius
      line(this.x, this.y, x1, y1);

      // Calculate endpoint coordinates for the zigzag points
      let angle2 = i * angleStep; // Alternate angle calculation for zigzag points
      let xOuter = this.x + cos(angle2) * this.outerRadius; // Outer zigzag point
      let yOuter = this.y + sin(angle2) * this.outerRadius;
      let xInner = this.x + cos(angle2) * this.innerRadius; // Inner zigzag point
      let yInner = this.y + sin(angle2) * this.innerRadius;

      // Add calculated outer and inner points to their respective arrays
      outerPoints.push({ x: xOuter, y: yOuter });
      innerPoints.push({ x: xInner, y: yInner });
    }

    // Draw zigzag lines connecting outer and inner points
    stroke(this.strokeColor); // Set color for zigzag lines
    strokeWeight(2); // Set thickness for zigzag lines
    for (let i = 0; i < this.numLines; i++) {
      // Calculate index of the next point to connect for zigzag pattern
      let nextIndex = (i + 1) % this.numLines;

      // Connect current outer point to the next inner point for a zigzag pattern
      line(outerPoints[i].x, outerPoints[i].y, innerPoints[nextIndex].x, innerPoints[nextIndex].y);
    }
  }
}
// Class for small circles
class SmallCircle {
  constructor(x, y, strokeWeightValue, strokeColor, fillColor, smallCircleColor) {
    this.x = x;
    this.y = y;
    this.strokeWeightValue = strokeWeightValue;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.smallCircleColor = smallCircleColor;
    this.noiseOffset = random(1000);  // Initialize a random noise offset for dynamic animation
    this.baseDiameter = 30;  // Base diameter for outer circle
  }

  display() {
    let dynamicDiameter = this.baseDiameter + noise(this.noiseOffset) * 5;  // Add dynamic change to diameter

    stroke(this.strokeColor);
    strokeWeight(this.strokeWeightValue);
    fill(this.fillColor);
    circle(this.x, this.y, dynamicDiameter);

    fill(this.smallCircleColor);
    noStroke();
    circle(this.x, this.y, 10);  // Inner circle diameter is static

    this.noiseOffset += 0.2;  // Update noise offset
  }
}


// Dictionary with arrays for circle parameters
let circleParams = {
  1: [
    ['DotCircle', 65, 70, 140, 75, 5, '#272b5f', '#bfe0f0'],
    ['LineCircle', 65, 70, 40, 4, 3, '#984e90', '#006c31'],
    ['SmallCircle', 65, 70, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  2: [
    ['DotCircle', 175, 180, 140, 75, 5, '#159439', '#e3f2ef'],
    ['LineCircle', 175, 180, 40, 4, 3, '#eb5559', '#c74d97'],
    ['SmallCircle', 175, 180, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  3: [
    ['DotCircle', 290, 290, 140, 75, 5, '#dd3d4f', '#fff6fa'],
    ['ZigzagCircle', 290, 290, 40, 20, 30, '#d260a0', '#eb5a4b'],
    ['SmallCircle', 290, 290, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  4: [
    ['DotCircle', 400, 400, 135, 75, 5, '#15438a', '#F4C54C'],
    ['LineCircle', 400, 400, 40, 4, 3, '#eb584e', '#e97fb1'],
    ['SmallCircle', 400, 400, 3, '#040506', '#e5282c', '#b1a4b4']
  ],
  5: [
    ['DotCircle', 510, 510, 135, 75, 5, '#6eba78', '#ecf6f8'],
    ['LineCircle', 510, 510, 40, 4, 3, '#bcc25d', '#c980b5']
  ],
  6: [
    ['ZigzagCircle', 215, 30, 135/2, 35, 30, '#f8ca2a', '#e4271a'],
    ['DotCircle', 215, 30, 80, 40, 3, '#eb5a30', '#c4549b'],
    ['SmallCircle', 215, 30, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  7: [
    ['DotCircle', 330, 140, 140, 75, 5, '#c093c3', '#fab632'],
    ['LineCircle', 330, 140, 40, 4, 3, '#53bad7', '#ba60a1'],
    ['SmallCircle', 330, 140, 3, '#26869c', '#e21e19', '#AB9FAE']
  ],
  8: [
    ['DotCircle', 440, 250, 140, 75, 5, '#f07e35', '#f2f8f6'],
    ['LineCircle', 440, 250, 40, 4, 3, '#bc569c', '#117253'],
    ['SmallCircle', 440, 250, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  9: [
    ['ZigzagCircle', 550, 360, 135/2, 35, 30, '#f8ca2a', '#e4271a']
  ],
  10: [
    ['DotCircle', 370, -10, 140, 75, 5, '#e4271e', '#fceae6'],
    ['LineCircle', 370, -10, 40, 4, 3, '#e2a988', '#ba60a1'],
    ['SmallCircle', 370, -10, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  11: [
    ['DotCircle', 480, 100, 140, 75, 5, '#22315b', '#f6af4f'],
    ['DotCircle', 480, 100, 80, 40, 3, '#f4e1f0', '#bd4591'],
    ['SmallCircle', 480, 100, 3, '#040506', '#e6332a', '#b1a4b4']
  ],
  12: [
    ['DotCircle', 20, 220, 140, 75, 5, '#004985', '#f5b423'],
    ['DotCircle', 20, 220, 80, 40, 3, '#e83e35', '#c44b96'],
    ['SmallCircle', 20, 220, 3, '#040506', '#e5282c', '#b1a4b4']
  ],
  13: [
    ['ZigzagCircle', 140, 330, 135/2, 35, 30, '#f8ca2a', '#e4271a'],
    ['DotCircle', 140, 330, 80, 40, 3, '#e52a2f', '#c85d9f'],
    ['SmallCircle', 140, 330, 3, '#040506', '#e5282c', '#b1a4b4']
  ],
  14: [
    ['DotCircle', 250, 440, 140, 75, 5, '#cd1a52', '#f8b66a'],
    ['LineCircle', 250, 440, 40, 4, 3, '#bcc25d', '#c980b5'],
    ['SmallCircle', 250, 440, 3, '#040506', '#e5282c', '#b1a4b4']
  ],
  15: [
    ['DotCircle', 365, 550, 140, 75, 5, '#e72b2c', '#fdf6f7']
  ],
  16: [
    ['DotCircle', -10, 370, 140, 75, 5, '#009d90', '#daeef3'],
    ['LineCircle', -10, 370, 40, 4, 3, '#6e9381', '#af4d97'],
    ['SmallCircle', -10, 370, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  17: [
    ['DotCircle', 100, 480, 140, 75, 5, '#e52929', '#fdfdfd'],
    ['LineCircle', 100, 480, 40, 4, 3, '#b275b0', '#69c0e3'],
    ['SmallCircle', 100, 480, 3, '#040506', '#05844d', '#b1a4b4']
  ]
};
const circleClasses = {
  DotCircle: DotCircle,
  LineCircle: LineCircle,
  ZigzagCircle: ZigzagCircle,
  SmallCircle: SmallCircle
};


function setup() {
  // Create a 500x500 pixel canvas for the drawing
  createCanvas(500, 500);
  frameRate(10);
  
  // Draw a gradient background on the canvas
  drawGradient();
  
  // Create circle instances based on the parameters and class mappings
  // The 'circleParams' object contains configurations for different circle types
  // The 'circleClasses' object maps circle types to their respective class constructors
  createCircles(circleParams, circleClasses);
  
}

function draw() {
  // Loop through the array and call display() on each circle object
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
  }
  
  // Structure to hold points for connecting and generating shapes
  // connectPoints will draw lines or shapes between specified points
  connectPoints(points, 108);
  
  // Generate and draw random ellipses at the specified points
  // The 'generateRandomEllipses' function adds visual interest by placing
  // randomly sized and colored ellipses around the points
  generateRandomEllipses(points);
  
  // Draw specific pink arcs between the given points
  drawPinkArc([70, 70], [95, 157]);
  drawPinkArc([180, 180], [242, 118]);
  drawPinkArc([290, 290], [376, 316]);
  drawPinkArc([440, 250], [500, 182]);
  drawPinkArc([100, 480], [183, 500]);
}

// Function to create circle instances based on given parameters and class mappings
function createCircles(params, classes) {
  // Iterate through each key in the params object to access different circle parameter sets
  for (let key in params) {
    // Get the array of parameter sets for the current key
    let paramSetArray = params[key];
    
    // Loop through each parameter set in the array
    for (let i = 0; i < paramSetArray.length; i++) {
      // Extract the current parameter set
      const paramSet = paramSetArray[i];
      
      // The first element of the parameter set specifies the type of circle to create
      const type = paramSet[0];
      
      // Check if the circle class exists for the given type and create an instance
      // The remaining elements in paramSet are passed as arguments to the class constructor
      let instance = classes[type] ? new classes[type](...paramSet.slice(1)) : null;
      
      // If the instance was created successfully, add it to the circles array
      if (instance) {
        circles.push(instance);
      }
    }
  }
}

// Function for background
function drawGradient() {
  let topColor = color('#004e76');  // Define top color
  let bottomColor = color('#0d7faa');  // Define bottom color

  noStroke();  // Disable stroke for smoother color transitions

  loadPixels();  // Prepare pixel array for operation
  let noiseScale = 0.1;  // Noise scale factor for adjusting noise detail
  let time = millis() / 1000;  // Use time to create dynamic effects

  // Ensure loop covers the entire canvas
  for (let y = 0; y < height*4; y++) {
    for (let x = 0; x < width; x++) {
      let noiseFactor = noise(x * noiseScale, y * noiseScale, time);

      // Interpolate color based on noise factor and vertical position
      let inter = map(y, 0, height, 0, 1);
      let baseColor = lerpColor(topColor, bottomColor, inter);

      let r = red(baseColor) + noiseFactor * 100 - 50;
      let g = green(baseColor) + noiseFactor * 100 - 50;
      let b = blue(baseColor) + noiseFactor * 100 - 50;

      let index = (x + y * width) * 4;
      pixels[index] = constrain(r, 0, 255);
      pixels[index + 1] = constrain(g, 0, 255);
      pixels[index + 2] = constrain(b, 0, 255);
      pixels[index + 3] = 255;  // Completely opaque
    }
  }
  updatePixels();  // Update pixels on the canvas
}

// Function for structure

function generateRandomEllipses(points) {
  let time = frameCount * 0.1; // Time variable for dynamic effects
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0];
    let y = points[i][1];

    // Add time factor to noise input
    let w = map(noise(x * 0.05, y * 0.05, time), 0, 1, 10, 25);
    let h = map(noise(x * 0.05 + 100, y * 0.05 + 100, time + 100), 0, 1, 10, 25);
    let angle = map(noise(x * 0.05 + 200, y * 0.05 + 200, time + 200), 0, 1, -PI / 9, PI / 9);

    push();
    translate(x, y);
    rotate(angle);

    stroke(232, 120, 15);
    strokeWeight(3);
    fill(0);
    ellipse(0, 0, w, h);

    noStroke();
    fill(255);
    ellipse(0, 0, w / 3, h / 3);
    pop();
  }
}
function connectPoints(points, maxDistance) {
  // Loop through each point in the array 'points' and treat it as the starting point
  points.forEach((start, i) => {
    // For each starting point, loop through the points again to get the endpoint
    points.forEach((end, j) => {
      // Only consider pairs where the index 'i' is less than 'j' to avoid duplicate connections
      if (i < j) {
        // Calculate the distance between the two points using the 'calculateDistance' function
        const distance = calculateDistance(...start, ...end);
        
        // If the distance between the points is less than or equal to the specified 'maxDistance'
        if (distance <= maxDistance) {
          // Call 'drawConnection' to visually connect the two points, using the distance as a parameter
          drawConnection(start, end, distance);
        }
      }
    });
  });
}

function calculateDistance(x1, y1, x2, y2) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function calculateAngle(x1, y1, x2, y2) {
  const deltaY = y2 - y1;
  const deltaX = x2 - x1;
  const angleRadians = Math.atan2(deltaY, deltaX);
  return angleRadians * (180 / Math.PI);
}

function drawConnection(start, end, distance) {
  // Calculate the angle between the start and end points using the 'calculateAngle' function
  const angle = calculateAngle(...start, ...end);

  // Calculate the X-axis radius for the ellipses based on the distance, adjusting it to fit
  let radiusX = (distance - 12) / 6;

  // Calculate the Y-axis radius using noise function for dynamic "breathing" effect
  let time = frameCount * 0.1;  // Control change speed
  let radiusY = 1 + noise(time) * 4;  // Dynamically adjust radiusY between 3 and 8

  // Save the current drawing state
  push();

  // Translate the drawing origin to the starting point's coordinates
  translate(start[0], start[1]);

  // Rotate the drawing context based on the calculated angle (convert angle to radians)
  rotate(radians(angle));

  // Loop to create 3 ellipses along the line between the start and end points
  for (let i = 0; i < 3; i++) {
    // Draw an ellipse at an offset along the line, using the dynamically adjusted radii for X and Y
    createEllipse((12 + 6 + 2 * radiusX * i), 0, radiusX, radiusY);
  }

  // Restore the previous drawing state to avoid affecting other parts of the canvas
  pop();
}


function createEllipse(xPos, yPos, radiusX, radiusY) {
  
  // Use frameCount to make noise values vary over time, adding dynamic effects
  let time = frameCount * 0.2;  // Adjust time scaling to control change speed

  // Generate noise based on time and position, and map it to a brighter color range
  // Adjust noise output from [0, 1] to [0.5, 1] by multiplying by 0.5 and adding 0.5
  let r = (noise(xPos * 0.05 + time, yPos * 0.05) * 0.5 + 0.5) * 255; // Red channel
  let g = (noise(xPos * 0.05, yPos * 0.05 + time) * 0.5 + 0.5) * 255; // Green channel
  let b = (noise(xPos * 0.05 + time * 0.5, yPos * 0.05 + time * 0.5) * 0.8 + 0.2) * 255; // Blue channel

  // Use noise values to set fill color
  fill(r, g, b);
  stroke('orange');
  strokeWeight(0);  // Set stroke width

  // Draw the ellipse
  ellipse(xPos, yPos, radiusX * 2, radiusY * 2);
}

let noiseOffset = 0;

function drawPinkArc(start, end) {
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const distance = calculateDistance(...start, ...end);
  
  // Dynamically adjust arc thickness and radius using noise function
  const thickness = map(noise(noiseOffset), 0, 1, 4, 8);  // Thickness varies between 4 and 8
  const arcRadius = map(noise(noiseOffset + 0.5), 0, 1, distance * 0.8, distance * 1.2); // Radius dynamically adjusted based on distance

  stroke(255, 28, 90); // Set arc color to pink
  strokeWeight(thickness);
  noFill();

  push();
  translate(midX, midY);
  const angle = calculateAngle(...start, ...end);
  rotate(radians(angle));
  arc(0, 0, arcRadius, arcRadius, PI, TWO_PI);  // Draw a semicircular arc
  pop();

  // Increment noise offset each frame to continually change the arc's appearance
  noiseOffset += 0.01;
}