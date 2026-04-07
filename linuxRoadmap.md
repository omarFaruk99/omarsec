Listed directory docs
Viewed \_meta.js:1-11

হ্যাঁ ভাই, perfectly বুঝেছি! 😄

তুমি চাও এমন একটা Linux Fundamentals documentation যেটা:

- **Beginners** থেকে শুরু করে যারা আগে জানে কিন্তু **recap** করতে চায়
- বিশেষত **Cybersecurity শেখার জন্য** (TryHackMe, CTF, Pentesting সবার কাজে লাগবে)
- তোমার **omarsec** প্রজেক্টে থাকবে

---

## 📋 Linux Fundamentals — Proposed Roadmap

তোমার omarsec-এ এই structure-এ add করবো:

```
content/docs/linux-fundamentals/
├── _meta.js
├── index.mdx                      → Overview & Why Linux for CyberSec
│
├── 01-introduction/
│   ├── _meta.js
│   ├── what-is-linux.mdx          → Linux কী, History, Distros
│   ├── linux-vs-windows.mdx       → Comparison (CyberSec context)
│   └── filesystem-structure.mdx   → /, /home, /etc, /var, /tmp...
│
├── 02-terminal-basics/
│   ├── _meta.js
│   ├── terminal-intro.mdx         → Terminal কী, Shell কী, Prompt বোঝা
│   ├── navigation.mdx             → pwd, ls, cd, tree
│   └── file-operations.mdx        → touch, cp, mv, rm, mkdir
│
├── 03-file-system-deep/
│   ├── _meta.js
│   ├── permissions.mdx            → chmod, chown, rwx explained
│   ├── hidden-files.mdx           → .dotfiles, ls -la
│   └── symlinks.mdx               → ln -s, hard vs soft links
│
├── 04-text-manipulation/
│   ├── _meta.js
│   ├── reading-files.mdx          → cat, less, more, head, tail
│   ├── searching.mdx              → grep, find, locate
│   └── editing.mdx                → nano, vim basics
│
├── 05-users-and-permissions/
│   ├── _meta.js
│   ├── users-groups.mdx           → useradd, passwd, groups
│   ├── sudo.mdx                   → sudo, su, root access
│   └── ssh.mdx                    → SSH keys, config, connecting
│
├── 06-processes/
│   ├── _meta.js
│   ├── process-basics.mdx         → ps, top, htop, PID
│   ├── background-jobs.mdx        → &, bg, fg, jobs
│   └── killing-processes.mdx      → kill, pkill, signals
│
├── 07-networking/
│   ├── _meta.js
│   ├── network-basics.mdx         → ifconfig, ip, ping, netstat
│   ├── ports-services.mdx         → ss, lsof, /etc/services
│   └── curl-wget.mdx              → HTTP requests from terminal
│
├── 08-package-management/
│   ├── _meta.js
│   └── apt.mdx                    → apt install/remove/update/upgrade
│
├── 09-scripting-intro/
│   ├── _meta.js
│   ├── bash-basics.mdx            → Variables, echo, read
│   └── automation.mdx             → Simple scripts for automation
│
└── cheatsheet.mdx                 → All commands quick reference
```

---

## ❓ আমার কিছু জিজ্ঞেস করার আছে — আগে বলো:

**1. Language style কেমন চাই?**

> English main content, কিন্তু বাংলায় explanation/notes দেব? নাকি full English?

**2. Cybersecurity context কতটুকু চাই?**

> প্রতিটা topic শেষে "🔐 CyberSec Use-Case" section রাখবো? যেমন — permission জানলে কেন privilege escalation বুঝতে পারবে?

**3. কোন distro focus করবো?**

> Ubuntu/Debian (apt)? নাকি general? TryHackMe তো mostly Ubuntu use করে।

**4. Beginner কতটা beginner?**

> একদম terminal-ও চেনে না? নাকি একটু-আধটু command জানে?

**5. Cheatsheet style:**

> Git docs-এর মতো separate cheatsheet.mdx রাখবো?

---

এই roadmap দেখে বলো — কোনো topic add বা remove করতে চাও? Approve করলেই আমরা **একটা একটা করে** তৈরি শুরু করবো! 🚀
