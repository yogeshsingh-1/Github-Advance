<!-- Part6 -->

Git diff -> How to show files changes commit,staging area and working directory.

git diff tab work karti hai jab repository me changes present hote hain.

git diff -> Ye old aur new code ka difference dikhayega.

# Stagging area diff
Note -> Jab git add kar doge toh git diff
kuch nahi dikhayega.
Kyuki working directory aur staging same ho gaye.
Ab staged changes dekhne ke liye:  git diff --staged

# Jab apko apni working directory ko previous commit ke sath compare karna ho
git diff HEAD

# Jab commits compare karo
git diff commit1 commit2

# Jab branches compare karo
git diff main feature-branch