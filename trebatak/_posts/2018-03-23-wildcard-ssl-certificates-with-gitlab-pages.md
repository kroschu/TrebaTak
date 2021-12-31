---
layout: post
title: Wildcard SSL Certificates for GitLab Pages
date: 2018-03-23 22:06 +0000
---

Let's Encrypt [just announced](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579) support for wildcard SSL certificates a few days ago, and I'm super excited that it has finally been available!

For those who don't know, Let's Encrypt is a certificate authority (CA) which provides free (!) SSL certificates for the general public. For most of us, this means a huge difference between having to pay between $20-$100 a year for each domain you wish to protect under HTTPS, to having it being literally free since its launch in 2016:

{% include image.html src="letsencrypt-stats.png" caption="Screenshot taken from https://letsencrypt.org/stats/." %}

I'm also a big fan of [GitLab](https://gitlab.com/), a hybrid open-source/EE GitHub alternative that I've been using since 2015 to host many of my personal projects that aren't on GitHub. For one, I've been hosting personal notes and stuff while studying at NUS at <https://nus.pages.irvinlim.com/>, which has helped me revise for exams while I was making them, as well as to provide quick access to knowledge that I had learnt before simply by browsing to the URL anytime. This is all done with the help of GitLab Pages, which naturally, is similar to GitHub Pages (I believe GitLab came up with it later).

Anyhow, the biggest peeve I had for a while was that I couldn't easily set up HTTPS for GitLab Pages, since the way it works is by taking up a wildcard domain on your web server (and your DNS). However, Let's Encrypt had only allowed you to create certificates for individual domains - which meant that `a.pages.irvinlim.com` is separate from `b.pages.irvinlim.com`.

GitLab Pages namespaces the URLs based on the username of the repository, so `nus.pages.irvinlim.com` is owned by the user `nus` (which is actually just a GitLab group with a single user inside, myself). I couldn't easily set up HTTPS automatically for all subdomains without creating SSL certificates one by one for each domain that needed it... Until now that we have wildcard SSL certificates!

## Using Certbot

It's likely that most of us who have used Let's Encrypt have used Certbot from the start. Luckily, Certbot already supports the new ACMEv2 (as of 0.22.0), which streamlines the way we can request and get issued a certificate.

Following [this tutorial](https://community.letsencrypt.org/t/getting-wildcard-certificates-with-certbot/56285) from the Let's Encrypt forum, we see that they recommend either running it in Docker, or to use the manual plugin. For a quick and painless setup, let's just go with the manual plugin.

Make sure that Certbot is installed and updated (it should automatically update when you haven't run it in a while):

```sh
# Download certbot-auto if you don't yet have it. Skip this if you do.
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto

# Check whether the version is at least 0.22.0.
./certbot-auto --version
```

Next, we can use the `certonly` option, generating a certificate which we can add to our web server later:

```sh
./certbot-auto certonly --manual \
    -d *.pages.irvinlim.com \
    --preferred-challenges dns-01 \
    --server https://acme-v02.api.letsencrypt.org/directory
```

Just replace `*.pages.irvinlim.com` with your wildcard domain that you prefer. While the tutorial requested certificates for two domains at the same time, I ran into trouble trying to deploy both of them in the same command.

This is the output, and if they ask if you're okay with your IP address being logged, just press `Y` (privacy is overrated :/)

```
Requesting to rerun ./certbot-auto with root privileges...
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator manual, Installer None
Obtaining a new certificate
Performing the following challenges:
dns-01 challenge for pages.irvinlim.com

-------------------------------------------------------------------------------
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?
-------------------------------------------------------------------------------
(Y)es/(N)o: Y
```

You'll then need access to your DNS records, as you'll have to prove that you own the domain. Rather than using the `webroot` plugin which works for single domains, we can only prove the ownership of our domain through DNS records.

The output continues as follows:

```
-------------------------------------------------------------------------------
Please deploy a DNS TXT record under the name
_acme-challenge.pages.irvinlim.com with the following value:

hfHoa4Vx5iPyjJZHNlpI4933tXoE5Y-q7OhCzlNYUJw

Before continuing, verify the record is deployed.
-------------------------------------------------------------------------------
Press Enter to Continue
```

Now don't press Enter yet! Copy the value that they gave you into a TXT record for `_acme-challenge.YOUR_DOMAIN` in your DNS configuration - since I use CloudFlare, it was as simple as this:

{% include image.html src="letsencrypt-wildcard-cloudflare.png" %}

Once done, you can check whether your DNS record has propagated with `dig` (CloudFlare makes this amazingly fast):

```
$ dig txt _acme-challenge.pages.irvinlim.com @8.8.8.8

; <<>> DiG 9.8.3-P1 <<>> txt _acme-challenge.pages.irvinlim.com @8.8.8.8
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 59819
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;_acme-challenge.pages.irvinlim.com. IN	TXT

;; ANSWER SECTION:
_acme-challenge.pages.irvinlim.com. 204	IN TXT	"hfHoa4Vx5iPyjJZHNlpI4933tXoE5Y-q7OhCzlNYUJw"

;; Query time: 39 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Sat Mar 24 05:49:46 2018
;; MSG SIZE  rcvd: 108
```

Now you can press Enter in your terminal. If all went well, it should be done!

```
Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/pages.irvinlim.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/pages.irvinlim.com/privkey.pem
   Your cert will expire on 2018-06-21. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot-auto
   again. To non-interactively renew *all* of your certificates, run
   "certbot-auto renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

## Modifying your NGINX configuration

If you have an existing instance of GitLab Pages running, you probably have an NGINX configuration looking like this: <https://gitlab.com/gitlab-org/gitlab-ce/blob/master/lib/support/nginx/gitlab-pages>

Let's change the port `80` to `443`, and redirect all requests for HTTP to HTTPS instead.

In the HTTP (i.e. port `80`) server block, replace all contents so that it looks like this:

```nginx
server {
    listen 80;
    server_name ~^.*\.pages\.irvinlim\.com$;

    # Redirect to HTTPS.
    location / {
        return 301 https://$http_host$request_uri;
    }
}
```

Next, we can add the port `443` server block:

```nginx
server {
    listen 443 ssl;
    server_name ~^.*\.pages\.irvinlim\.com$;

    include conf.d/constants/ports.conf;

    ## SSL via LetsEncrypt
    ssl_certificate /etc/letsencrypt/live/pages.irvinlim.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pages.irvinlim.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    ## Individual nginx logs for GitLab pages
    access_log  /var/log/nginx/gitlab_pages_access.log;
    error_log   /var/log/nginx/gitlab_pages_error.log;

    location / {
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto   $scheme;
        proxy_pass          http://127.0.0.1:$PORT_GITLAB_PAGES;
    }

    # Define custom error pages
    error_page 403 /403.html;
    error_page 404 /404.html;
}
```

That's all to it, just reload your NGINX server, and your GitLab Pages should be ready for HTTPS immediately on all your domains! Wasn't that simple?
