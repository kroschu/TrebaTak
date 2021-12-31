---
layout: post
title: JavaScript
category: CS3216
---

This post is slightly late, supposed to be posted last week ><

## Too Many Frameworks

I recently chanced upon [How it feels like to learn JavaScript in 2016](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f). It's quite a long article, but do give it a read the whole way through. It gave me quite a good laugh, and it's funny because it's all true. 

In other news, I do agree that the software world is really moving way too rapidly to sustain any sort of stable standards or best practices. Even throughout the period of a single semester doing 3 assignments, I find myself learning and unlearning the so-called best practices which I thought were correct. I find new ways of doing things. It's both good and bad - good because as I have outlined in previous posts, usually I discover techniques or features which I haven't really had the chance to work on before. 

One example would be how I have kept restructuring a React app's folder structure should look like. It's definitely up to developers' preferences, but from working with different teams and downloading different boilerplates you get a sense of how you can do things differently, such as one which structured Redux actions and reducers related to a single component under `components/` along with other view files, instead of traditionally having `actions/` and `reducers/` separated from your components. 

However, the insanely fast pace at which the software world is evolving is also rather bad for beginners. I consider myself lucky to have begun my foray into actual JavaScript development (this year!) with advice from Leon. Having too many options at the table often ends up with us Googling/StackOverflowing/Quoraing to find the "best framework"/"best library" to use, rather than just taking a plunge into the deep end. It's kind of a contradiction, that having more freedom makes you end up more stuck than ever before. 

I do hope that the pace slows down in the near future, and that developers can all collectively decide what's good and what's not.

## Software Engineering

It's quite ironic that I'm doing _CS2103 Software Engineering_ at the same time as _CS3216 Software Product Engineering for Digital Markets_, since (I guess) we are supposed to learn your good habits, improve your code quality and get familiar with common software engineering patterns and paradigms in CS2103 before moving to production-quality development in CS3216, but yet we're just going all out (often in a haphazard manner) in CS3216. 

Although there's many things in CS2103 I don't agree with, but it has definitely exposed me to the terminology to describe and concretize my ideas about how software should be structured, and some of it I wish I had known before starting on our assignments, with terms such as _coupling_, _single responsibility principle_, etc. which I probably already knew, but never formalized them into actual theory. These are useful not just when working with others in communication, but also when working alone. 

I've also been reading about what makes JavaScript so popular but yet dangerous at the same time. Apparently, as compared to other languages, what makes it so great is its **freedom**! This definitely won't go well in Prof Damith's books, but OOP is outdated, and working under a strict environment such as Java makes you spend more time to get your code to compile, rather than the time it says it saves by preventing runtime errors. Because of super-strict and awkward rules in Java (such as not being able to declare a `static abstract` method) I ended up repeating myself so many times (violating DRY). JavaScript doesn't have this problem - it uses **prototypal inheritance rather than classical inheritance**. I'm not fully clear on the advantages and disadvantages of both, but I've really become so irritated at how restrictive OOP (or more specifically Java) is >:(
