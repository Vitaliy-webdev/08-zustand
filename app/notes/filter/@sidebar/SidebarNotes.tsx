"use client";
import { useRouter } from "next/navigation";
import type { NoteTag } from "@/types/note";
import css from "./SidebarNotes.module.css";

interface SidebarNotesProps {
  tags: NoteTag[];
}

export default function SidebarNotes({ tags }: SidebarNotesProps) {
  const router = useRouter();

  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <button
            className={css.menuLink}
            onClick={() => router.push(`/notes/filter/${tag}`)}
          >
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
}
