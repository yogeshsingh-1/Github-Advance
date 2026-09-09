let a = [5, 1, 8, 13, 2, 6];

let m1 = a[0];
let m2 = m1;
for (let i = 1; i < a.length; i++) {
  //   console.log(a[i]);
  if (a[i] > m1) {
    m2 = m1;
    m1 = a[i];
  } else {
    if (m2 < a[i]) {
      m2 = a[i];
    }
  }
}
console.log(m1);
console.log(m2);
