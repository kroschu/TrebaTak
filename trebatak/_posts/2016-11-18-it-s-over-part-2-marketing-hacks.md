---
layout: post
title: It's Over (Part 2) - Marketing Hacks
category: CS3216
---

It's time for part 2 of the post-mortem of CS3216 Final Project! I'll talk about what made up most of the learning experience in the Final Project - marketing! I must say that most of it was based on intuition, and stumbled my way through marketing. 

Our team has had the benefit of having a business guy on the team - Xu Jie - and he has really helped in terms of getting word out about **1our**. Because of our countless pivots, we only had essentially 4 days after our launch on **Week 13 Tuesday** to market the production-grade app (production-grade is also debatable). I'll be sharing what we had done in terms of marketing, as well as what went well/not so much.

## UTM Codes

UTM stands for **Urchin Tracking Module**, which originated from the software [Urchin](https://en.wikipedia.org/wiki/Urchin_(software)), which Google acquired and subsequently became known today as Google Analytics. The definition of a UTM code, according to [launchdigitalmarketing.com](https://www.launchdigitalmarketing.com/what-are-utm-codes/), is:

> A UTM code is a simple code that you can attach to a custom URL in order to track a source, medium, and campaign name. This enables Google Analytics to tell you where searchers came from as well as what campaign directed them to you.

So if you didn't get what that meant at all, it just means that you append extra query string parameters in a URL to your app that you share for others to click, and you'll be able to see how many people have clicked the link and from where. An example of a UTM-coded URL goes as such:

`https://1our.today/?utm_source=facebook&utm_medium=page`

Notice those `utm_source` and `utm_medium` query string parameters? These are standard conventions which helps to differentiate clicks based on what UTM arguments are provided. There are a few of these UTM codes:

*   `utm_source`: The referring site or publication that is sending traffic to your app (e.g. google, facebook)
*   `utm_medium`: The advertising or marketing medium (e.g. banner, email newsletter)
*   `utm_campaign`: The name of the marketing campaign responsible for the traffic
*   `utm_term`: Identify paid search keywords (not that relevant here)
*   `utm_content`: An additional parameter to differentiate between potentially identical UTM URLs

###### [Source: [Google Analytics Help](https://support.google.com/analytics/answer/1033863)]

A useful tool to help you build these UTM-powered URLs would be Google's [Campaign URL Builder](https://ga-dev-tools.appspot.com/campaign-url-builder/), so that you don't have to manually type them in every single time. After receiving traffic from these URLs, you can see them in Google Analytics after about 24 hours or so, under **Acquisition > All Traffic > Source/Medium**:

{% include image.html src="cs3216/All-Traffic-Analytics.png" caption="Screenshot of the performance of each tracked link we sent out till today." %}

So how did this help? First of all, notice that we had almost 50% of incoming traffic without any UTM codes, which meant one or two things: we have been giving out flyers and put up posters aggressively since Tuesday, and those URLs could not possible have included the UTM codes (since people were going to type them into their browser manually), and there were **123 new users**on Thursday resulting from direct referrals (1 day before STePS), the highest ever compared to other days. This could have meant that our marketing in person was the most effective form of marketing (either that, or somehow we missed out tagging a whole bunch of URLs):

{% include image.html src="cs3216/Capture.png" caption="<span style='font-family: Comic Sans MS, sans-serif; font-weight: bold; font-size: 14px; color: violet;'>such users, much wow</span>" %}

In a larger scale of things, if you should be doing marketing on a larger scale or over a longer period of time, it might make much more sense to track your traffic, rather than what we did over the 4 days before STePS. However, this gave me a lot of insights on what marketing strategies went well, where most of your incoming links are coming from, and steer more of your marketing efforts in those areas. 

For example, we also partnered with Paperbaton and offered discount codes to the first 500 users who signed up and claimed them. Although we were able to see visibly how many users have claimed them in our database, we also added a UTM-powered URL on our Facebook post advertising for it. Sadly, only 1.39% of incoming links came from this link (although you can attribute other traffic sources for users who came in because of the offer, such as seeing it on our poster/flyers). 

Interestingly enough, there were zero incoming traffic attributed to the URL encoded in the QR code found on our posters or flyers. Seems like no one uses QR scanners nowadays (neither do I), but somehow every single poster at SoC basement has a QR code on it!

## Monetary incentives

Because **1our** is marketed to end users on the promise of allowing them to earn easy money in a short time, it was natural that we emphasise the money they could earn if they sign up on our site. This was especially exemplified through our eye-catching poster:

{% include image.html src="cs3216/1our-1.png" caption="Sounds familiar? It's inspired by <a href='https://www.facebook.com/sqkii/photos/a.625981914126890.1073741827.625952320796516/1181083798616696/'>Sqkii's superbly viral campaign held in NUS/NTU</a>." width="600" %}

This might have greatly aided us in onboarding users to our app, as users would more likely be intrigued and inclined to visit our link once you mention money. Considering we started pretty late, this might have really saved us :phew: 

However, one of our users had brought up to us that emphasising monetary incentives to get users to take part in research studies (which currently form the bulk of the content we have) could have ethical consequences. Zhenna, one of the psychology researchers, brought up to us that it is not ethical to induce people into participating, and she actually had her study suspended by [NUS IRB](http://www.nus.edu.sg/irb/) because she highlighted the reimbursement rate on her poster in red. This might be an issue once we gain traction, so we might have to consider this carefully. However, considering that the basis of our marketing geared towards demand-side users are primarily monetary, this could potentially undermine the whole stability of the project.

## Growth hacking

For one of our lectures, I believe an external speaker was invited in to speak about Growth Hacking for apps or startups. I was unfortunately absent for that lecture, so my knowledge about the topic might not be that clear. For this stint however, we had attempted our own form of growth hacking, in order to solve the infamous chicken-and-egg problem for apps that involve two or more markets of users. 

We initially seeded all our data from events on IVLE Student Events, which we are hoping to do better than it, in order to have 20+ studies available on our site to attract users. This also convinces supply-side users (e.g. researchers, job providers) that we are substantial, and to build a positive image of 1our. 

We then went on further, by first onboarding lots of demand-side users (i.e. students who want to find jobs/studies), received 20+ signups on the first day, and then went on to email the researchers behind those studies to inform them that, "Hey look, we have already got 4 signups for your study on 1our, please sign up in order to receive their details!", and I think that this went pretty well! We had about 10 of them taking over their listings on our site, and managed to get even more researchers to post their studies in the meantime! 

I think we had really been lucky that this worked. We had to depend on how receptive researchers were to entertain us (how desperate were they for participants?) as well as how many signups we could get before we could go ahead with sending out those emails (how successful was our attempt to get signups?). These two factors really had to go hand-in-hand in order for this to work, and in the short time we had before STePS, I think that this was successful enough!

## STePS Gimmicks

For those who might or might not have known, we actually managed to get my friend's friend (thanks Elvis!), a masters-level psychology student conducting a paid study to come down during STePS to actually carry out the paid study whilst STePS was ongoing. We were hoping that this would attract many people to our booth with the signs we put up ("Earn $5 right now!"), but we were so overwhelmed with people coming to our booth that we couldn't really entertain a lot of people who visited our booth. Furthermore, it didn't work that well, with only 6 people who turned up for his study, and we felt pretty bad that although he was around for 2 hours, he didn't get as much responses as he thought he would receive. 

This didn't work probably because of the location of the study. We had booked PL6 for this purpose, but as it was one level below all the booths, most people were probably unwilling to travel even though they could earn $5 for little effort. Also, most people who visited our booth probably were here to take a look at all the exhibits, and taking up 30 minutes (or even less) of their time was probably undesirable for them. 

In hindsight, because Elvis wanted a quiet room for the study to be conducted, we could have booked another room within COM1 Level 2 (such as one of the tutorial rooms) and borrowed laptops for this, as it would have been much closer to our booth. Oh well, this is a learning point for us! 

In the next and final part of the series (which will have to be tomorrow or Sunday), I'll be wrapping up with final thoughts and feelings towards CS3216 :)
