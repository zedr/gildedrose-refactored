(function (NS) {
  "use strict";

  function agedBrieQualityChanger () {
    this.quality++;
  }

  function backstagePassesQualityChanger () {
    if (this.sell_in <= 0) {
      this.quality = 0;
    } else if (this.sell_in <= 5) {
      this.quality += 3;
    } else if (this.sell_in <= 10) {
      this.quality += 2;
    } else {
      agedBrieQualityChanger.call(this);
    }
  }

  function Item(name, sell_in, quality) {
    this.sell_in = sell_in;
    this.quality = quality;

    if (name === "Aged Brie") {
      this.changeQuality = agedBrieQualityChanger;
    } else if (name === "Backstage passes to a TAFKAL80ETC concert") {
      this.changeQuality = backstagePassesQualityChanger;
    } else if (name === "Sulfuras, Hand of Ragnaros") {
      this.tick = function () {};
    }

    this.name = name;
  }

  Item.prototype.changeQuality = function () {
    if (this.sell_in > 0) {
      this.quality--;
    } else {
      this.quality -= 2;
    }
  }

  Item.prototype.tick = function () {
    if (this.quality > 0 && this.quality < 50) this.changeQuality();
    this.sell_in--;
  }

  function tick(items) {
    var i, 
        itemsLen = items.length;

    for (i=0; i<itemsLen; i++) {
      items[i].tick();
    }
  }

  NS.Item = Item;
  NS.tick = tick;

}(this));
