// context/AppContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Profile, Message, Thread } from '@/api/requests';

export const USER_ID = 1; // Hardcoded user ID for now

interface AppContextType {
  profile: Profile | null;
  feed: Message[] | null;
  thread: Thread | null;
  setProfile: (profile: Profile | null) => void;
  setFeed: (feed: Message[] | null) => void;
  setThread: (thread: Thread | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [feed, setFeed] = useState<Message[] | null>(null);
  const [thread, setThread] = useState<Thread | null>(null);

  return (
    <AppContext.Provider
      value={{
        profile,
        feed,
        thread,
        setProfile,
        setFeed,
        setThread,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}