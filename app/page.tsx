// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import { ChatSession, loadSessions, saveSessions } from '@/lib/storage';

export default function Dashboard() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load saved sessions from localStorage on mount
  useEffect(() => {
    const loaded = loadSessions();
    setSessions(loaded);
    if (loaded.length > 0) {
      setCurrentSessionId(loaded[0].id);
    } else {
      createNewChat();
    }
  }, []);

  // Persist sessions whenever they change
  useEffect(() => {
    if (sessions.length) saveSessions(sessions);
  }, [sessions]);

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New chat',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const updateCurrentSession = (messages: any[]) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === currentSessionId
          ? {
              ...session,
              messages,
              title: messages.length
                ? messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '…' : '')
                : 'New chat',
              updatedAt: new Date().toISOString(),
            }
          : session
      )
    );
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id && sessions.length > 1) {
      setCurrentSessionId(sessions[0].id === id ? sessions[1]?.id : sessions[0].id);
    } else if (sessions.length === 1) {
      createNewChat();
    }
  };

  const currentSession = sessions.find(s => s.id === currentSessionId);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={setCurrentSessionId}
        onNewChat={createNewChat}
        onDeleteSession={deleteSession}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatArea
          session={currentSession}
          onUpdateMessages={updateCurrentSession}
        />
      </main>
    </div>
  );
}