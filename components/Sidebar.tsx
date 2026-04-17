// components/Sidebar.tsx
// 'use client';

import { useState } from 'react';
import SearchHistory from './SearchHistory';
import HistoryList from './HistoryList';
import AccountMenu from './Accountmenu';
import { ChatSession } from '@/lib/storage';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
}

export default function Sidebar({
  isOpen,
  onToggle,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.messages.some(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    );
  }

  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header with new chat button */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
        <button
          onClick={onNewChat}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button onClick={onToggle} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Search history */}
      <div className="p-3">
        <SearchHistory value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Scrollable history list */}
      <div className="flex-1 overflow-y-auto">
        <HistoryList
          sessions={filteredSessions}
          currentSessionId={currentSessionId}
          onSelect={onSelectSession}
          onDelete={onDeleteSession}
        />
      </div>

      {/* Account menu at bottom */}
      <div className="border-t border-gray-200 p-3">
        <AccountMenu />
      </div>
    </aside>
  );
}