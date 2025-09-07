"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./TagsMenu.module.css";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClick = (tag: string) => {
    router.push(`/notes/filter/${tag}`);
    setOpen(false);
  };

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        Notes
      </button>
      {open && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <a className={css.menuLink} onClick={() => handleClick(tag)}>
                {tag}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
