import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, AuthAction, User } from '../../types/auth';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, user: null, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simuler un appel API - dans un vrai projet, ce serait un fetch/axios
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Vérifications hardcodées comme demandé dans le TP
      if (email === 'admin@taskflow.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          name: 'Admin',
          email: 'admin@taskflow.com',
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Email ou mot de passe incorrect' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur de connexion' });
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login }}>
      {children}
    </AuthContext.Provider>
  );
}
