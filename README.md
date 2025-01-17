# PolySched
A mobile first calendar web app for more granular event sharing.

PolySched uses a tag based system to make it easier to control who you share your calendar events with and what calendar events you subscribe to.

## Development Stack (MERN)
 - Mongodb
 - ExpressJS
 - React
 - NodeJS

## Target Audience
PolySched targets people with busy social lives who need to keep their schedules organized and share events in mass with particular groups of people so as to not overwhelm themselves and those who need to know about their schedule. These audiences include small businnesses, community organizers, individuals with large social networks, and individuals with multiple romantic partners. The app is mobile first because scheduling is often done on the fly from someone's mobile device, and not nessecarily from a traditional desktop computer. The calendar apps on the market often fail to provide understandable and easy to use mobile-first interface for granular event sharing.

## Business Ethics Framework
Polysched aims to create a service that pays for itself without sacrificing the ethics of the business. The general outline for the ethical framework of PolySched is virtue based. The key virtues practiced in the business strategy of PolySched are:

 - **Anticapitalist** - Since minority oppresion is often tied to the capitalist class system, PolySched aims to practice mutual aid, and work against avarice and greed within and outside the company, particularly in the contexts of systemic oppresion of minorities in society. This means profit models developed by PolySched are designed to negatively affect the poor and underprivilaged as little as possible while still existing in the system of capitalism.
 - **LGBTQA+ Friendly** - Polysched's business practices should routinely be scrutinized by third parties to determine that it supports the queer community the best it can through inclusive app features and mutual aid.
 - **Accepting of all Relationship Structures** - Polysched is designed to be used by socially active individuals and small organizations. This happens to include a huge amount of polyamorous individuals who struggle to organize their lives with the tools that exist, as well as monogamous individuals with busy social lives.

## Tags, User-Tags, and Tag Subcriptions
PolySched provides flexible database interactions to users through the use of tags and user tags. Each event is owned by a single user-tag or tag, and depending on the owner's permission preferences other users may subscribe to a tag. Each event also contains an upscription list of tags and user-tags, allowing an event to show up under multiple tags provided the owner of the tag allows it.

## Database Structure
PolySched uses a noSQL database with three main collections:

    // USER COLLECTION
    { ...userHandle: { subscriptions: [...{ tagId, tag } ], } }

    // TAG COLLECTION
    { ...tag: [...eventId] }

    // EVENT COLLECTION
    { ...eventId:    
        { 
            time, 
            location, 
            backBlazeImgKey, 
            description,
            adPaid, 
            rootTag
        } 
    }

Event.adPaid is part of the monetization strategy for the app. 

## Monetization

PolySched needs to support itself and support worker-owner labor. The goal is to pay $5000 per month per worker-owner to labor costs (adjusting this amount to account for cost of living and future inflation), without sacrificing the ethical goals of the business. After other business costs such as advertising, taxes, and digital infrastructure costs are paid for, the remaining profits are put into a mutual aid fund for communities in need.

Events in polysched made under a public tag (instead of a user tag) can be viewed by anyone subscribed to the tag, and each public event be added to a browsable location based event feed for a small fee by any user.

To reach revenue of ~7000/mo with this monetization strategy would require ~1400 events published to the event feed per month (assuming the price to publish is $5.00). Polysched chooses the price based on what minorities can afford and does not allow 'boosting' of the event like other social media platforms do, because doing so would cater more towards large companies instead of small individuals. Catering to large companies, while more profitable, leads away from local community building and anticapitalist related virtues that PolySched outlines in it's Business Ethics Framework.