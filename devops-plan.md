# ফুল DevOps ডকের প্ল্যান

৮টা স্তরে ভাগ করলাম। উপর থেকে নিচে — এই ক্রমেই লিখবেন।

## স্তর ১: ভিত্তি (Foundation)

আগে এটা না হলে বাকি কিছু বোঝা যাবে না।

| টপিক | কী থাকবে |
|---|---|
| Linux Basics | ফাইল সিস্টেম, permission, user, process |
| Shell & Bash | কমান্ড, pipe, script লেখা |
| Networking | IP, port, DNS, HTTP, firewall |
| SSH | key তৈরি, নিরাপদ লগইন |
| Git & GitHub | branch, merge, PR, conflict |

## স্তর ২: অ্যাপ চালানো (Runtime)

আপনার কোড সার্ভারে কীভাবে চলবে।

| টপিক | কী থাকবে |
|---|---|
| Web Server | Nginx, reverse proxy, static file |
| Process Manager | systemd, PM2 — অ্যাপ বন্ধ হলে চালু রাখা |
| SSL/TLS | Let's Encrypt, HTTPS, auto-renew |
| Domain & DNS | A record, CNAME, subdomain |
| Database Setup | PostgreSQL/MySQL ইনস্টল, ব্যাকআপ, restore |

## স্তর ৩: কনটেইনার (Docker)

| টপিক | কী থাকবে |
|---|---|
| Docker Basics | image, container, volume, network |
| Dockerfile | নিজের ইমেজ বানানো, multi-stage build |
| Docker Compose | কয়েকটা সার্ভিস একসাথে চালানো |
| Registry | Docker Hub, GHCR-এ ইমেজ পুশ |

## স্তর ৪: অটোমেশন (CI/CD)

| টপিক | কী থাকবে |
|---|---|
| CI ধারণা | কেন দরকার, কী সমাধান করে |
| GitHub Actions | workflow, job, step, secret |
| Test Pipeline | কোড পুশ করলে টেস্ট চালানো |
| Deploy Pipeline | মার্জ করলে সার্ভারে যাওয়া |
| Rollback | খারাপ ডেপ্লয় ফিরিয়ে আনা |

## স্তর ৫: ক্লাউড (Cloud)

| টপিক | কী থাকবে |
|---|---|
| VPS vs Cloud | কখন কোনটা, খরচের হিসাব |
| AWS মূল সেবা | EC2, S3, RDS, IAM, SES |
| Object Storage | ফাইল আপলোড, CDN |
| Managed Service | কখন নিজে চালাবেন না |
| খরচ নিয়ন্ত্রণ | বিল কমানোর কৌশল |

## স্তর ৬: নিরাপত্তা (Security)

| টপিক | কী থাকবে |
|---|---|
| Server Hardening | root বন্ধ, fail2ban, ufw |
| Secret Management | .env, vault, GitHub secret |
| Backup Strategy | কী, কোথায়, কতবার |
| Access Control | কে কী করতে পারবে |

## স্তর ৭: নজরদারি (Observability)

| টপিক | কী থাকবে |
|---|---|
| Logging | লগ কোথায়, কীভাবে পড়বেন |
| Monitoring | CPU, RAM, disk, uptime |
| Alerting | সমস্যা হলে খবর পাওয়া |
| Debugging Live | চালু সার্ভারে সমস্যা খোঁজা |

## স্তর ৮: উন্নত (Advanced)

এগুলো **শেষে**। আগে দরকার নেই।

| টপিক | কেন পরে |
|---|---|
| Infrastructure as Code (Terraform) | একাধিক সার্ভার হলে দরকার |
| Kubernetes | একা মানুষের প্রায় দরকার নেই |
| Load Balancing & Scaling | ট্রাফিক বাড়লে দরকার |
| Multi-environment | dev, staging, prod আলাদা করা |

## প্রতিটা পেজের কাঠামো

সব পেজে একই ছাঁচ রাখুন। পাঠক অভ্যস্ত হয়ে যাবে।

```
১. সমস্যা কী (কেন এটা লাগবে)
২. ধারণা (কীভাবে কাজ করে)
৩. হাতে-কলমে (কমান্ড + আউটপুট)
৪. বাস্তব অভিজ্ঞতা (আপনি কী ভুল করেছিলেন)
৫. পরের পেজের লিংক
```

## আমার একটা পরামর্শ

**স্তর ১-৪ আগে শেষ করুন।** এটাই ৮০% কাজে লাগে।

স্তর ৫-৮ পরে ধীরে ধীরে। Kubernetes দিয়ে শুরু করলে আপনি আটকে যাবেন।
