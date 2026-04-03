import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Test sans authentification
function TestApp() {
  return (
    <div style={{ padding: '2rem', background: 'blue', color: 'white' }}>
      <h1>Test React</h1>
      <p>Si vous voyez ceci, React fonctionne !</p>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TestApp />
  </StrictMode>,
)
