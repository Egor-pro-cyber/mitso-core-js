
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = function () {
    return this.width * this.height;
  };;
}

function getJSON(obj) {
  return JSON.stringify(obj);
}


function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  return Object.setPrototypeOf(obj, proto);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class Selector {
  constructor() {
    this.parts = {
      element: '',
      id: '',
      classes: [],
      attributes: [],
      pseudoClasses: [],
      pseudoElement: '',
    };
    this.combined = '';
  }

  checkOrder(order) {
    if (this.lastOrder > order) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    this.lastOrder = order;
  }

  element(value) {
    if (this.parts.element) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    this.parts.element = value;
    this.checkOrder(1);
    return this;
  }

  id(value) {
    if (this.parts.id) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    this.parts.id = `#${value}`;
    this.checkOrder(2);
    return this;
  }

  pseudoElement(value) {
    if (this.parts.pseudoElement) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    this.parts.pseudoElement = `::${value}`;
    this.checkOrder(6);
    return this;
  }

  class(value) {
    this.parts.classes.push(`.${value}`);
    this.checkOrder(3);
    return this;
  }

  attr(value) {
    this.parts.attributes.push(`[${value}]`);
    this.checkOrder(4);
    return this;
  }

  pseudoClass(value) {
    this.parts.pseudoClasses.push(`:${value}`);
    this.checkOrder(5);
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.combined = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return this;
  }

  stringify() {
    if (this.combined) return this.combined;
    return (
      this.parts.element
      + this.parts.id
      + this.parts.classes.join('')
      + this.parts.attributes.join('')
      + this.parts.pseudoClasses.join('')
      + this.parts.pseudoElement
    );
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new Selector().element(value);
  },
  id(value) {
    return new Selector().id(value);
  },
  class(value) {
    return new Selector().class(value);
  },
  attr(value) {
    return new Selector().attr(value);
  },
  pseudoClass(value) {
    return new Selector().pseudoClass(value);
  },
  pseudoElement(value) {
    return new Selector().pseudoElement(value);
  },
  combine(selector1, combinator, selector2) {
    return new Selector().combine(selector1, combinator, selector2);
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
