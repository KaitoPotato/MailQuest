export type Theme = "fantasy" | "cyberpunk" | "office-horror";

export type DemoMessage = {
  id: string;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  receivedLabel: string;
  dueLabel: string;
  taskTitle: string;
  action: string;
  difficulty: number;
  color: string;
};

export type DemoEvent = {
  id: string;
  title: string;
  time: string;
};

export type QuestTask = {
  id: string;
  title: string;
  sourceId: string;
  sourceSubject: string;
  dueLabel: string;
  action: string;
  difficulty: number;
  status: "unstarted";
};

export type QuestPreview = {
  title: string;
  bossName: string;
  bossDescription: string;
  theme: Theme;
  totalHp: number;
  tasks: QuestTask[];
  calendarIncluded: boolean;
};

