// EventEmitter class

class EventEmitter {
  constructor() {
    this.listeners = Object.create(null);
  }

  // Adds a listener to an event.
  // INPUT:
  // <-- eventName: string
  // The event that will call the listener when emitted (and any other listener
  // associated to it).
  // <-- callback: function ** IF THE REFERENCE TO THE CALLBACK IS LOST AT SOME
  // POINT IT CAN'T BE REMOVED (don't use anonymous functions, or functions
  // whose scope is not global) **
  // The callback that will be called when the event is emitted.
  // OUTPUT:
  // --> void
  // The callback has been added as a listener to the event.

  on(eventName, callback) {
    if (this.listeners[eventName] === undefined) this.listeners[eventName] = [];
    let eventListeners = this.listeners[eventName];
    if (!eventListeners.includes(callback)) eventListeners.push(callback);
  }

  // Emits an event, calling every listener associated to it in consequence.
  // INPUT:
  // <-- eventName: string
  // The event from which to call its listeners.
  // OUTPUT:
  // --> void
  // Every listener associated to the event is called.

  emit(eventName) {
    if (this.listeners[eventName] !== undefined)
      this.listeners[eventName].forEach(callback => callback());
  }

  // Removes a listener from an event.
  // INPUT:
  // <-- eventName: string
  // The event from which to remove the listener.
  // <-- callback: function
  // The callback that will be removed from the event listeners.
  // OUTPUT:
  // --> RangeError
  // The event has no listeners no remove.
  // --> RangeError
  // The callback wasn't listening to the event.

  off(eventName, callback) {
    let eventListeners = this.listeners[eventName];
    if (eventListeners !== undefined) {
      let newListeners = eventListeners.filter(
        listener => listener !== callback
      );
      if (newListeners.length === eventListeners.length)
        throw new RangeError(
          `${callback.name} wasn't listening to ${eventName}.`
        );
      this.listeners[eventName] = newListeners;
    } else throw new RangeError(`${eventName} has no listeners to remove.`);
  }
}

// Movie class

class Movie extends EventEmitter {
  constructor(name, year, duration) {
    super();
    this.title = name;
    this.year = year;
    this.duration = duration;
    this.cast = [];
  }

  play() {
    this.emit('play');
  }

  pause() {
    this.emit('pause');
  }

  resume() {
    this.emit('resume');
  }

  addCast(cast) {
    this.cast = this.cast.concat(cast);
  }
}

// Actor class

class Actor {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// Logger class

class Logger {
  constructor() {}

  log(info) {
    console.log(info);
  }
}

//------------------------------------------------------------------------------

const terminator = new Movie('Terminator I', 1985, 60);
const arnold = new Actor('Arnold Schwarzenegger', 50);
const otherCast = [
  new Actor('Paul Winfield', 50),
  new Actor('Michael Biehn', 50),
  new Actor('Linda Hamilton', 50)
];

terminator.addCast(arnold);
terminator.addCast(otherCast);

const logger = new Logger();

function logThatPlayEmitted() {
  logger.log("output: The 'play' event has been emitted");
}

const eventEmitter = new EventEmitter();
eventEmitter.on('play', logThatPlayEmitted);

// It could also be used like this if Logger inherited EventEmitter...
// logger.on("play", logThatPlayEmitted);

// ...or like this if EventEmitter methods were static (and heritage wouldn't be
// necessary to use it).
// EventEmitter.on('play', logThatPlayEmitted);

terminator.play();

eventEmitter.off('play', logThatPlayEmitted);
