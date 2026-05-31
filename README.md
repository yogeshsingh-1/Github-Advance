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


