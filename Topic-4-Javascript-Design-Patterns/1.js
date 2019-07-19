// Movie class

class Movie {
  constructor(name, year, duration) {
    this.title = name;
    this.year = year;
    this.duration = duration;
  }
  play() {}
  pause() {}
  resume() {}
}

const antMan = new Movie('Ant-Man', 2015, 118);
const civilWar = new Movie('Captain America: Civil War', 2016, 148);
const infinityWar = new Movie('Avengers: Infinity War', 2018, 160);

// Actor class

class Actor {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

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
