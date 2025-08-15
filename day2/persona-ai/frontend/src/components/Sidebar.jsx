import styles from './Sidebar.module.css';
import { usePersona } from '../PersonaContext';

function Sidebar() {
  const { personas, selectedPersona, setSelectedPersona } = usePersona();

  return (
    <aside className={styles.sidebar}>
      {personas.map((p) => (
        <div
          key={p.id}
          className={`${styles.personaItem} ${selectedPersona?.id === p.id ? styles.active : ""}`}
          onClick={() => setSelectedPersona(p)}
        >
          
          <img src={p.img} alt={p.name} className={styles.personaImage} />
          
          <div className={styles.personaInfo}>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
