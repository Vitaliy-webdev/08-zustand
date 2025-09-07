import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  notes: Note[];
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data }: AxiosResponse<FetchNotesResponse> = await api.get("", {
    params,
  });
  return data;
};

export const createNote = async (
  noteData: CreateNoteParams
): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await api.post("", noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await api.delete(`/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await api.get(`/${id}`);
  return data;
};
