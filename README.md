# DigiDex (Digital Rolodex)

## >[link to web application](https://digidex-auiu.onrender.com)<

## Concept

Digidex is a "digital [rolodex](https://en.wikipedia.org/wiki/Rolodex)", essentially a _Contacts_ application. The idea is to add to the basic functionality of a modern contacts app to help users organize and keep track of a large number of people. The ultimate hope is that the app might enable users to exceed [Dunbar's Number](https://en.wikipedia.org/wiki/Dunbar%27s_number) through in app reminders that utilize [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) combined with [chunking](<https://en.wikipedia.org/wiki/Chunking_(psychology)>) via tags and other associations.

## Tech Stack

Digidex is a Progressive Web App built on:

- Vite + React (Frontend)
- ExpressJS (backend)
- Mongodb (database)

So, the MERN stack.

## Local Installation

You can install Digidex locally by cloning the [public repository](https://github.com/IkeAlmighty/digidex) to yor machine and following these steps:

1. Copy server/.env.EXAMPLE to server/.env
2. Fill in a `JWT_SECRET` in your newly created .env file.
3. Either install MongoDB locally or update the `MONGODB_URI` connection string in .env to reflect your deployment on the cloud (you can leave the connection string blank if you have a local install).
4. For the moment, there is no completed stripe integration, so `STRIPE_SECRET_KEY` can be ignored.
5. Run `npm i` on the root directory to install the client and server depedencies.
6. Run `npm run seed` to create a test user.
7. Run `npm run dev` to run the dev server.

## Development Roadmap

At the moment, the app needs work to even be up to par with native Contact apps on IOS or Android. The following features are on the horizon:

- Extra encryption of user data in the database (beyond password hashes that are already implemented)
- Address fields per Contact and weather data displayed next to their Contact Card.
- Pinned contacts
- "Daily Contact" card that is shown at the top of the contact list based on how recently the contact was added, how often they are edited, and the last time it was featured.
- A more robust search feature that can filter by tags, weather, or any other field.
- A "knows eachother" connection feature that allows users to track which contacts know one another.
- toast notifications that suggest connecting contacts to corresponding users in app whenever a user creates a new account.
