---
layout: post
title: It's Over (Part 1) - Post-Mortem
category: CS3216
---

What can I say! There can't be a better way to end the semester than STePS. 

The only feeling I have right now is that I am so terribly relieved that this hell of a semester is over. Yes, I still have finals. Yes, I haven't studied a single page of my lecture notes and it's 11 days to my first paper. Yes, I haven't been going for lectures or tutorials or watching webcasts for a particular module since Week 6. But I can't be feeling more relaxed than ever. 

I'm proud that I have managed to survive it all and still remain in one piece by the end of the semester. I haven't been very smart choosing all the modules which are kinda heavy on projects/continual assessments (especially CS2103) together with CS3216, but that's my own ignorance. Goodness knows how many all-nighters I have pulled (meaning not sleeping at all and going for class the next day) throughout the second half of this semester, but I'm glad all of this is over. 

I'm not saying that it was a terrible experience. In fact, I feel happier than ever that I have managed to accomplish so much in this span of 14 weeks since Day 1 of AY16/17 Semester 1. If you count all the individual projects I have this semester, it actually amounts to **seven projects**. But in these 7, being able to feel proud or feel appreciative of some of them makes up for the sweat and tears toiled throughout. 

So.. Let's talk about the final project.... Where should I start! It has been a hell of a ride. But meanwhile, I'm so proud of my team for carrying **1our** to where it is today.

{% include image.html src="cs3216/Slack-for-iOS-Upload.jpg" caption="Missing Kent, who fell asleep (?) after his exam and couldn't show up in time for STePS." width="600" %}

### Painful Pivoting 

We actually pivoted our idea 4 times before settling on this idea, which makes this our **5th idea**. If one were to look at all the 8 versions of the .sketch mockups in our Google Drive folder, you'll find the 1our logo being used for all our previous ideas. The mockups kind of morphed into what the UI looks like today, and it's been a long journey to reach where we are today. I realised I put off writing any posts about our final project idea, because we had never stabilized them until **Week 11** (that's just 3 weeks before STePS, btw). 

So as some background, we actually formed a team based on Xu Jie's idea for empowering the elderly, but we soon found problems with the idea when he went down to Lions Befrienders, in that we probably wouldn't succeed in making an app that targets the elderly, nor convincing them that they would want to provide services such as cooking in exchange for socially-inclined members of society who are willing to pay for their services. 

Our next idea considered bringing the concept of Time Credits to Singapore, where we wanted neighbours to help each other if they needed goods or services, in exchange for real money, or a karma-based currency called Time Credits. We quickly realised this idea could not possibly gain traction in Singapore. 

We then went on to explore our 3rd variation of ideas, where we explored using Time Credits as a way to incentivize people to volunteer their time. In exchange for volunteering for officially recognised and verified activities at partner VWOs, we wanted to allow these Time Credits to be used to exchange for offers, discounts or a la carte items at partner merchants. We had many ideas, and ran this idea through many rounds of mockup design, and coming up with about half of the frontend.

{% include image.html src="cs3216/1ourv3.png" caption="Top: Signing up for a volunteer event and registering attendance by scanning a QR code.<br />Bottom: Finding a merchant deal and redeeming with Time Credits by presenting a QR code." %}

However, after encountering one too many rejections from VWOs, who felt that equating time offered to monetary equivalents cheapens the value of volunteering, and with no merchants or VWOs on board, we had to pivot once again. 

So in **1our version 4**, we actually got to meet Hon Meng, the founder of **blockpooling.sg** (now known as [HoodChampions](https://www.hoodchampions.sg/)), who reiterated that notion that our previous idea would not work, and presented us a similar problem that we could possibly utilise. According to him, volunteer hours have been all along painful to keep track of, where many VWOs still marking attendance on paper, cross referencing and issuing volunteer hour certificates manually. He argued that many working professionals, especially those working in the public sector, are required to attend 1 day of voluntary work every year, and the administration and paperwork involved could be significantly reduced if we could track hours efficiently. 

We thought it would be a good idea if VWOs put up QR codes unique to an activity that can be scanned, and volunteers would have to scan them to mark attendance. Furthermore, we thought of extending this idea for volunteers by making a LinkedIn for volunteering, and allow volunteers to display VWO-verified hours on their personal profile, as a form of bragging rights/endorsement. Additionally, we wanted to expose a public verification API, similar to Coursera's, such that digital volunteer hour certificates that were signed by us can be verified, which is encoded with the NRIC/identity of the certificate holder. 

With all these big ideas, we headed down to **St. Joseph's Home**, hoping that we could help this VWO to improve their workflow of tracking their volunteer's hours. We were then presented with a whole array of more important and significant problems that they faced, which we soon realised extended to almost every other small to medium-sized VWOs like St. Joseph's. What they needed wasn't so much of working out the hours on paper. Geraldine from St. Joseph's kindly walked us through how the home needed an entire overhaul of their system, encompassing volunteer recruitment, screening of volunteers (matching), registration of their details, volunteer feedback, and so on. We realised the problem we wanted to solve in their case was not even comparable to the much more pressing issues they needed to solve. Unfortunately, we parted ways agreeing that we could not really help them out this time round. 

We were devastated. Note that at this point in time, it was 20th October 2016, Thursday of Week 10 and **22 days to STePS, with no idea yet**. We agreed we were officially screwed. It was the second UI/UX consultation the next day, and we had no ideas, much less any interfaces to show Prof Colin. 

However, it was actually thanks to Prof Colin who came up with the idea of our next, and thankfully final idea for the project. We eventually settled on **1our**: a platform which brings students ad-hoc jobs from around campus, and focused targeting paid research studies in school. This idea was probably the simplest out of our 4 other iterations of ideas above, but thankfully we were able to gain support from both sides of the market, which was the supply-side (researchers) and demand-side (students). 

### Learning Points

If there was anything that I had gained from this whole experience of getting our ideas invalidated time and again in 4 weeks, it was that market validation was extremely important. We actually were thankful we went ahead with validating our ideas before actually diving headfirst into development. In retrospect, most of our previous ideas really couldn't have gained traction. I was especially fond of the digital certificate signing thing though, it was a shame we couldn't get to implement it. 

If we were to look at it as a whole, the time spent was actually worth it. Granted that we only started real development in Week 11, which I did alongside 3 other heavy projects in that week, but we actually found a niche and a real problem to solve in a relevant context at the right time. We wanted to replace how IVLE Student Events was used by researchers to get participants for their paid research study, by bringing the two parties together in a more intuitive fashion, and since it is due to close down next month, this problem is definitely worthy to be solved. 

From the feedback and testimonials we have obtained, many researchers are extremely thankful and appreciative that we have come up with such a platform to help them out. It really feels good when your app actually helps people, and when we saw a surge in number of signups for paid studies, we were extremely delighted. It couldn't have been better than to see people actually using our app, instead of all our previous implementations which were thrown away just like that. 

I also learnt the real importance of perseverance. Never have I ever felt so helpless before at the point in time at Week 10, and I was kind of envious that other groups already had somewhat validated ideas from their mentors, or had at least seen much more progress than we have. I was actually repeatedly sighing and whining while we were at Prof Colin's consultation, and I'm really thankful that we did not give up and stuck to what we felt was important - to validate the market before implementation. 

In the next part of this series, I will be covering our experience with ~~hustling~~ marketing and how we managed to onboard a substantial amount of users by STePS, despite only launching 4 days before STePS.
