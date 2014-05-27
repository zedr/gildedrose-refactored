describe("Gilded Rose", function() {
  "use strict";

  it("The name is foo.", 
    function() {
      var items = [ new Item("foo", 0, 0) ];
      tick(items);
      expect(items[0].name).toEqual("foo");
    });

  it("Once the sell by date has passed, Quality degrades twice as fast.", 
    function() {
      var items = [ new Item("foo", 1, 3) ];
      tick(items);
      expect(items[0].quality).toEqual(2);
      tick(items);
      expect(items[0].quality).toEqual(0);
    });

  it("The Quality of an item is never negative", 
    function() {
      var items = [ new Item("foo", 1, 3) ];
      tick(items);
      expect(items[0].quality).toEqual(2);
      tick(items);
      expect(items[0].quality).toEqual(0);
    });

  it("\"Aged Brie\" actually increases in Quality the older it gets", 
      function() {
        var items = [ new Item("Aged Brie", 1, 3) ];
        tick(items);
        expect(items[0].quality).toEqual(4);
      });

  it("The Quality of an item is never more than 50", 
      function() {
        var items = [ new Item("Aged Brie", 1, 49) ];
        tick(items);
        expect(items[0].quality).toEqual(50);
        tick(items);
        expect(items[0].quality).toEqual(50);
      });

  it("\"Aged Brie\" actually increases in Quality the older it gets", 
      function() {
        var items = [ new Item("Aged Brie", 1, 3) ];
        tick(items);
        expect(items[0].quality).toEqual(4);
      });

  it("\"Sulfuras\", being a legendary item, never has to be sold or decreases in Quality", 
      function() {
        var items = [ new Item('Sulfuras, Hand of Ragnaros', 1, 80) ];
        tick(items);
        expect(items[0].sell_in).toEqual(1);
        expect(items[0].quality).toEqual(80);
      });

  describe("Gilded Rose: Backstage passes", function() {
    "use strict";

    it("Backstage passes, like aged brie, increases in Quality as it's SellIn value approaches", 
      function() {
        var items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 11, 30) ];
        tick(items);
        expect(items[0].sell_in).toEqual(10);
        expect(items[0].quality).toEqual(31);
      });

    it("Quality increases by 2 when there are 10 days or less", 
      function() {
        var items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30) ];
        tick(items);
        expect(items[0].sell_in).toEqual(9);
        expect(items[0].quality).toEqual(32);
      });

    it("Quality increases by 3 when there are 5 days or less", 
      function() {
        var items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 30) ];
        tick(items);
        expect(items[0].sell_in).toEqual(4);
        expect(items[0].quality).toEqual(33);
      });

    it("Quality drops to 0 after the concert", 
        function() {
          var items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 30) ];
          tick(items);
          expect(items[0].sell_in).toEqual(-1);
          expect(items[0].quality).toEqual(0);
        });
  });
});

