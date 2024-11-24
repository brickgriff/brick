# brick and flower
## html canvas game engine

### feature plan

- [ ] file structure
  - [x] index.html - project files, libraries
  - [x] index.css - global stylesheet, animations
  - [x] main.js - main game loop, config
  - [ ] world.js - world state <model>
    - [x] generate 1000s of entities
    - [x] update world positions
  - [ ] display.js - canvas methods <view>
  - [ ] buffer.js - user input <control>
    - [x] keyboard
    - [ ] mouse
    - [x] viewport
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
    - [x] see
    - [ ] use
- [ ] main menu
- [ ] debug frame
- [ ] basic data
  - [ ] game CRUD
  - [ ] world config
  - [ ] entities, systems, patterns, assets, etc
  - [ ] sessions
- [ ] basic elements
  - [x] frames, millis (main.js) <time>
  - [ ] pixels, spans, turns (display.js) <space>
  - [ ] primitives (world.js) <matter>
  - [ ] deltaMouse (buffer.js) <energy>
- [ ] libraries
  - [ ] modeler
  - [ ] physics
  - [ ] seedrandom
  - [ ] shader
  - [ ] svg
