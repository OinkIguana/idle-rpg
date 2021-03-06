// Manages the current location in the world and draws that location on the map
//     display
'use strict';

import { ButtonStyles } from '../display/button';
import { infoPopup as info, setLocation, combine } from '../display/button-action';

// Town outside
import HOUSE_NORMAL from 'graphics/town/house/normal.aag';
import HOUSE_REVERSE from 'graphics/town/house/reverse.aag';
import HOUSE_GARDEN from 'graphics/town/house/garden.aag';
import HOUSE_DOUBLE from 'graphics/town/house/double.aag';
import SHOP_OUTSIDE from 'graphics/town/shop/outside.aag';
import TOWNHALL_OUTSIDE from 'graphics/town/town-hall/outside.aag';
// Buildings
import WALLS from 'graphics/town/walls.aag';
// Shop
import DOORWAY from 'graphics/town/shop/door.aag';
import TABLE from 'graphics/town/shop/table.aag';
import SHELF_H from 'graphics/town/shop/shelf-h.aag';
import SHELF_V from 'graphics/town/shop/shelf-v.aag';
import WINDOW from 'graphics/town/shop/window.aag';
// Town Hall
import DESK from 'graphics/town/town-hall/desk.aag';
import DOOR from 'graphics/town/town-hall/door.aag';
import PAINTING from 'graphics/town/town-hall/painting.aag';

import TOWNHALL_INSIDE from 'graphics/town/town-hall/inside.aag';

const [DISPLAY, LOCATION, RENDER] = [Symbol(), Symbol(), Symbol()];

class MapView {
  // MapView(display: Display)
  constructor() {
    this.location = 'townLeft';
  }

  // .attach(display: Display): this
  //    sets the Display that this MapView will draw on
  attach(display) {
    this[DISPLAY] = display;
    this[RENDER]();
    return this;
  }

  // .location: string
  //      the player's current location on the map
  get location() { return this[LOCATION]; }
  set location(location) {
    this[LOCATION] = location;
    if(this[DISPLAY]) {
      this[DISPLAY].clear();
      this[RENDER]();
    }
  }

  // .townLeft(): void
  //    draws the left half of the town
  townLeft() {
    this[DISPLAY]
      // sideways roads
      .text('_'.repeat(120), 0, 7)
      .text('_'.repeat(120), 0, 8)
      .text('_'.repeat(120), 0, 22)
      .text('_'.repeat(120), 0, 25)
      // road connecting the other roads
      .text('   ', 51, 8)
      .pipe((d) => {
        for(let i = 0; i < 14; ++i) {
          d.text(`/${'  '.repeat(i/5+1)}/`, 50 - i, 9 + i);
        }
      })
      // houses (back row)
      .image(HOUSE_NORMAL, 3, 1, false, '.')
        .button(info('A house'), ButtonStyles.Ninja) // TODO#5: i18n
      .image(HOUSE_REVERSE, 22, 1, false, '.')
        .button(info('A house'), ButtonStyles.Ninja) // TODO#5: i18n
      .image(HOUSE_GARDEN, 40, 0, false, '.')
        .button(info('A house with\na nice garden'), ButtonStyles.Ninja) // TODO#5: i18n
      .image(HOUSE_DOUBLE, 58, 1, false, '.')
        .button(info('Two houses\nin one'), ButtonStyles.Ninja) // TODO#5: i18n
      .image(HOUSE_NORMAL, 94, 1, false, '.')
        .button(info('A house'), ButtonStyles.Ninja) // TODO#5: i18n
        .text('/ /', 41, 7)
      // buildings (front row)
      .image(SHOP_OUTSIDE, 5, 10)
        .button(combine(info('Shop'), setLocation('shop'))) // TODO#5: i18n
      .image(TOWNHALL_OUTSIDE, 70, 10)
        .button(combine(info('Town Hall'), setLocation('townHall'))) // TODO#5: i18n
        .text('/  /', 15, 22);
  }

  // .shop(): void
  //    draws the shop
  shop() {
    this[DISPLAY]
      .image(WALLS, 0, 0)
      .image(SHELF_H, 24, 1)
      .image(SHELF_H, 24, 5)
      .image(SHELF_H, 24, 9)
      .image(SHELF_V, 3, 3)
      .image(TABLE, 8, 20)
      .image(DOORWAY, 73, 0, true)
      .image(WINDOW, 108, 5)
      .text('Leave', 57, 35)
        .button(setLocation('townLeft'), ButtonStyles.Real);
  }

  // .townHall(): void
  //    draws the town hall
  townHall() {
    this[DISPLAY]
      .image(TOWNHALL_INSIDE, 0, 0)
      .image(DESK, 20, 19)
      .image(DOOR, 73, 0)
      .image(PAINTING, 29, 2)
      .text('Leave', 57, 35)
        .button(setLocation('townLeft'), ButtonStyles.Real);
  }

  // .[RENDER](): this
  //    updates what is currently shown on the display
  [RENDER]() {
    this[this[LOCATION]]();
  }
}

export default new MapView();
