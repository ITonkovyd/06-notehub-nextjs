export type noteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type BaseNoteParams = {
  title: string;
  content: string;
  tag: noteTag;
  createdAt: string;
  updatedAt: string;
};

export type Note = BaseNoteParams & {
  id: string;
};