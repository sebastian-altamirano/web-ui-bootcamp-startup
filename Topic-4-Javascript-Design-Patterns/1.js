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

class Actor {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
