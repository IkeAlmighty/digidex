# PolySched
A mobile first calendar web app for more granular event sharing.

PolySched uses a tag based system to make it easier to control who you share your calendar events with and what calendar events you subscribe to.

## Development Stack (MERN)
 - Mongodb
 - ExpressJS
 - React
 - NodeJS

## Target Audience
PolySched targets people with busy social lives who need to keep their schedules organized and share events in mass with particular groups of people so as to not overwhelm themselves and those who need to know about their schedule. These audiences include small businnesses, community organizers, individuals with large social networks, and individuals with multiple romantic partners. The app is mobile first because scheduling is often done on the fly from someone's mobile device, and not nessecarily from a traditional desktop computer. The calendar apps on the market often fail to provide understandble and easy to use mobile-first interface for granular event sharing.

## Tags, User-Tags, and Tag Subcriptions
PolySched provides flexible database interactions to users through the use of tags and user tags. Each event is owned by a single user-tag or tag, and depending on the owner's permission preferences other users may subscribe to a tag. Each event also contains an upscription list of tags and user-tags, allowing an event to show up under multiple tags provided the owner of the tag allows it.