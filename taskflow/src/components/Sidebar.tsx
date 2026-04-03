import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import styles from './Sidebar.module.css';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRename?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

function Sidebar({ projects, isOpen, onRename, onDelete }: SidebarProps) {
  console.log('Sidebar re-render');
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map(p => (
          <li key={p.id}>
            <NavLink
              to={`/projects/${p.id}`}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ''}` 
              }
            >
              <span className={styles.dot} style={{ background: p.color }} />
              {p.name}
            </NavLink>
            {onRename && (
              <button 
                onClick={() => onRename(p)} 
                className={styles.actionBtn}
                title="Renommer"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button 
                onClick={() => onDelete(p.id)} 
                className={styles.actionBtn}
                title="Supprimer"
              >
                🗑️
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default memo(Sidebar);
