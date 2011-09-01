/**
 * @fileoverview Container data structure.
 */

goog.provide('treesaver.layout.Container');

goog.require('treesaver.dimensions');
goog.require('treesaver.dom');

goog.scope(function() {
  var dimensions = treesaver.dimensions,
      dom = treesaver.dom;

  /**
   * A column within a grid
   *
   * @constructor
   * @param {!Element} el         HTML element.
   * @param {number}   gridHeight The height of the grid that contains this container.
   */
  treesaver.layout.Container = function(el, gridHeight) {
    var d = new treesaver.dimensions.Metrics(el);

    /**
     * @type {boolean}
     */
    this.flexible = !treesaver.dom.hasClass(el, 'fixed');

    /**
     * @type {number}
     */
    this.minH = d.minH;

    // Need to clear the minHeight, if there is one, in order to get an accurate
    // delta reading
    if (this.minH) {
      treesaver.dimensions.setCssPx(el, 'minHeight', 0);
    }

    /**
     * @type {number}
     */
    this.h = d.outerH;

    /**
     * @type {number}
     */
    this.delta = Math.max(0, gridHeight - this.h);

    var sizesProperty = el.getAttribute('data-sizes');

    /**
     * @type {!Array.<string>}
     */
    this.sizes = sizesProperty ? sizesProperty.split(' ') : [];
  };
});

goog.scope(function() {
  var Container = treesaver.layout.Container,
      dimensions = treesaver.dimensions,
      dom = treesaver.dom;

  /**
   * @param {number} gridHeight
   * @return {!treesaver.layout.Container} Returns self for chaining support.
   */
  Container.prototype.stretch = function(gridHeight) {
    if (!this.flexible) {
      return this;
    }

    this.h = Math.max(0, gridHeight - this.delta);

    return this;
  };

  if (goog.DEBUG) {
    Container.prototype.toString = function() {
      return '[Container ' + this.h + '/' + this.delta + ']';
    };
  }
});
