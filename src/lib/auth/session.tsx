"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { getSupabaseBrowserClient, hasSupabaseEnv } from "@/src/lib/supabase/client";

type SessionState = {
  isConfigured: boolean;
  isLoading: boolean;
  session: Session | null;
  user: User | null;
};

const SessionContext = createContext<SessionState>({
  isConfigured: false,
  isLoading: false,
  session: null,
  user: null,
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>({
    isConfigured: hasSupabaseEnv(),
    isLoading: hasSupabaseEnv(),
    session: null,
    user: null,
  });

  useEffect(() => {
    if (!hasSupabaseEnv()) return;

    const supabase = getSupabaseBrowserClient();
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setState({
        isConfigured: true,
        isLoading: false,
        session: data.session,
        user: data.session?.user ?? null,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        isConfigured: true,
        isLoading: false,
        session,
        user: session?.user ?? null,
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSessionState() {
  return useContext(SessionContext);
}
