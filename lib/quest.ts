import { demoMessages } from "./demo-data";
import type { QuestPreview, Theme } from "./types";

const themes: Record<Theme, { title: string; boss: string; description: string }> = {
  fantasy: {
    title: "The Siege of Friday",
    boss: "The Deadline Dragon",
    description: "A fire-breathing backlog guards the path to your weekend.",
  },
  cyberpunk: {
    title: "Inbox: System Override",
    boss: "The Overload Protocol",
    description: "Break through the signal noise before the clock hits zero.",
  },
  "office-horror": {
    title: "The Meeting That Never Ends",
    boss: "The Calendar Phantom",
    description: "Something is haunting your unread messages.",
  },
};

export function createQuestPreview(
  selectedIds: string[],
  theme: Theme,
  calendarIncluded: boolean,
): QuestPreview {
  const selected = demoMessages.filter((message) => selectedIds.includes(message.id));
  if (selected.length === 0) {
    throw new Error("Select at least one message to create a quest.");
  }

  const details = themes[theme];
  const tasks = selected.map((message) => ({
    id: `task-${message.id}`,
    title: message.taskTitle,
    sourceId: message.id,
    sourceSubject: message.subject,
    dueLabel: message.dueLabel,
    action: message.action,
    difficulty: message.difficulty,
    status: "unstarted" as const,
  }));

  return {
    title: details.title,
    bossName: details.boss,
    bossDescription: details.description,
    theme,
    totalHp: tasks.reduce((sum, task) => sum + task.difficulty * 10, 0),
    tasks,
    calendarIncluded,
  };
}

