"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  id: string;
  onClose?: () => void;
}

export default function NotePreviewClient({
  id,
  onClose,
}: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = onClose ?? (() => router.back());

  if (isLoading)
    return (
      <Modal onClose={handleClose}>
        <div>Loading...</div>
      </Modal>
    );

  if (isError || !note)
    return (
      <Modal onClose={handleClose}>
        <div>Error loading note</div>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
          <button className={css.backBtn} onClick={handleClose}>
            ← Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
