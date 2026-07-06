<!-- # OpenSSH (Windows) – Complete Installation and Local Connection Guide -->

<!-- ## What is OpenSSH?   -->

<!-- Default port of ssh is 22 -->

**OpenSSH** is an open-source implementation of the **SSH (Secure Shell)** protocol.

It allows you to:

* Connect to remote computers securely.
* Execute commands on another machine.
* Transfer files securely.
* Authenticate with GitHub using SSH keys.

---

# Components of OpenSSH

| Component      | Description                                      |
| -------------- | ------------------------------------------------ |
| **ssh**        | SSH Client (used to connect to another computer) |
| **sshd**       | SSH Server (accepts incoming SSH connections)    |
| **scp**        | Secure file copy                                 |
| **sftp**       | Secure file transfer                             |
| **ssh-keygen** | Generates SSH keys                               |

---

<!-- # Step 1: Check whether SSH Client is installed -->

Open **CMD** and run:

```bash
ssh -V
```

Example Output:

```text
OpenSSH_for_Windows_9.5p1, LibreSSL 3.8.2
```

If you see a version, the SSH Client is installed.

---

<!-- # Step 2: Check whether SSH Server is installed -->

Open **PowerShell as Administrator**.

Run:

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

Example:

```text
OpenSSH.Client~~~~0.0.1.0
State : Installed

OpenSSH.Server~~~~0.0.1.0
State : NotPresent
```

---

<!-- # Step 3: Install OpenSSH Server -->

If the server is **NotPresent**, install it.

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Wait until installation completes.

---

<!-- # Step 4: Verify Installation -->

Run:

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

Expected:

```text
OpenSSH.Client~~~~0.0.1.0
State : Installed

OpenSSH.Server~~~~0.0.1.0
State : Installed
```

---

<!-- # Step 5: Start SSH Server -->

```powershell
Start-Service sshd
```

---

<!-- # Step 6: Start Automatically at Boot -->

```powershell
Set-Service -Name sshd -StartupType Automatic
```

---

<!-- # Step 7: Verify Service -->

```powershell
Get-Service sshd
```

Expected:

```text
Status   Name   DisplayName
------   ----   -----------
Running  sshd   OpenSSH SSH Server
```

---

<!-- # Step 8: Allow SSH Through Windows Firewall -->

```powershell
New-NetFirewallRule -Name sshd `
-DisplayName "OpenSSH Server" `
-Enabled True `
-Direction Inbound `
-Protocol TCP `
-Action Allow `
-LocalPort 22
```

If the rule already exists, Windows will notify you.

---

<!-- # Step 9: Verify Port 22 -->

```cmd
netstat -an | findstr :22
```

Expected:

```text
TCP    0.0.0.0:22     0.0.0.0:0     LISTENING
```

---

<!-- # Step 10: Check Your Username -->

```cmd
whoami
```

Example:

```text
BYOD-MOHINI\yogesh
```

Username:

```text
yogesh
```

---

<!-- # Step 11: Connect to Your Own Computer -->

```cmd
ssh username@ip-address

ssh yogesh@localhost
```

or

```cmd
ssh localhost -l yogesh
```

---

# Step 12: Accept Host Key

First time:

```text
The authenticity of host 'localhost' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

Type:

```text
yes
```

---

# Step 13: Enter Password

You'll see:

```text
yogesh@localhost's password:
```

Enter your **Windows account password**.

> Note:
>
> * This is **NOT** your Windows Hello PIN.
> * Password typing is invisible (no `*` or dots).

---

# Step 14: Successful Login

```text
Microsoft Windows

yogesh@DESKTOP C:\Users\yogesh>
```

Exit:

```cmd
exit
```

---

# Common Errors

## Error 1

```text
Permission denied (publickey,password,keyboard-interactive)
```

### Causes

* Wrong username.
* Wrong Windows password.
* Using Windows Hello PIN instead of the account password.
* User account has no password.
* SSH server configuration issue.

---

## Error 2

```text
ssh: connect to host localhost port 22: Connection refused
```

### Fix

```powershell
Start-Service sshd
```

---

## Error 3

```text
'ssh' is not recognized
```

### Fix

Install the OpenSSH Client.

---

## Error 4

```text
'mongod' is not recognized
```

### Fix

Add the executable's `bin` directory to the Windows PATH environment variable.

---

# Useful Commands

```bash
# SSH client version
ssh -V

# Install SSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

# Start SSH Server
Start-Service sshd

# Check service
Get-Service sshd

# Enable auto start
Set-Service -Name sshd -StartupType Automatic

# Firewall
New-NetFirewallRule -Name sshd -DisplayName "OpenSSH Server" -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22

# Current user
whoami

# Connect locally
ssh yogesh@localhost

# Exit SSH session
exit
```

---

# Architecture

```text
                Your Computer

      +------------------------------+
      |                              |
      |      SSH Client (ssh)        |
      |             |                |
      |             | localhost      |
      |             ▼                |
      |      SSH Server (sshd)       |
      |             |                |
      |             ▼                |
      |       Windows User Account   |
      +------------------------------+
```

---

# Summary

* **ssh** → Client used to connect.
* **sshd** → Server that accepts connections.
* **Port 22** → Default SSH port.
* **localhost** → Your own computer.
* Use your **Windows account password**, not your Windows Hello PIN.
* After setup, you can connect to your own machine using:

```bash
ssh <username>@localhost
```
