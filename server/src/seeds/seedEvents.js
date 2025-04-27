import { findMinutesFrom } from "../client/src/utils/dates.js";

const now = new Date();

export default [
  {
    startTime: findMinutesFrom(now, 30),
    endTime: findMinutesFrom(now, 60),
    tags: ["ike/polycule", "ike/friends"],
    title: "Queer Coffee",
    description: "Come drink coffee with queer people :)",
    location: "5555 E Queerland Ln",
  },
  {
    startTime: findMinutesFrom(now, 90),
    endTime: findMinutesFrom(now, 150),
    tags: ["ike/work", "ike/friends"],
    title: "Co-Working Sesh",
    description:
      "Bring your laptop and vibes. Quiet-ish space to work together.",
    location: "1234 Productivity Blvd",
  },
  {
    startTime: findMinutesFrom(now, 180),
    endTime: findMinutesFrom(now, 240),
    tags: ["ike/polycule"],
    title: "Dinner with the Polycule",
    description: "Potluck dinner and cozy chats. Bring something to share!",
    location: "6789 Love Loop",
  },
  {
    startTime: findMinutesFrom(now, 300),
    endTime: findMinutesFrom(now, 360),
    tags: ["ike/community"],
    title: "Mutual Aid Planning",
    description: "Let's organize support for our neighbors. Everyone welcome!",
    location: "101 Solidarity Circle",
  },
  {
    startTime: findMinutesFrom(now, 420),
    endTime: findMinutesFrom(now, 480),
    tags: ["ike/friends", "ike/hobby"],
    title: "Zine-Making Hangout",
    description: "Cut, paste, draw, collage—make zines with pals!",
    location: "444 DIY Alley",
  },
  {
    startTime: findMinutesFrom(now, 540),
    endTime: findMinutesFrom(now, 600),
    tags: ["ike/queer", "ike/reading"],
    title: "Queer Book Club",
    description: "This month's read: *Stone Butch Blues*. Come discuss!",
    location: "789 Rad Reader St",
  },
  {
    startTime: findMinutesFrom(now, 630),
    endTime: findMinutesFrom(now, 690),
    tags: ["ike/friends", "ike/movies"],
    title: "Movie Night: Gay & Campy Edition",
    description: "We’re watching *But I'm a Cheerleader*. Popcorn provided!",
    location: "333 Camp Cinema Ln",
  },
];
