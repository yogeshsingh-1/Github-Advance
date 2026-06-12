<!-- Part6 -->

Git diff -> How to show files changes commit,staging area and working directory.

git diff tab work karti hai jab repository me changes present hote hain.

git diff -> Ye old aur new code ka difference dikhayega.

# Stagging area diff

Note -> Jab git add kar doge toh git diff
kuch nahi dikhayega.
Kyuki working directory aur staging same ho gaye.
Ab staged changes dekhne ke liye: git diff --staged

# Jab apko apni working directory ko previous commit ke sath compare karna ho

git diff HEAD

# Jab commits compare karo

git diff commit1 commit2
sfd

# Jab branches compare karo

git diff main feature-branch

<!-- Part 7 -->

git log Git ki history dekhne ke liye use hota hai. Isse tum commits, author, date, commit message, branches, aur changes track kar sakte ho.

# Short History

git log --oneline

# Last N Commits

git log -n 5

# only 1 commit

git log -1

or
git log --oneline -5

# Commits by Specific Author

git log --author="Himanshu"

# usefull

git log --oneline --graph --all
git log --oneline -10
git log path/to/file.ts
git show <commit-id>
git blame file.ts
git diff <commit1> <commit2>

<!-- Git rebase -->

git rebase ka use ek branch ke commits ko kisi dusri branch ke latest commit ke upar "replay" karne ke liye hota hai.

Example:
main
A---B---C

feature
\
 D---E

Ab main me naye commits aa gaye:
main
A---B---C---F---G

feature
\
 D---E
Agar tum feature branch ko latest main ke upar lana chahte ho:

git checkout feature
git rebase main

Git kya karega:

1. D aur E commits ko temporarily hata dega.
2. Feature branch ko G ke upar le jayega.
3. D aur E ko dubara apply karega.

rebase -> Linear history milti hai.
Extra merge commit nahi banta.

# Common Use Cases

1. Pull Request create karne se pehle

Feature branch ko latest main ke saath sync karna:

git checkout feature
git fetch origin
git rebase origin/main

# git pull --rebase origin main

Ye command fetch + rebase dono ek saath karti hai.

Maan lo tumhare paas local branches hain:

1. Local main:

A---B---C

2. Remote origin/main:

A---B---C---D---E

3. Tum feature branch par ho:

A---B---C
\
 F---G

Ab bina local main update kiye agar tum feature branch par ye chala do:

git pull --rebase origin main

toh Git :
Step 1: Fetch karega  
git fetch origin main
Remote se D aur E le aayega.

Step 2: Rebase karega
git rebase FETCH_HEAD
A---B---C---D---E
\
 F'---G'

Yaani feature branch ke upar latest remote main ke commits aa gaye.

Dhyan dene wali baat

git pull --rebase origin main feature branch ko remote main ke latest commits par rebase karta hai, na ki local main branch par. Isliye remote par jo naye commits hain, wo local main update kiye bina bhi feature branch me aa jate hain.

<!-- Head in git hub -->
HEAD Git ka ek pointer hai jo batata hai ki tum abhi kis commit (ya branch) par ho.

HEAD Git ka current position pointer hai. Ye normally current branch ko point karta hai, lekin checkout/switch --detach se directly kisi old commit ko bhi point kar sakta hai.

HEAD~1, HEAD~2 kya hote hain?

HEAD -> current commit
HEAD~1 -> previous commit
HEAD~2 -> 2 commits before
HEAD~3 -> 3 commits before

git show HEAD

# common use cases

1. Last commit compare karna
   git diff HEAD~1 HEAD

Current aur previous commit ka difference.

2. Last commit checkout karna

Maan lo history:

A <-- B <-- C <-- D (HEAD)
   git checkout HEAD~1

Result:

A <-- B <-- C (HEAD detached)
            \
            D (main)

Tum commit C par aa jaoge.
Detached HEAD state me aa jaoge.
Kisi branch par nahi hoge.

Previous commit par chale jaoge (detached HEAD state).

git checkout HEAD~1 ka main use case hai kisi purane commit ko temporarily dekhna, test karna ya compare karna bina apni current branch ko move kiye.

Check karne ke liye:

git status

Output:

HEAD detached at C

using -> 
1. Bug investigation

Maan lo latest code (D) me bug aa gaya.

Tum check kar sakte ho:

git checkout HEAD~1
npm start

2. Commit compare karna

Purane commit par jaake files dekh sakte ho:

git checkout HEAD~1
git log
git status

3. Experimental changes

Purane commit se start karke kuch try karna ho:

git checkout HEAD~1
git switch -c experiment-branch

Ab ek nayi branch purane commit se create ho jayegi.


# Important

git checkout HEAD~1 commit delete nahi karta aur branch ko piche nahi le jaata.

Bahut log sochte hain ki:

git checkout HEAD~1

se branch ek commit piche chali jayegi.

❌ Galat.

Ye sirf HEAD ko us commit par le jaata hai (detached mode me).

Agar branch ko actual me piche le jana ho to:

git reset --hard HEAD~1

use hota hai.

Quick Difference
git checkout HEAD~1

➡️ "Mujhe ek commit piche jaakar code dekhna hai."

git reset --hard HEAD~1

➡️ "Mujhe branch ko ek commit piche le jana hai aur latest commit hata dena hai."