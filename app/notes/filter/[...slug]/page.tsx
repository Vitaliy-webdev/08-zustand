import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import type { Note } from "@/types/note";

interface Props {
  params: { slug: string[]; id: string };
}

export async function generateMetadata({ params }: Props) {
  const { id } = params;

  const res = await fetch(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    return {
      title: "Note not found",
      description: "",
    };
  }

  const note = (await res.json()) as Note;

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://notehub.com/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.content.slice(0, 30),
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[]; id: string }>;
}) {
  const { slug } = await params;
  const tag = slug?.[0] || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
        tag: tag && tag !== "All" ? tag : undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
