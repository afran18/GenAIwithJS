import styles from './Sidebar.module.css';
import {usePersona} from '../PersonaContext';

function Sidebar() {
    const {personas, selectedPersona, setSelectedPersona} = usePersona();

  return (
    <aside className={styles.sidebar}>
        {personas.map((p) => (
            <div key={p.id}
            className={`${styles.personaItem} ${selectedPersona?.id === p.id ? styles.active : ""}`}
            onClick= {() => setSelectedPersona(p)}>
                {p.name}
            </div>
        ))}
    </aside>
  )
}
export default Sidebar