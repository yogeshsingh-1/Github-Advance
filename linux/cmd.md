# Linux Permission Commands

| Command | Purpose |
|---------|---------|
| `sudo usermod -aG <group> <user>` | Adds a user to an existing group. |
| `sudo chown <owner>:<group> <file/directory>` | Changes the owner and group of a file or directory. |
| `sudo chmod <permissions> <file/directory>` | Changes the permissions (Read, Write, Execute) of a file or directory. |

---

# Check Permissions

| Command | Purpose |
|---------|---------|
| `ls -ld <directory>` | Displays the permissions, owner, and group of a **directory** itself. |
| `ls -l` | Displays the permissions, owner, and group of files and subdirectories in the current directory. |
| `ls -la` | Same as `ls -l`, but also shows hidden files (starting with `.`). |
| `id <username>` | Displays the user's UID, GID, and all group memberships. |
| `groups <username>` | Lists all groups that the user belongs to. |
| `whoami` | Displays the currently logged-in user. |

---

## Difference Between `ls -ld` and `ls -l`

### `ls -ld`

Shows information about the **directory itself**.

```bash
ls -ld /home/yogesh
```

Example:

```text
drwxr-xr-x 2 yogesh developers 4096 Jul 18 12:00 /home/yogesh
```

---

### `ls -l`

Shows information about the **contents inside the directory**.

```bash
ls -l /home/yogesh
```

Example:

```text
-rw-r--r-- 1 yogesh developers 1200 file1.txt
drwxr-xr-x 2 yogesh developers 4096 project
```

> **Remember:**
>
> - `ls -ld` → Directory **Details**
> - `ls -l` → Directory **Contents**