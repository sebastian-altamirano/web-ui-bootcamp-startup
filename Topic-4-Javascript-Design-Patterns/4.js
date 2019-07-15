// Movie class

// Movie class from exercise 1 is used for the purpose of this exercise.
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

// social mixin

const social = {
  share(friendName) {
    console.log(`${friendName} shares ${this.title}`);
  },
  like(friendName) {
    console.log(`${friendName} likes ${this.title}`);
  }
};

//------------------------------------------------------------------------------

let terminator = new Movie('Terminator I', 1985, 60);

terminator = Object.assign(terminator, social);
terminator.share('Sebastián');
