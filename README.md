# brick and flower
## html canvas game engine

### feature plan

- [ ] file structure
  - [x] index.html - project files, libraries
  - [x] index.css - global stylesheet, animations
  - [x] main.js - main game loop, config
  - [ ] world.js - world state (model)
  - [ ] display.js - canvas methods (view)
  - [x] buffer.js - user input (controller)
- [ ] minimalist tools
  - [ ] canvas helpers <lights>
    - [ ] shapes([[x,y]])
    - [ ] polygon(x,y,radius,vertexCount)
    - [ ] arc(x,y,radius,angle,offset), circle, ellipse
    - [ ] color palettes, themes
  - [ ] viewport controls <camera>
    - [ ] look
    - [x] zoom
    - [ ] pitch
  - [ ] player control <action>
    - [x] move
    - [ ] touch
- [ ] main menu
- [ ] debug frame
- [ ] basic data
  - [ ] game CRUD
  - [ ] world config
  - [ ] entities, systems, patterns, assets, etc
  - [ ] sessions
- [ ] basic elements
  - [ ] frames, millis (main.js) <time>
  - [ ] pixels, spans, turns (display.js) <space>
  - [ ] primitives (world.js) <matter>
  - [ ] deltaMouse (buffer.js) <energy>
- [ ] libraries
  - [ ] modeler
  - [ ] physics
  - [ ] seedrandom
  - [ ] shader