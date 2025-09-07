"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "../Modal/Modal";
import css from "./NotePreview.module.css";

type Props = {
  id: string;
  onClose: () => void;
};

export default function NotePreview({ id, onClose }: Props) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <Modal onClose={onClose}>
        <p>Loading...</p>
      </Modal>
    );
  if (isError || !note)
    return (
      <Modal onClose={onClose}>
        <p>Error loading note</p>
      </Modal>
    );

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}
