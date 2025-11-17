"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  });
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        setState((prev) => ({
          ...prev,
          user: session?.user ?? null,
          session,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: (error as Error).message,
          isLoading: false,
        }));
      }
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({
        ...prev,
        user: session?.user ?? null,
        session,
        isLoading: false,
      }));
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: (error as Error).message,
          isLoading: false,
        }));
        throw error;
      }
    },
    [router, supabase.auth]
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string, fullName?: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: (error as Error).message,
          isLoading: false,
        }));
        throw error;
      }
    },
    [supabase.auth]
  );

  const signInWithOAuth = useCallback(
    async (provider: "google" | "github" | "azure") => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/api/auth/callback`,
          },
        });
        if (error) throw error;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: (error as Error).message,
          isLoading: false,
        }));
        throw error;
      }
    },
    [supabase.auth]
  );

  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: (error as Error).message,
        isLoading: false,
      }));
      throw error;
    }
  }, [router, supabase.auth]);

  const resetPassword = useCallback(
    async (email: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: (error as Error).message,
          isLoading: false,
        }));
        throw error;
      }
    },
    [supabase.auth]
  );

  const updatePassword = useCallback(
    async (password: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: (error as Error).message,
          isLoading: false,
        }));
        throw error;
      }
    },
    [supabase.auth]
  );

  return {
    user: state.user,
    session: state.session,
    isLoading: state.isLoading,
    isAuthenticated: !!state.user,
    error: state.error,
    signInWithEmail,
    signUpWithEmail,
    signInWithOAuth,
    signOut,
    resetPassword,
    updatePassword,
  };
}
