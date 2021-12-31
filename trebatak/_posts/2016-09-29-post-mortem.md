---
layout: post
title: Post-Mortem
category: CS3216
---

I guess I should begin post-mortem for the past few assignments which had gone by, since time seems to be passing all too quickly to even ponder and reflect on how much I have learnt and how far I have come. 

I've been catching up and reading some of my classmates' blogs to see what they've been up to, because I think I never found a chance to do so before. It's pretty insightful that every person takes away a whole different set of experiences from each assignment, and the same applies to me as well.

# Assignment 1

For Assignment 1, we developed the initial app for ExchangeBuddy, found [here](https://app.exchangebuddy.com). I say initial because after all, ExchangeBuddy is Eugene's brainchild, and he's got a team of super-capable developers to help carry ExchangeBuddy to the next iteration (mobile native apps!) for the final project. It's a platform where students can find other students going on exchange at the same time to the same place as them, and hence take out the uncertainty associated with going for exchange alone. 

{% include image.html src="cs3216/Chat-National-University-of-Singapore-NUS.png" %}

For this assignment, I worked with Leon, Chi Thanh and Eugene. Eugene being the non-developer, focused on all the non-technical side of things, such as market validation, data retrieval, downloading nice royalty-free images, thinking of slogans and text, etc. The rest of us formed a rather interesting team of developers. Thanh specialises more in Rails, but because I don't even know Ruby, I can't really say much except that he's probably good since he went through CVWO! Leon is primarily a frontend developer, and he makes really nice mockups in Sketch and implements them in either React or Angular. For myself, I realised I was more of a frontend developer (in fact, only after the assignment) because my background is in the LEMP stack, and I only recently picked up all these hot new JavaScript toys such as React a few months back. 

Looking back, I realised it was quite a miracle that we could accomplish what we did for Assignment 1\. Our stack for this iteration of ExchangeBuddy was Meteor + MySQL - one of the weirdest and worst combos ever, and we had to use Sequelize (which was super painful because of its promise-based syntax, but it's probably due to my inexperience). We even used MongoDB for one of our tables because we didn't want to re-implement pub/sub functionality and optimistic UI in MySQL - imagine how messy it got to join the two together! We chose this stack simply because our team was pretty clueless at serving up a backend. We chose to use JS for the entire stack since it was the only common denominator amongst us, but it turns out none of us knew any JS backend frameworks or libraries, not even Express. We fell back on using Meteor because that's the only thing I knew (as well as Leon), and that's the story of how I became a backend developer. 

However, I'm pretty glad at our end result (when you look at the frontend). Even though I was primarily the backend developer, I found myself always creeping into fixing certain React components, and even going as far as to change the whole page layout. It was pretty hectic because I realised I gave myself additional work, but it was all for the benefit of the team as well. The site functioned as advertised, and I must say that it should be pretty okay for people to begin using it, except for the fact that user retention might not be so high without proper marketing and rapid onboarding of users. 

Retrospectively, I have much to learn about the entire Node.js philosophy and practices. I've been learning in a rather backwards fashion, and started using JS frameworks through Meteor. I only touched npm when I needed to fix Grunt (during my PHP days) or install some small packages into Meteor, and I had never really learnt how to use barebones Node.js at all. As a result, Assignment 1 was probably a huge mess in terms of code maintenance. It's been a pretty painful experience but definitely enriching, because what I thought I knew was totally not what I did, and I now know it's time to go back to basics, and perhaps pick up Express, instead of Meteor. 

I'm glad Eugene is going to bring it to the next level in the final project, because it's actually one of the few ideas throughout this mod which I feel has quite a lot of potential, yet is still a rather fresh idea. Unfortunately, he's looking to build native mobile apps, where I can neither help in the backend (probably not, considering the mess I made) or on mobile. 

Also, I learnt that you shouldn't rush out the writeups less than 24 hours before the deadline, when you know that you'll spending all your time finishing up the site - it felt like a rather sloppy packaging job over a worthy product. Presentation is everything, and we should really have worked smart this time.

# Assignment 3

For Assignment 3, we developed Happ (found [here](https://dev.happ.one)), which aims to be like Snapchat, but on a map. Users can post Happs, which is basically text and/or an image, to their current location, and this Happ will disappear after 24 hours. We wanted users to post what's happening in their lives, and then others can check out what's happening around them. We're basically creating a specialised Snapchat, for events and happenings. 

{% include image.html src="cs3216/1BCo4vRSfZm5mT3Z07sPF3xJQdDf8aXbCsh0y71w.png" %}

The team this time round was much more diverse, and we had really strong backend developers (phew). Kent and Manh focused on the backend side of things, settling the database schema, API server endpoints, server administration, data parsing, and so on. This time round, I worked with Thien and we focused entirely on the frontend, working on design mockups, UI planning, asset generation, and of course, creating the frontend. It felt so much easier that the roles were so clearly defined, with each person in the team doing what he's more confident in doing. 

I may have once been a full-stack developer for my small projects, where I settled everything from frontend to backend to database admin to server admin, but it's definitely not possible for me to spread myself so thin in the context of CS3216, especially if I am not familiar with particular parts of the stack. It felt so liberating for once that I only had to worry about whether the app looked nice, and I could more easily focus my efforts, instead of having to worry at all parts of the stack. 

However, that wasn't without struggles as well. Without Thien, I think I would still have died trying to lug out frontend on my own. Because I'm still new at React and JavaScript in general, it helped so much more when he provided a simple but working boilerplate to use, rather than when I tried to download and use [this one](https://github.com/nicksp/redux-webpack-es6-boilerplate) - I ended up throwing away half of that and I just didn't know why things weren't working. He helped tremendously in setting up Webpack for both development and production purposes, which, in his own words, took him 3 days last time just to get Webpack working. I learnt a little bit about how webpack works, used linting for the first time, but most importantly I found that the dev rebuild times using this stack took only 1-2 seconds tops, as compared to Meteor who always gave me 15 seconds on good days, or up to 30-45 seconds on bad days!!! I've realised even more that I should be going back to basics, and starting out with Meteor was probably not a wise choice when you think about it.

I've also learnt a lot about the different HTML5 web APIs through this assignment. Service workers is probably one of the cooler ones, but although it was Thien who worked on it for its entirety this time, I would probably want to explore into what else it can do for coming projects. 

Comparing Assignment 1 and 3, the latter went way smoother, even though we had essentially only had 2 weeks of development time. I think it was because the team was more focused and tasked to work on what they were individually good at, but that doesn't mean that we cannot continue to learn while being comfortable. In fact, I found that learning stuff more in depth and getting familiar with things which I always avoided in the past (e.g. handling HTTP requests manually) helped me much more, and I also found myself enjoying myself and learning so much more in this assignment, despite being in my apparent comfort zone. 

It was also really heartening to know that Kent and Manh are willing to continue working on Happ even after CS3216, and I definitely want to continue to help out as well. I think that it's quite a fresh idea that could potentially become a hit, and so I am open to taking this leap of faith.

# Other thoughts

Almost 8 weeks into CS3216 and I feel like I've only really been doing one module this semester - I've been guilty of ignoring my other modules entirely... But yet, it's been a pleasant experience so far. I've truly been humbled and got to know so many zai kias in SoC thanks to this module. As a Year 2, it might have seemed daunting or even crazy to attempt this module so early on, but I'm glad I did so. My perspective towards software development, web development and how I look at startups nowadays has definitely changed since taking this module. Even though I probably won't specialise in software engineering in SoC, but thanks to this module, I've been able to exercise my passion to develop refined things which people actually can use, which was what motivated me to enter SoC in the first place. I'm looking forward to creating a wonderful app for our final project, and it can only get better from here! :)
