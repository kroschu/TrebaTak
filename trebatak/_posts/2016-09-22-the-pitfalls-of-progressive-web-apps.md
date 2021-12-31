---
layout: post
title: The Pitfalls of Progressive Web Apps
category: CS3216

device: mobile
orientation: portrait
images:
- Happ-1.png
- Happ-2.png
basepath: posts/happ/
---

Assignment 3 is all about building Progressive Web Apps (PWAs), which has certain traits: [[1]](https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/)

*   Progressive
*   Discoverable
*   Linkable
*   Responsive
*   App-like
*   Connectivity-independent
*   Re-engageable
*   Installable
*   Fresh
*   Safe

So apparently it has been quite the rage to develop PWAs in recent times, because it opens up many opportunities and bridges the gap between native and web interfaces. While I agree that it is indeed a huge step forward for the web development world to mimic the good things of native apps, my team has encountered one too many hitches along the way throughout the process of Assignment 3. 

For this week, I'll cover one of these traits: **App-like**. As described in the abovementioned article, a PWA should be app-like in the following manner:

> A progressive web app should look like a native app and be built on the application shell model, with minimal page refreshes.

In other words, a PWA should not require pinch zooming on the mobile, and scrolls in only one direction; it should also have many UI elements of a native app, such as but not limited to, hamburger menus and dismissable dialogs; and also act and feel like a native app, with smooth animations/transitions between UI states, and also allow touch events to be performed naturally on the app, such as swiping left and right. 

My team has definitely put a lot of thought into the user experience of the app, and considered multiple alternatives to displaying an expandable panel, and eventually settled on something like shown below:

<div class="portfolio-screenshot row center-xs">
    <div class="col-xs-12">
        {% include mockup.html %}
    </div>
</div>
<div class="row center-xs">
    <div class="col-xs-12">
        <p class="small">Click on the dots at the bottom right to navigate screens.</p>
    </div>
</div>

As seen in the first screen, the top part of the view represents the map marker that was just tapped on, while the bottom panel popped up from below the screen, which contains details about the Happ associated with the map marker above. The panel can be **dragged upwards or tapped on**, to maximize the screen as seen in the second screen, or **dragged downwards** to close the panel to return to the map. 

To us, it seemed totally intuitive for a mobile user, as a panel that popped up from the bottom of your screen that has some incomplete text would mean that you would be able to maximize it to full screen, as how the Google Maps app had done it: 

{% include image.html externalsrc="http://cdn.arstechnica.net/wp-content/uploads/2012/12/googlemapsiphone03.jpg" caption="Dragging the bottom panel on Google Maps will make it full screen." %}

This was the main motivation behind our decision to make a panel that was expandable/collapsible by dragging upwards and downwards respectively. It worked pretty well, and took us quite a while to get all the states in React/Redux right. Then we tested it on our phones. 

### Problem 1: Android Chrome's Pull-Down-to-Refresh 

If you drag the screen downwards on a static element, Chrome will activate its pull-down-to-refresh feature, which interferes with dragging down the panel to dismiss it. Okay, I thought. A search revealed a quick fix: put `overflow: hidden` on the `body` tag, and you won't face this problem. 

### Problem 2: iOS Elastic Scrolling 

It took me until just now to discover the iOS has this feature called elastic scrolling, which will cause your screen to "bounce back" if you scroll past the boundary of the page. This interferes with the interface's behaviour, because instead of dragging the panel down to dismiss it, you end up both dragging the panel and the rest of the screen, as seen on the right: After some searching, yet another solution was found, which was to put `position: fixed` on the body tag as well.

{% include image.html src="happ/photo678674171176265678.jpg" caption="Elastic scrolling on iOS." width="400" %}

### Problem 3: Disabling Pull-Down-to-Refresh doesn't work on iOS Chrome

I thought by solving Problem 1, this wouldn't be a problem; but it seems that Chrome is implemented totally differently on iOS as compared to Android.

I have yet been able to solve this problem - and so it seems that you are unable to drag the panel down without causing the whole page to be refreshed, which makes it kind of unusable.

{% include image.html src="happ/photo678674171176265677.jpg" caption="Disabling pull-down-to-refresh on iOS Chrome doesn't work." width="400" %}

### Problem 4: iOS Safari's Home Screen App still has Elastic Scrolling

Now, yet another problem surfaced which previous fixes didn't solve. It seems that even within the same browser on the same OS, the web views are implemented totally differently when you open it in a browser vs opening it from your home screen! 

I'm stumped. There's no standardization at play here.

{% include image.html src="happ/photo678674171176265675.jpg" caption="The home screen app created with iOS Safari still has elastic scrolling." width="400" %}

---

Just trying to implement a simple UI behaviour that is seemingly simple on a native app had caused me so much headaches when you try to implement fully via CSS and JavaScript on a PWA. So much for trying to be app-like, when the browsers and standards themselves aren't ready for app-like behaviour. It took me a long while to discover this problem, and I doubt that we will be able to make all browsers in all forms support this behaviour fully by the deadline. 

I realised that, this UI behaviour may not have been the best for the job. As an Android user myself, I don't frequently come into contact with iOS devices and the look and feel of its interface. Dragging upwards/downwards may have made 100% sense on Android, but perhaps, it doesn't make sense on iOS. Users are probably more accustomed to swiping left and right to go backwards and forwards (Facebook and Instagram behaviour), and it takes a real iOS user to have known this from the start. 

In hindsight, it would have been smarter to test on phones as early on as possible, and assess alternative UI behaviours before committing to a single one. It's probably too late to change it now, so we will try to make do as much as possible until the deadline. When developing for mobiles first, this is a very good lesson to be learnt, since most of us usually design for desktops first (and it's so much easier to just get comfortable using Chrome DevTools's mobile emulator). 

In other news, **I don't think PWAs are ready to replace native apps at all**. Because of vendor inconsistencies and lack of a standardized browser behaviour on different platforms, developers will have a difficult time implementing app-like behaviours on PWAs, especially since many of these quirks are also part of the OS's style, and users would also be accustomed to how the browser behaves. It would be impossible to implement the same kind of behaviour and expect both browsers and users to react to them in the same way on different platforms - the same app usually has different behaviour when you use them on Android vs iOS. 

Next week, I'll try to continue ~~bitching~~ critiquing PWAs and their practical usage in today's context, from my experience in Assignment 3.
