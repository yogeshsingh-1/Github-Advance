# Current User

whoami

# change user

su username

<!-- Create / Delete User (Admin) -->

# New User Create

sudo useradd -m yogesh

# User Password Set

sudo passwd yogesh

# User delete

sudo userdel -r yogesh

# List All Users

cat /etc/passwd

# Sirf Usernames

cut -d: -f1 /etc/passwd

# Check Group of User

groups <username>

# Add User to sudo Group

sudo usermod -aG sudo yogesh

-a → Append (purane groups remove nahi karega).
-G sudo → User ko sudo group me add karega.

# chmod ka full form Change Mode hota hai.

ye file ki permission change karta hai.

chmod +x backup.sh -> Read, Write, Execute permissions change karta hai.
chmod 755 file

Iska use file ya directory ki permissions change karne ke liye hota hai.

# change user file/Directory permission

Ye permission nahi badalta.
Ye owner aur group change karta hai.

sudo chown yogesh:yogesh file.txt

<!-- Short trick yaad rakho: -->

chmod → "What can be done?" (permissions)
chown → "Who owns it?" (owner/group)
usermod → "What can the user do?" (user account/groups)
