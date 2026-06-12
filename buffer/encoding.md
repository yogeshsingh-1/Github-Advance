<!-- UTF-8 vs UTF-16 -->

Character Encoding Standards.
use-> Text characters को bytes में convert करना।
1bit = 0/1 (low/high)
1 byte = 8bits

1 MB = 1024 × 1024 Bytes
     = 1,048,576 Bytes

utf8 ek character ko store karne ke liye minimum 1 and maximum 4 bytes le skta hai.
utf16 ek character ko store karne ke liye minimum 2 bytes and maximum 4 bytes leta hai.

UTF-8 में:
ASCII range = 0 to 127 -> 1 byte
128 se jyda -> 2bytes

| Type           | Min  | Max |
| -------------- | ---- | --- |
| Unsigned 8-bit | 0    | 255 |
| Signed 8-bit   | -128 | 127 |

<!-- only for bash command-->
<!-- Character encoding -->

heaxdecimal -> xxd utf8.txt
xxd -g 1 utf8.txt (for hexa value grouping)
binary -> xxd -b utf8.txt

<!--  -->

Human Text
↓
UTF-8 Encoding
↓
Bytes
↓
Binary Bits
↓
SSD / RAM / HDD
