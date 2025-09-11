import axios from "axios";
import type { Note, BaseNoteParams } from "@/types/note.ts";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface fetchAllNotesResponse {
  totalPages: number;
  notes: Note[];
}

export const fetchAllNotes = async (
  page: number,
  query = ""
): Promise<fetchAllNotesResponse> => {
  const res = await axios.get<fetchAllNotesResponse>(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      search: query,
      page,
      perPage: 12,
    },
  });
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await axios.get<Note>(`${BASE_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
};

export const createNote = async (newNote: BaseNoteParams): Promise<Note> => {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, newNote, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
};
