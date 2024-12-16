import { useContext, createContext } from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = createContext({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    return value;
}

export function SessionProvider({ children }) {
    const [[isLoading, session], setSession] = useStorageState('session');
    
    return (
        <AuthContext.Provider
            value={{
                signIn: (session_id) => {
                    setSession(session_id);
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
