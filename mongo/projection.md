 <!-- MongoDB me Projection ka matlab hota hai: -->

Query ke result me kaun-kaun se fields return karni hain aur kaun si fields nahi return karni hain.

Agar document me 20 fields hain aur aapko sirf name aur age chahiye, to projection use karke sirf wahi fields return karwa sakte ho.

const cursor = studentCollection.find(
{},
{
projection: {
\_id: 0,
name: 1, //1 ka matlab field include karo.
age: 1,
},
}
);
