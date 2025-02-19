---
title: Emails to Actor users
description: Email communication is a key tool to keep users engaged and satisfied. Learn when and how to email your users effectively to build loyalty and strengthen relationships with this practical guide.
sidebar_position: 1
category: apify platform
slug: /get-most-of-actors/interact-with-users/emails-to-actor-users
---

**Getting users is one thing, but keeping them is another. While emailing your users might not seem like a typical marketing task, any seasoned marketer will tell you it’s essential. It’s much easier to keep your current users happy and engaged than to find new ones. This guide will help you understand when and how to email your users effectively.**

---

## Whom and where to email

You can email the audience of a specific Actor directly from Apify Console. Go to **Actors > Emails > Compose new ＋**. From there, select the Actor whose users you want to email, write a subject line, and craft your message. An automatic signature will be added to the end of your email.

## How to write a good email

Emails can include text, formatting, images, GIFs, and links. Here are four main rules for crafting effective emails:

1. Don’t email users without a clear purpose.
2. Keep your message concise and friendly.
3. Make the subject line direct and to the point. Consider adding an emoji to give users a hint about the email’s content.
4. Use formatting to your advantage. Console emails support Markdown, so use bold, italics, and lists to highlight important details.

Additional tips:

- Show, don’t tell — use screenshots with arrows to illustrate your points.
- If you’re asking users to take action, include a direct link to what you're referring to.
- Provide alternatives if it suits the situation.
- Always send a preview to yourself before sending the email to all your users.

## When to email users

Our general policy is to avoid spamming users with unnecessary emails. We contact them only if there's a valid reason. Here’s the list of regular good reasons to contact users of the Actor:

### 1. Introducing a new feature of the Actor

New filter, faster scraping, changes in input schema, in output schema, a new Integration, etc.

>✉️ 🏙️ Introducing Deep city search for Tripadvisor scrapers
>
>Hi,
>
>Tired of Tripadvisor's 3000 hotels-per-search limit? We've got your back. Say hello to our latest baked-in feature: Deep city search. Now, to get all results from a country-wide search you need to just set Max search results above 3000, and watch the magic happen.
>
>A bit of context: while Tripadvisor never limited the search for restaurants or attractions, hotel search was a different case; it always capped at 3000. Our smart search is designed to overcome that limit by including every city within your chosen location. We scrape hotels from each one, ensuring no hidden gems slip through the cracks. This feature is available for [Tripadvisor Scraper](https://console.apify.com/actors/dbEyMBriog95Fv8CW/console) and [Tripadvisor Hotels Scraper](https://console.apify.com/actors/qx7G70MC4WBE273SM/console).
>
>So get ready for an unbeatable hotel-hunting experience. Give it a spin, and let us know what you think!

Introduce and explain the features, add a screenshot of a feature if it will show in the input schema, and ask for feedback.

### 2. Actor adapting to the changes of the website it scrapes

A common situation in web scraping that's out of your control.

>✉️ 📣 Output changes for Facebook Ads Scraper
>
>Hi,
>
>We've got some news regarding your favorite Actor – [Facebook Ads Scraper](https://console.apify.com/actors/JJghSZmShuco4j9gJ/console). Recently, Facebook Ads have changed their data format. To keep our Actor running smoothly, we'll be adapting to these changes by slightly tweaking the Actor Output. Don't worry; it's a breeze! Some of the output data might just appear under new titles.
>
>This change will take place on October 10; please** **make sure to remap your integrations accordingly.
>
>Need a hand or have questions? Our support team is just one friendly message away.

Inform users about the reason for changes and how the changes impact them and the Actor + give them a date when the change takes effect.

### 3. Actor changing its payment model (from rental to pay-per-result, for example)

Email 1 (before the change, warning about deprecation).

>✉️ 🛎 Changes to Booking Scraper
>
>Hi,
>
>We’ve got news regarding the Booking scraper you have been using. This change will happen in two steps:
>
>1. On September 22, we will deprecate it, i.e., new users will not be able to find it in Store. You will still be able to use it though.
>2. At the end of October, we will unpublish this Actor, and from that point on, you will not be able to use it anymore.
>
>Please use this time to change your integrations to our new [Booking Scraper](https://apify.com/voyager/booking-scraper).
>
>That’s it! If you have any questions or need more information, don’t hesitate to reach out.

Warn the users about the deprecation and future unpublishing + add extra information about related Actors if applicable + give them steps and the date when the change takes effect.

Email 2 (after the change, warning about unpublishing)

>✉️ **📢 Deprecated Booking Scraper will stop working as announced 📢**
>
>Hi,
>
>Just a heads-up: today, the deprecated [Booking Scraper](https://console.apify.com/actors/5T5NTHWpvetjeRo3i/console) you have been using will be completely unpublished as announced, and you will not be able to use it anymore.
>
>If you want to continue to scrape Booking.com, make sure to switch to the [latest Actor version](https://apify.com/voyager/booking-scraper).
>
>For any assistance or questions, don't hesitate to reach out to our support team.

Remind users to switch to the Actor with a new model.

### 4. After a major issue

Actor downtime, performance issues, Actor directly influenced by platform hiccups.

>✉️ **🛠️ Update on Google Maps Scraper: fixed and ready to go**
>
>Hi,
>
>We've got a quick update on the Google Maps Scraper for you. If you've been running the Actor this week, you might have noticed some hiccups — scraping was failing for certain places, causing retries and overall slowness.
>
>We apologize for any inconvenience this may have caused you. The **good news is those performance issues are now resolved**. So feel free to resurrect any affected runs using the "latest" build, should work like a charm now.
>
>Need a hand or have questions? Feel free to reply to this email.

Apologize to users and or let them know you're working on it/everything is fixed now. This approach helps maintain trust and reassures users that you're addressing the situation.

:::tip

It might be an obvious tip, but If you're not great at emails, just write a short draft and ask ChatGPT to polish it. Play with the style until you find the one that suits you. You can even create templates for each situation. If ChatGPT is being too wordy, you can ask it to write at 9th or 10th-grade level, and it will use simpler words and sentences.

:::

## Emails vs. newsletters

While sending an email is usually a quick way to address immediate needs or support for your users, newsletters can be a great way to keep everyone in the loop on a regular basis. Instead of reaching out every time something small happens, newsletters let you bundle updates together.

Unless it's urgent, it’s better to wait until you have 2 or 3 pieces of news and share them all at once. Even if those updates span across different Actors, it’s perfectly fine to send one newsletter to all relevant users.

Here are a few things you can include in your newsletter:

- updates or new features for your Actors or Actor-to-Actor Integrations
- an invitation to a live webinar or tutorial session
- asking your users to upvote your Actor, leave a review or a star
- a quick feedback request after introducing new features
- spotlighting a helpful blog post or guide you wrote or found
- sharing success stories or use cases from other users
- announcing a promotion or a limited-time discount
- links to your latest YouTube videos or tutorials

Newsletters are a great way to keep your users engaged without overwhelming them. Plus, it's an opportunity to build a more personal connection by showing them you’re actively working to improve the tools they rely on.

## Emailing a separate user

There may be times when you need to reach out to a specific user — whether it’s to address a unique situation, ask a question that doesn’t fit the public forum of the **Issue tab**, or explore a collaboration opportunity. While there isn’t a quick way to do this through Apify Console just yet, you can ensure users can contact you by **adding your email or other contact info to your Store bio**. This makes it easy for them to reach out directly.

✍🏻 Learn best practices on how to use your Store bio to connect with your users [Your Store bio](/academy/get-most-of-actors/interact-with-users/your-store-bio).
