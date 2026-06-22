<!-- Readable stream -->    process.stdin
data     → Jab naya data chunk receive hota hai.
end      → Jab saara data read ho jata hai.
error    → Jab reading ke dauran koi error aati hai.
close    → Jab stream/resource close ho jata hai.
readable → Jab internal buffer mein data available hota hai.
pause    → Jab stream pause ho jati hai.
resume   → Jab paused stream dobara start hoti hai.

<!-- Writeable stream -->  process.stdout
finish   → Jab saara data successfully write ho jata hai.
drain    → Jab internal buffer khali ho jata hai aur aur data accept kar sakta hai.
error    → Jab writing ke dauran error aati hai.
close    → Jab writable stream close ho jati hai.
pipe     → Jab koi readable stream is writable stream se pipe hoti hai.
unpipe   → Jab readable stream pipe hona band kar deti hai.

<!-- Duplex stream -->
data     → Jab naya data chunk receive hota hai.
end      → Jab readable side ka data khatam ho jata hai.
readable → Jab internal buffer mein data available hota hai.
pause    → Jab readable side pause ho jati hai.
resume   → Jab paused readable side dobara start hoti hai.

finish   → Jab writable side ka saara data write ho jata hai.
drain    → Jab writable buffer khali ho jata hai aur aur data accept kar sakta hai.

error    → Jab read ya write operation mein error aati hai.
close    → Jab duplex stream completely close ho jati hai.
pipe     → Jab koi readable stream isse pipe hoti hai.
unpipe   → Jab pipe connection remove ho jata hai.

<!-- Easy Memory Trick -->
Readable  → data, end
Writable  → finish, drain
Duplex    → data + end + finish + drain
Common    → error, close