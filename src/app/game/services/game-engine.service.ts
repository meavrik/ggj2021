import { Injectable } from '@angular/core';
import { BehaviorSubject, of, combineLatest, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const morseCode = {
  "A": ".-",
  "B": "-...",
  "C": "-.-.",
  "D": "-..",
  "E": ".",
  "F": "..-.",
  "G": "--.",
  "H": "....",
  "I": "..",
  "J": ".---",
  "K": "-.-",
  "L": ".-..",
  "M": "--",
  "N": "-.",
  "O": "---",
  "P": ".--.",
  "Q": "--.-",
  "R": ".-.",
  "S": "...",
  "T": "-",
  "U": "..-",
  "V": "...-",
  "W": ".--",
  "X": "-..-",
  "Y": "-.--",
  "Z": "--.."
}

const changeFont = {
  "A": "𝔄",
  "B": "𝓫",
  "C": "𝓒",
  "D": "𝕯",
  "E": "ℰ",
  "F": "𝔉",
  "G": "𝔊",
  "H": "𝓗",
  "I": "𝒾",
  "J": "𝔍",
  "K": "𝓚",
  "L": "𝓵",
  "M": "𝖒",
  "N": "𝕹",
  "O": "𝓸",
  "P": "𝓟",
  "Q": "𝒬",
  "R": "𝓡",
  "S": "𝔖",
  "T": "𝓣",
  "U": "𝓤",
  "V": "𝓿",
  "W": "𝔚",
  "X": "𝔁",
  "Y": "𝓨",
  "Z": "𝓩"
}
export interface ILevel {
  quest: string;
  index?: number;
  keys: string[];
  lost: string[];
  result: string;
  hints?: string[];
  mapFunc?;
}

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  levels = [
    {
      quest: 'Your best friend (you are the man!)',
      keys: 'q w e r t y u i o p a s d f g h j k l z x c v b n m'.split(' '),
      lost: ['o', 'g'], result: 'dog', hints: ['not a cat', '3 letters', 'QWERTY']
    },
    {
      quest: 'We are the village people',
      keys: 'B, A, D, C, F, E, H, G, J, I, L, K, N, M, P, O, R, Q, T, S, V, U, X, W, Z, Y'.split(', '),
      lost: ['M', 'A', 'E', 'R'], result: 'YMCA', hints: ['4 letters', 'song', 'acronym', 'ABCD']
    },
    {
      quest: 'One small step for man',
      keys: 'q w e r t y u i o p a s d f g h j k l z x c v b n m'.split(' ').reverse(),
      lost: ['m', 'a', 's', 'r'], result: 'nasa', hints: ['4 letters', 'acronym', 'QWERTY']
    },
    {
      quest: 'Play The Essence of Life',
      keys: 'q a z w s x e d c r f v t g b y h n u j m i k o l p'.split(' '),
      lost: ['g', 'a', 'b', 'c', 'z'], result: 'gta', hints: ['3 letters', 'game', 'QWERTY']
    },
    {
      quest: 'Swedish dancing queen',
      keys: 'abcdefghijklmnopqrstuvwxyz'.split(''),
      lost: ['m', 'a', 's', 'r', 'c'], result: 'abba', hints: ['4 letters', 'band', '70s', 'ABCD'],
      mapFunc: (key: string) => key.charCodeAt(0).toString()
    },
    {
      quest: 'The beatles are back to the Soviet Union',
      keys: 'q w e r t y u i o p a s d f g h j k l z x c v b n m'.split(' '),
      lost: ['d', 'k', 'z', 'j'], result: 'ussr', hints: ['4 letters', 'acronym', 'QWERTY'],
      mapFunc: (key: string) => morseCode[key.toUpperCase()]
    },
    {
      quest: 'Give this cat a lasagna',
      keys: 'q w e r t y u i o p a s d f g h j k l z x c v b n m'.split(' '),
      lost: ['g', 'f', 'e', 'd', 'z', 'y'], result: 'garfield', hints: ['comics', 'QWERTY'],
      mapFunc: (key: string) => changeFont[key.toUpperCase()]
    },
    {
      quest: 'Orange in a white house',
      keys: 'q w e r t y u i o p a s d f g h j k l z x c v b n m'.split(' ').sort((a, b) => Math.random() > .5 ? 1 : -1),
      lost: ['u'], result: 'trump', hints: ['usa', 'random']
    },
    {
      quest: 'federal agency',
      keys: 'q w e r t y u i o p a s d f g h j k l z x c v b n m'.split(' ').filter((a, index) => index % 2 !== 0),
      lost: [], result: 'fbi', hints: ['secret', 'acronym', 'QWERTY']
    },
    {
      quest: 'I Fruit',
      keys: 'a a p p l l e e l l p p a a'.split(' '),
      lost: ['a', 'p', 'l'], result: 'apple', hints: ['company', 'QWERTY', 'steve']
    },
  ].map((a, index) => Object.assign(a, { index }))

  readonly levels$ = of(this.levels);

  readonly levelIndex$ = new BehaviorSubject<number>(0);
  // readonly currentLevel$ = this.levels$.pipe(map(a => a[0]));
  readonly currentLevel$ = combineLatest(
    this.levels$, this.levelIndex$, (levels, index) => index < levels.length ? levels[index] : null)
  readonly userKeys$ = new BehaviorSubject<string[]>([]);

  readonly myWord$ = this.userKeys$.pipe(map(k => k.join('')));
  readonly isAnswearRight$ = combineLatest(this.myWord$,
    this.currentLevel$.pipe(map(l => l.result)), (word, answear) => word === answear);


  readonly score$ = this.currentLevel$.pipe(map(l => l.index * (l.index * 100)))
  readonly money$ = new BehaviorSubject<number>(100000);
  readonly pause$ = new BehaviorSubject<boolean>(false);

  readonly isWrongChar$ = combineLatest(
    this.myWord$.pipe(filter(a => !!a.length)),
    this.currentLevel$.pipe(map(l => l.result)),
    (word, answear) => word && answear.indexOf(word) === -1);

  readonly wrongAnswear$ = new Subject<boolean>();
  readonly gameOver$ = new Subject<boolean>();
  get money() {
    return this.money$.getValue();
  }

  set money(value: number) {
    this.money$.next(value)
  }

  rightAnswear: boolean;
  lastCharIsWrong: boolean;
  constructor() {
    this.isAnswearRight$.subscribe(a => {
      /*  if (a) {
         this.goToLevel(this.levelIndex$.getValue() + 1);
       } */
      this.rightAnswear = a;
    })

    // this.levelIndex$.subscribe(index => this.reset());

    this.isWrongChar$.subscribe(a => {
      /*  console.log('WRONF CHAR');
       // console.log('wrong char ', a);
       this.userKeys$.next([]);
       this.money -= 1000; */
      this.lastCharIsWrong = a
    })
  }

  checkResult() {
    console.log('rightAnswear ', this.rightAnswear);
    if (this.rightAnswear) {
      this.goToLevel(this.levelIndex$.getValue() + 1);
    } else {
      this.money -= 1000;
      this.wrongAnswear$.next(true);
    }

  }

  takeAHint() {
    this.money -= Math.floor(Math.random() * this.money / 2);
  }

  addKey(key: any) {
    const keys = this.userKeys$.getValue();
    if (key === 'del' && keys.length) {
      keys.pop();
    } else {
      keys.push(key);
      if (this.lastCharIsWrong && keys.length > 1) {
        this.money -= Math.ceil(Math.random() * 10);
      }
    }

    this.userKeys$.next([...keys]);
  }

  goToLevel(index: any) {
    if (index < this.levels.length) {
      this.userKeys$.next([]);
      this.levelIndex$.next(index);
    } else {
      console.log('GAME OVER - YOU WON!!!!');
      this.gameOver$.next(true);
    }

  }

  reset() {
    this.userKeys$.next([]);
  }
}


