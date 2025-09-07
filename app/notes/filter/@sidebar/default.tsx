import SidebarNotes from "./SidebarNotes";
import type { NoteTag } from "@/types/note";

const allTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function DefaultSidebar() {
  return <SidebarNotes tags={allTags} />;
}
