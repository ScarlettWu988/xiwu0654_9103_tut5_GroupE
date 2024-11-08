# xiwu0654_9103_tut5_GroupE
**Name:** Scarlet Wu **StudentID:** 530634487

## I chose Perlin noise to drive my code. 

## The animation being made:

Initially, I attempted to give the artwork a sense of breathing by incorporating Perlin noise into several parameters: the baseOuterDiameter parameter in DotCircle, the baseRadius parameter in LineCircle, added dynamicDiameter to smallCircle, and also in the radius and thickness parameters of the drawPinkArc function. This allowed these shapes to undergo a smooth undulation process.

Next, I tried to enrich the artwork with a variety of colors by adding Perlin noise to the color parameters in DotCircle, LineCircle, and createEllipse.

Finally, I added some texture to the background using two-dimensional Perlin noise, but I encountered some issues. It seems there was a problem during loadPixels, as I had to multiply the height by 4 to fill the entire canvas, but I still don't know why this is the case. I hope this doesn't impact my grade too much.

## Other changes made to complete these animations:

I set the frame rate to 10 in the setup.
I moved connectPoints(points, 108) and generateRandomEllipses(points) into the draw function to facilitate the creation of animations.

## How my approach differs from other group members:

My focus was on animating the background, including the hexagonal structure, dots, and pink arcs, where I applied Perlin noise in three different ways: adjusting colors, sizes, and creating textures.
For the circles, I added some variations in radius and color for aesthetic purposes.