import { fetchAllNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const Notes = async () => {
  await fetchAllNotes(1);

  return <NotesClient />;
};

export default Notes;
