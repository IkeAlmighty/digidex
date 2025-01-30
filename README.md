# PolySched  
*A mobile-first calendar web app for more granular event sharing*  

PolySched is designed for individuals and organizations that need precise control over event sharing. Using a tag-based system, it allows users to selectively share events and subscribe to relevant calendars without unnecessary clutter.  

## 🔧 Tech Stack (MERN)  
- **MongoDB** – NoSQL database for flexible data storage  
- **Express.js** – Backend API framework  
- **React** – Interactive front-end for a seamless experience  
- **Node.js** – Scalable server-side runtime  

## 🎯 Who Is It For?  
PolySched is built for people with active social lives and complex scheduling needs. It’s especially useful for:  
- **Small businesses** coordinating staff and events  
- **Community organizers** managing gatherings and meetings  
- **Socially active individuals** juggling multiple commitments  
- **Polyamorous individuals** organizing relationships and meetups  

Unlike traditional calendar apps, PolySched prioritizes **granular sharing** and a **mobile-first** experience, recognizing that scheduling often happens on the go.  

## 💡 Key Features  
- **Tag-Based Event Sharing** – Share events with specific groups using customizable user-owned tags  
- **Granular Permissions** – Control who can view, join, or interact with events  
- **Mobile-First Design** – Optimized for ease of use on smartphones  
- **Location-Based Discovery** – Browse public events near you  

## 🏛 Ethical Business Model  
PolySched operates with a **virtue-based ethics framework**, centered around **community support** and **social responsibility**:  

- **📢 Anti-Capitalist Approach** – Prioritizing mutual aid over profit, with pricing models designed to minimize harm to marginalized communities.  
- **🏳️‍🌈 Queer & Inclusive** – Actively supporting LGBTQIA+ users through inclusive features and third-party audits.  
- **❤️ Relationship-Agnostic** – Designed for both polyamorous and monogamous users who need effective scheduling tools.  

## 🏷 Tags & Subscriptions  
PolySched organizes events through a **tagging system**, allowing flexible calendar interactions:  
- **User-Owned Tags** – Users create and manage tags (e.g., `@alex/work` or `@jamie/friends`).  
- **Tag Subscriptions** – Users follow tags to stay updated on relevant events.  
- **Public Tags** - Tags that don't belong to an `@<user>` are public, anyone can subscribe to them, and they can be added a location based event feed as part of the monetization strategy for the app.

### 🗄 Database Structure  
PolySched uses a **NoSQL** database with three main collections:  

```js
// USER COLLECTION  
{ "userHandle": { "subscriptions": [...tagId] } }

// TAG COLLECTION  
{ "tagId": { "events": [...eventId] } }

// EVENT COLLECTION  
{ "eventId": { 
    "time": "datetime",  
    "location": "string",  
    "imageKey": "string",  
    "description": "string",  
    "adPaid": "boolean",  
    "rootTag": "string"  
  } 
}
```

`adPaid` is part of the **monetization strategy** (see below).  

## 💰 Monetization Strategy  
PolySched aims to sustain itself while maintaining ethical business practices. The goal is to pay worker-owners a **fair wage ($5,000/month per worker, adjusted for cost of living)** while funding community aid initiatives.  

### How We Generate Revenue  
- **Paid Public Events** – Events posted under public tags can be featured in a location-based event feed for a **small one-time fee**.  
- **No "Boosting"** – Unlike social media platforms that favor large corporations, PolySched ensures visibility is **equal for all**, prioritizing accessibility for small businesses and individuals.  

### 📊 Example Revenue Model  
- **$5 per event listing** in the public event feed  
- **1,400 events per month** → **$7,000 revenue** (covering costs + community aid)  

By avoiding exploitative advertising and **keeping costs fair for marginalized users**, PolySched stays aligned with its ethical mission.  
