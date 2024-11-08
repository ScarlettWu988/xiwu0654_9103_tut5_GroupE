# xiwu0654_9103_tut5_GroupE
**Name:** Scarlet Wu    **StudentID:** 530634487


## Project Overview
This project explores the dynamic and aesthetically pleasing application of **Perlin noise** in animating a chosen artwork. The goal is to simulate natural variations through smooth transitions and textural enhancements in a digital environment.

## The animation being made:

Initially, I attempted to give the artwork a sense of breathing by incorporating Perlin noise into several parameters: the baseOuterDiameter parameter in DotCircle, the baseRadius parameter in LineCircle, added dynamicDiameter to smallCircle, and also in the radius and thickness parameters of the drawPinkArc function. This allowed these shapes to undergo a smooth undulation process.

Next, I tried to enrich the artwork with a variety of colors by adding Perlin noise to the color parameters in DotCircle, LineCircle, and createEllipse.

Finally, I added some texture to the background using two-dimensional Perlin noise

## Technical Challenges
One significant challenge encountered was with the `loadPixels` function; an unexpected need to multiply the canvas height by 4 to cover the entire canvas area arose. The cause of this issue remains unclear, and further investigation could help resolve it.

## Other changes made to complete these animations:

I set the frame rate to 10 in the setup.
I moved connectPoints(points, 108) and generateRandomEllipses(points) into the draw function to facilitate the creation of animations.

## How my approach differs from my group members:

My focus was on animating the background, including the hexagonal structure, dots, and pink arcs, where I applied Perlin noise in three different ways: adjusting colors, sizes, and creating textures.
For the circles, I added some variations in radius and color for aesthetic purposes.