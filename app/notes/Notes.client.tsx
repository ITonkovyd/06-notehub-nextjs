"use client"

import React, { useCallback } from 'react'

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast, Toaster } from 'react-hot-toast';
import { useDebounce } from "use-debounce";

import { fetchAllNotes } from "@/lib/api";
import css from "./Notes.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

const NotesClient = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(searchQuery, 1000);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["notes", page, debouncedQuery],
    queryFn: () => fetchAllNotes(page, debouncedQuery),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isError && data?.notes.length === 0) {
      toast.error("No notes found");
    }
  }, [isError, data]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pagesCount={data.totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      <main>{isSuccess && <NoteList notes={data.notes} />}</main>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <Toaster />
    </div>
  )
}

export default NotesClient;