---
layout: post
title: NUS Intercepting Traffic?
---

It was about 4am in PGPR when I was fooling around with sending non-standard HTTP requests to servers. Thinking of trying to see if there are any servers
which acted as an open proxy, I was trying to do this:

```shell
$ nc 1.2.3.4 80
GET / HTTP/1.1
Host: nc.irvinlim.com
```

So that I could receive HTTP requests made by the web server *if* it was forwarded. Here's a breakdown of what I did.

## Step 1: Set up a subdomain

I simply added an A record entry for `nc.irvinlim.com` to my server's IP address. As it is behind CloudFlare, I temporarily disabled CloudFlare's IP address cloaking so that traffic won't go through a second proxy.

## Step 2: Listen for traffic

Since I was already running a web server running on port 80 on my server, I simply added a `server` block in my nginx configuration to reverse proxy requests for `nc.irvinlim.com` to `localhost:3123`.

Next, I just needed to listen for traffic with `nc -l`:

```shell
nc -l 3123
```

Netcat is an incredibly useful tool for fooling around with non-standard HTTP requests, to try and reveal any errors or secrets that are not available through standard HTTP traffic.

## cURL! (or nc again)

I could have used cURL for this, but for simplicity's sake, I used netcat again to send a request from my local computer to an unrelated server, say Google's DNS server (`8.8.8.8`), with a `Host` header to `nc.irvinlim.com`. I wasn't expecting this to work at all:

```shell
$ nc 8.8.8.8 80
GET / HTTP/1.1
Host: nc.irvinlim.com


```

I was really surprised when I got this on my listening server:

```shell
$ nc -l 3123
GET / HTTP/1.1
Connection: upgrade
Host: nc.irvinlim.com
X-Real-IP: 137.132.250.9
X-Forwarded-Host: nc.irvinlim.com
X-Forwarded-Server: nc.irvinlim.com
X-Forwarded-For: 172.24.199.96, 137.132.250.9
```

I really didn't understand why. It's definitely not possible that Google's DNS servers are forwarding the requests to my server, can it? I even posted this as a [question](https://superuser.com/questions/1235793/netcat-forwarding-host) on Super User, where I realised that `172.24.199.96` was actually a private IP address (remember `172.16.0.0/12` is in the private IPv4 address space).

Intrigued, I opened up [http://172.24.199.96/](http://172.24.199.96/) in my browser, which brought me to this page:

{% include image.html src="router-homepage.png" caption="That's my router homepage!" %}

It made sense now. Google's servers weren't forwarding the requests, but it was a **transparent proxy** upstream which is responsible.

## Transparent proxies

It was my first time actually learning about this term *transparent proxy*, though I realised it's basically a description of what [Squid proxy cache](http://www.squid-cache.org/) does. I haven't used it before though.

Basically, I have a forward proxy upstream of my router, which is probably somewhere in [Computer Centre](https://nusit.nus.edu.sg/) (now called NUSIT), which translated my HTTP connection from `8.8.8.8` to the IP address resolved by `nc.irvinlim.com`. It's probably doing so as a means to filter and cache traffic, perhaps using Squid.

A useful site to determine if you are behind a proxy would be [whatismyproxy.com](http://www.whatismyproxy.com/), which displays detailed information about your proxy's IP address, which is revealed in the `X-Forwarded-For` address.

## Conclusion

So in my quest to find open proxies, I found myself behind a proxy instead. `¯\_(ツ)_/¯`

And nope. NUS isn't intercepting our traffic. 

If you used plain ol' HTTP of course the ISP could easily intercept it, but once you're on HTTPS you'll need to do either *deep packet inspection* or *SSL renegotiation* to decrypt SSL traffic. China's GFW uses DPI to [censor content deemed to be sensitive](https://www.wikiwand.com/en/Deep_packet_inspection#/China), while SSL renegotiation is a common practice used by WAFs and DDoS protection proxies. 
