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
sfd
# Jab branches compare karo
git diff main feature-branch

<!-- Part 7 -->
git log Git ki history dekhne ke liye use hota hai. Isse tum commits, author, date, commit message, branches, aur changes track kar sakte ho.

# Short History
git log --oneline

# Last N Commits
git log -n 5

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