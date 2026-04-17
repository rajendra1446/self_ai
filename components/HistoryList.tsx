// components/HistoryList.tsx
'use client';

import { ChatSession } from '@/lib/storage';

interface HistoryListProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HistoryList({
  sessions,
  currentSessionId,
  onSelect,
  onDelete,
}: HistoryListProps) {
  return (
    <ul className="space-y-1 p-2">
      {sessions.map((session) => (
        <li key={session.id} className="group relative">
          <button
            onClick={() => onSelect(session.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
              currentSessionId === session.id
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="truncate">{session.title}</div>
            <div className="text-xs text-gray-400 mt-0.5">
              {new Date(session.updatedAt).toLocaleDateString()}
            </div>
          </button>
          <button
            onClick={() => onDelete(session.id)}
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </li>
      ))}
      {sessions.length === 0 && (
        <li className="text-center text-gray-400 text-sm py-8">No chats yet</li>
      )}
    </ul>
  );
}