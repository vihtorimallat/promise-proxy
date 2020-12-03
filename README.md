# promise-proxy
 
```
const deferred = Promise.resolve([ 1, 2, 3, 4, 5 ]);

deferred.map(x => x * 2).then(console.log); // -> [ 2, 4, 6, 8, 10 ]
deferred.filter(x => x > 3).then(console.log); // -> [ 4, 5 ]
deferred.filter(x => x > 3).length.then(console.log); // -> 2


const complexDeferred = Promise.resolve({a: { b: _ => ({ c: { d: _ => 'e' } }) } });

complexDeferred.a.b().c.d().then(console.log); // -> 'e'
```
