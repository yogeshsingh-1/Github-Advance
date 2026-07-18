| Command                                       | Purpose                                                    |
| --------------------------------------------- | ---------------------------------------------------------- |
| `sudo usermod -aG <group> <user>`             | User ko kisi **group** ka member banata hai.               |
| `sudo chown <owner>:<group> <file/directory>` | File ya directory ka **owner aur group** change karta hai. |

ls -ld -> For check current directory permission
ls -l -> for check files permission

<!-- What is Linux? -->

https://www.freecodecamp.org/news/learn-linux-for-beginners-book-basic-to-advanced/

Linux is an open-source operating system that is based on the Unix operating system. It was created by Linus Torvalds in 1991.

Open source means that the source code of the operating system is available to the public. This allows anyone to modify the original code.

Some popular Linux distributions are:
Ubuntu,Debian,Fedora,Cent OS,Red Hat,Kali Linux,Linux Mint

<!-- Architecutre of Linux -->

Application -> Shell -> Kernel -> Hardware

# What is an Application?

Applications are the programs that users interact with directly.
Examples:

- Google Chrome
- VS Code
- Firefox
- VLC Media Player
- MySQL Client

# What is a Shell (Command Interpreter)?

The **Shell** is an interface between the **user** and the **Linux Kernel**.

- It accepts commands from the user.
- It interprets those commands.
- It sends the requests to the Kernel.
- It displays the output back to the user.

# What is a Kernel?

The **Kernel** is the core (heart) of the Linux operating system.

It acts as a bridge between **applications** and the **hardware**. The Kernel manages all system resources and allows software to communicate with hardware safely and efficiently.

Process Management -> Memory Management -> Device Management -> File System Management

# what is Hardware?

Hardware is the physical part of a computer that you can touch.
Ex:
CPU,Ram ,Hardware

<!-- Install a Windows Subsystem for Linux(WSL) -->

The setup for WSL is simple and not time-consuming. It is lightweight compared to VMs where you have to allocate resources from the host machine.

# How to install WSL2

First, enable the Windows Subsystem for Linux option in settings -> Windows Subsystem for Linux

Run the command below: wsl --install
You are ready to use Ubuntu.

<!-- Some way to use Linux Terminal -->

# Web-based Linux terminals:

jslinux.org

# Use a Cloud-based Solution

Amazon EC2, Microsoft Azure, or DigitalOcean provide Linux instances that you can connect to from your Windows computer.

<!-- Introduction to Bash Shell -->

The Linux command line is provided by a program called the shell.

The echo command is used to print on the terminal.
echo $SHELL -> /bin/bash

<!-- Terminal vs Shell -->

The terms "terminal" and "shell" are often used interchangeably, but they refer to different parts of the command-line interface.
The terminal is the interface you use to interact with the shell. The shell is the command interpreter that processes and executes your commands.

<!-- What is a prompt? -->

When a shell is used interactively, it displays a $ when it is waiting for a command from the user. This is called the shell prompt.

# $ (Normal User)

Iska matlab tum normal (non-root) user ho.
Tumhare paas limited permissions hoti hain.
System ki important files ko directly modify nahi kar sakte.
Ex:
yogesh@ubuntu:~$

# #(Root User)

Iska matlab tum root (administrator) ho.
Root ke paas system ki sabhi permissions hoti hain.
Koi bhi file delete, install ya configuration change kar sakta hai.

If the shell is running as root (you'll learn more about the root user later on), the prompt is changed to #.
root@ubuntu:~#

<!-- Command Structure -->

A command is a program that performs a specific operation. Once you have access to the shell, you can enter any command after the $ sign and see the output on the terminal.

Syntax:
command [options] [arguments]

# Tip: You can view a command's manual using the man ls command.

<!-- Displays the list of previous commands	history --> using history command

<!-- Identifying Yourself: The whoami Command -->

<!-- Discovering Your OS and Specs -->

Print system information using the uname Command
You can get detailed system information from the uname command.

When you provide the -a option, it prints all the system information.

uname -a

<!-- Find details of the CPU architecture using the lscpu Command -->

lscpu

<!-- The Linux File-system Hierarchy -->

All files in Linux are stored in a file-system. It follows an inverted-tree-like structure because the root is at the topmost part.

The / is the root directory and the starting point of the file system. The root directory contains all other directories and files on the system. The / character also serves as a directory separator between path names. For example, /home/alice forms a complete path.

                              /
                              │

─────────────────────────────┼─────────────────────────────────────────────────────────────
│ │ │ │ │ │ │ │ │ │ │ │ │
bin boot dev etc home root tmp var usr run opt lib mnt
│ │ │
┌──────────┴───────┐ │ ├───────────────┐
│ │ │ │ │
alice zaira log bin local
│
sbin

## Directory Description

Location Purpose
/bin Essential command binaries
/boot Static files of the boot loader, needed in order to start the boot process.
/etc Host-specific system configuration
/home User home directories
/root Home directory for the administrative root user
/lib Essential shared libraries and kernel modules
/mnt Mount point for mounting a filesystem temporarily
/opt Add-on application software packages
/usr Installed software and shared libraries
/var Variable data that is also persistent between boots
/tmp Temporary files that are accessible to all users

<!-- Absolute path vs relative path -->

The absolute path is the full path from the root directory to the file or directory. It always starts with a /. For example, /home/john/documents.

The relative path, on the other hand, is the path from the current directory to the destination file or directory. It does not start with a /.

<!-- Changing directories using the cd command -->

You can use the cd command to navigate to a different directory.
You can use a relative path or an absolute path.

Command Description
cd .. Go back one directory
cd ../.. Go back two directories
cd or cd ~ Go to the home directory
cd - Go to the previous path

 <!-- Managing Files and Directories -->

When working with files and directories, you might want to copy, move, remove, and create new files and directories.

Tip: You can differentiate between a file and folder by looking at the first letter in the output of ls -l.
A '-' represents a file and
a 'd' represents a folder.

<!-- Creating new directories using the mkdir command -->

mkdir foo

# You can also create directories recursively using the -p option.

mkdir -p tools/index/helper-scripts

# output of tree

.
└── tools
└── index
└── helper-scripts

3 directories, 0 files

<!-- Creating new files using the touch command -->

The touch command creates an empty file. You can use it like this: touch file.txt

touch file1.txt file2.txt file3.txt (Create Multiple Files)

<!-- Removing files and directories using the rm and rmdir command -->

Command Description
rm file.txt Removes the file file.txt
rm -r directory Removes the directory directory and its contents
rm -f file.txt Removes the file file.txt without prompting for confirmation
rmdir directory Removes an empty directory

# Note that you should use the -f flag with caution as you won't be asked before deleting a file. Also, be careful when running rm commands in the root folder as it might result in deleting important system files.

<!-- Copying files using the cp command -->

To copy files in Linux, use the cp command.

Syntax to copy files:

cp source_file destination_of_file

cp file1.txt /home/adam/logs

<!-- Moving and renaming files and folders using the mv command -->

The mv command is used to move files and folders from one directory to the other.

Syntax: mv source_file destination_directory

mv file1.txt backup/

# To move a directory and its contents:

mv dir1/ backup/

Syntax to rename files: mv old_name new_name

mv file1.txt file2.txt

# Rename a directory from dir1 to dir2:

mv dir1 dir2

# Concatenate and display files using the cat command

The cat command in Linux is used to display the contents of a file.
It can also be used to concatenate files and create new files.

cat file.txt

<!-- Displaying the last part of files using tail -->

tail -n 50 file.txt

<!-- Displaying the beginning of files using head -->

head file.txt

-n option followed by the number of lines you want to display.

<!-- Counting words, lines, and characters using wc -->

You can count lines, words and characters in a file using the wc command.

wc syslog.log

output -> 16 96 643 syslog.log

he command wc syslog.log
counted 16 lines,
96 words, and
643 characters in the file syslog.log.

<!-- The Essentials of Text Editing in Linux -->

Text editing skills using the command line are one of the most crucial skills in Linux. In this section, you will learn how to use two popular text editors in Linux: Vim and Nano.

<!-- Definition of Bash scripting -->

A bash script is a file containing a sequence of commands that are executed by the bash program line by line. It allows you to perform a series of actions, such as navigating to a specific directory, creating a folder, and launching a process using the command line.

By saving commands in a script, you can repeat the same sequence of steps multiple times and execute them by running the script.

Some advantages of shell scripting are: Automation, Portability, Flexibility, Accessibility, Integration, Debugging


<!-- Overview of Bash Shell and Command Line Interface -->

The terms "shell" and "bash" are often used interchangeably. But there is a subtle difference between the two.

The term "shell" refers to a program that provides a command-line interface for interacting with an operating system. Bash (Bourne-Again SHell) is one of the most commonly used Unix/Linux shells and is the default shell in many Linux distributions.

You can determine your shell type using the ps command:  ps

# output:

    PID TTY          TIME CMD
  20506 pts/0    00:00:00 bash <--- the shell type
  20931 pts/0    00:00:00 ps

  
