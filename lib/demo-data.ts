import type { DemoEvent, DemoMessage } from "./types";

export const demoMessages: DemoMessage[] = [
  {
    id: "pitch-deck",
    sender: "Maya Chen",
    initials: "MC",
    subject: "Pitch deck for Friday",
    preview: "Could you send the final deck before Friday's review? I can give it one last pass.",
    receivedLabel: "9:41 AM",
    dueLabel: "Friday, 5 PM",
    taskTitle: "Prepare and reply with the pitch deck",
    action: "Draft a reply",
    difficulty: 4,
    color: "violet",
  },
  {
    id: "demo-sync",
    sender: "Owen Patel",
    initials: "OP",
    subject: "Quick demo sync?",
    preview: "Can we find 30 minutes this week to run through the demo together?",
    receivedLabel: "Yesterday",
    dueLabel: "This week",
    taskTitle: "Find a 30-minute meeting slot",
    action: "Check calendar",
    difficulty: 3,
    color: "coral",
  },
  {
    id: "team-details",
    sender: "Hackathon Team",
    initials: "HT",
    subject: "Confirm your team details",
    preview: "Please confirm your team name and members before registration closes.",
    receivedLabel: "Yesterday",
    dueLabel: "Tomorrow, noon",
    taskTitle: "Confirm team registration details",
    action: "Draft a reply",
    difficulty: 5,
    color: "gold",
  },
  {
    id: "coffee-chat",
    sender: "Nina Wells",
    initials: "NW",
    subject: "Coffee next week",
    preview: "It was great meeting you! Would you be free for a catch-up sometime next week?",
    receivedLabel: "Tuesday",
    dueLabel: "Next week",
    taskTitle: "Suggest a time for coffee",
    action: "Check calendar",
    difficulty: 2,
    color: "mint",
  },
];

export const demoEvents: DemoEvent[] = [
  { id: "standup", title: "Team stand-up", time: "Wed · 10:00–10:30" },
  { id: "review", title: "Pitch review", time: "Fri · 17:00–17:30" },
];

