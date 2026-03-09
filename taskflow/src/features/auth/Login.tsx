import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
          Connexion TaskFlow
        </h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            required
          />
        </div>

        {state.error && (
          <div style={{
            background: '#ffeef0',
            color: '#d32f2f',
            padding: '0.75rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={state.loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: state.loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: state.loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {state.loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <div style={{ 
          marginTop: '1rem', 
          fontSize: '0.85rem', 
          color: '#666', 
          textAlign: 'center' 
        }}>
          <p>Utilisez : admin@taskflow.com / admin123</p>
        </div>
      </form>
    </div>
  );
}
