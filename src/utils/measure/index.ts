// used https://github.com/dubbs/measure

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { volume } from './usVolume'
import Lexer from 'lex/lexer'

// MEASURE
// @ts-ignore
function Measure(options) {
  // @ts-ignore
  this.ml = (options && options.ml) || 0
  // @ts-ignore
  this.g = (options && options.g) || 0
  // @ts-ignore
  this.d = (options && options.d) || 1
}

// helpers
Measure.prototype.toVolume = function () {
  if (this.g) {
    this.ml = this.g / this.d
    this.g = 0
  }
  return this
}

// volume
Measure.prototype.milliliters = function () {
  return this.ml
}
Measure.prototype.centiliters = function () {
  return this.ml / 10
}
Measure.prototype.deciliters = function () {
  return this.ml / 100
}
Measure.prototype.liters = function () {
  return this.ml / 1000
}
Measure.prototype.decaliters = function () {
  return this.ml / 10000
}
Measure.prototype.hectoliters = function () {
  return this.ml / 100000
}
Measure.prototype.kiloliters = function () {
  return this.ml / 1000000
}
Measure.prototype.drops = function () {
  return this.totalByUnit('drops')
}
Measure.prototype.teaspoons = function () {
  return this.totalByUnit('teaspoons')
}
Measure.prototype.tablespoons = function () {
  return this.totalByUnit('tablespoons')
}
Measure.prototype.fluidounces = function () {
  return this.totalByUnit('fluidounces')
}
Measure.prototype.jiggers = function () {
  return this.totalByUnit('jiggers')
}
Measure.prototype.gills = function () {
  return this.totalByUnit('gills')
}
Measure.prototype.cups = function () {
  return this.totalByUnit('cups')
}
Measure.prototype.pints = function () {
  return this.totalByUnit('pints')
}
Measure.prototype.fifths = function () {
  return this.totalByUnit('fifths')
}
Measure.prototype.quarts = function () {
  return this.totalByUnit('quarts')
}
Measure.prototype.gallons = function () {
  return this.totalByUnit('gallons')
}

// totals
Measure.prototype.totalByUnit = function (unit: string) {
  // @ts-ignore
  const ratio = this.ml / Measure.volume[unit]
  return Math.round((ratio + 0.00001) * 100) / 100
}

// lexer
Measure.parseOptionsFromString = function (input: any) {
  const lexer = new Lexer()

  let num = 0
  const obj = { ml: 0, g: 0 }
  // @ts-ignore
  const volume = this.volume
  // @ts-ignore
  const mass = this.mass

  lexer.addRule(/[0-9.\/ -]+/g, function (lexeme: string) {
    // add mixed numbers
    lexeme = lexeme.trim().replace('-', ' ').split(' ').join('+')
    num = eval(lexeme)
  })
  // volume
  // - metric
  lexer.addRule(/millilit(re|er)s?|ml/g, function () {
    obj.ml += num
  })
  lexer.addRule(/centilit(re|er)s?|cl/g, function () {
    obj.ml += num * 10
  })
  lexer.addRule(/decilit(re|er)s?|dl/g, function () {
    obj.ml += num * 100
  })
  lexer.addRule(/lit(re|er)s?|l\s|l$/g, function () {
    obj.ml += num * 1000
  })
  lexer.addRule(/decalit(re|er)s?|dal/g, function () {
    obj.ml += num * 10000
  })
  lexer.addRule(/hectolit(re|er)s?|hl/g, function () {
    obj.ml += num * 100000
  })
  lexer.addRule(/kilolit(re|er)s?|kl/g, function () {
    obj.ml += num * 1000000
  })
  // - customary
  lexer.addRule(/(teaspoons?|tsp\.?|t\.)/g, function () {
    obj.ml += num * volume.teaspoons
  })
  lexer.addRule(/(tablespoons?|tbsp\.?|T\.)/g, function () {
    obj.ml += num * volume.tablespoons
  })
  lexer.addRule(/(fluidounces?|oz\.?|fl\.oz\.)/g, function () {
    obj.ml += num * volume.fluidounces
  })
  lexer.addRule(/(shots?|shot)/g, function () {
    obj.ml += num * volume.shots
  })
  lexer.addRule(/(gills?|gi\.)/g, function () {
    obj.ml += num * volume.gills
  })
  lexer.addRule(/(cups?|cup$|C)/g, function () {
    obj.ml += num * volume.cups
  })
  lexer.addRule(/(pints?|pt\.)/g, function () {
    obj.ml += num * volume.pints
  })
  lexer.addRule(/(fifths?)/g, function () {
    obj.ml += num * volume.fifths
  })
  lexer.addRule(/(quarts?\s|quart$|qt\.)/g, function () {
    obj.ml += num * volume.quarts
  })
  lexer.addRule(/(gallons?|gal\.)/g, function () {
    obj.ml += num * volume.gallons
  })
  lexer.addRule(/(parts?|part\.)/g, function () {
    obj.ml += num * volume.parts
  })

  lexer.addRule(/[^0-9]+/g, function () {
    // if haven't set another value yet, assume its an arbitrary unit
    if (obj.ml === 0 && obj.g === 0) {
      // @ts-ignore
      obj.units = num
    }
  })
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  lexer.addRule(/\s/g, function () {})

  lexer.setInput(input)

  lexer.lex()

  // cleanup
  if (obj.ml === 0) {
    // @ts-ignore
    delete obj.ml
  }
  if (obj.g === 0) {
    // @ts-ignore
    delete obj.g
  }

  return obj
}

// options
Measure.setUnitSystem = function (unitSystem: any) {
  switch (unitSystem) {
    default: // US
      // @ts-ignore
      Measure.volume = volume
      break
  }
}

// create
Measure.createFromString = function (options: unknown) {
  options = Measure.parseOptionsFromString(options)
  // @ts-ignore
  return new Measure(options)
}
Measure.createFromObject = function (options: unknown) {
  // @ts-ignore
  return new Measure(options)
}

export const measure = (options?: string) => {
  Measure.setUnitSystem('US')

  if (typeof options === 'string') {
    return Measure.createFromString(options)
  }
  if (typeof options === 'object') {
    return Measure.createFromObject(options)
  }
  // @ts-ignore
  return new Measure()
}
