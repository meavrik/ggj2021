import { Injectable } from '@angular/core';
import { BehaviorSubject, of, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export interface ILevel {
  quest: string;
  index?: number;
  keys: string[];
  lost: string[];
  result: string,
  hints?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  levels$ = of([
    {
      quest: 'Your best friend (you are the man!)',
      keys: 'q w e r t y u i o p a s d f g h j k l z x c v b n m'.split(' '),
      lost: ['o', 'g'], result: 'dog', hints: ['not a cat', '3 letters']
    },
    {
      quest: 'We are the village people',
      keys: 'B, A, D, C, F, E, H, G, J, I, L, K, N, M, P, O, R, Q, T, S, V, U, X, W, Z, Y'.split(', '),
      lost: ['M', 'A', 'E', 'R'], result: 'YMCA', hints: ['4 letters', 'song', 'acronym']
    },
    {
      quest: 'One small step for man',
      keys: 'q w e r t y u i o p a s d f g h j k l z x c v b n m'.split(' ').reverse(),
      lost: ['m', 'a', 's', 'r'], result: 'nasa', hints: ['4 letters', 'acronym']
    },
    {
      quest: 'Play The Essence of Life',
      keys: 'q a z w s x e d c r f v t g b y h n u j m i k o l p'.split(' '),
      lost: ['g', 'a', 'b', 'c', 'z'], result: 'gta', hints: ['3 letters', 'game']
    },
    {
      quest: 'One small step for man',
      keys: 'q w e r t y u i o p a s d f g h j k l z x c v b n m'.split(' ').reverse(),
      lost: ['m', 'a', 's', 'r'], result: 'nasa', hints: ['4 letters', 'acronym']
    },
  ].map((a, index) => Object.assign(a, { index })))

  readonly levelIndex$ = new BehaviorSubject<number>(0);
  // readonly currentLevel$ = this.levels$.pipe(map(a => a[0]));
  readonly currentLevel$ = combineLatest(this.levels$, this.levelIndex$, (levels, index) => levels[index])
  readonly userKeys$ = new BehaviorSubject<string[]>([]);

  readonly isAnswearRight$ = combineLatest(this.userKeys$.pipe(map(k => k.join(''))),
    this.currentLevel$.pipe(map(l => l.result)), (word, answear) => word === answear);

  readonly isWrongChar$ = combineLatest(this.userKeys$.pipe(filter(a => !!a.length), map(k => k.join(''))),
    this.currentLevel$.pipe(map(l => l.result)), (word, answear) => word && answear.indexOf(word) === -1);

  readonly score$ = this.currentLevel$.pipe(map(l => l.index * (l.index * 100)))
  constructor() {
    this.isAnswearRight$.subscribe(a => {
      if (a) {
        this.goToLevel(this.levelIndex$.getValue() + 1);
      }
    })

    // this.levelIndex$.subscribe(index => this.reset());

    /*  this.isWrongChar$.subscribe(a => {
       console.log('wrong char ', a);
     }) */
  }

  addKey(key: any) {
    const keys = this.userKeys$.getValue();
    keys.push(key);
    this.userKeys$.next([...keys]);
  }

  goToLevel(index: any) {
    this.levelIndex$.next(index);
  }

  reset() {
    this.userKeys$.next([]);
  }

  checkAnswear() {

  }

}


