import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const PersonaContext = createContext();

export const PersonaProvider = ({ children }) => {
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const res = await axios.get("http://localhost:3000/chat/personas");

        setPersonas(res.data);
        if (res.data.length > 0) {
          setSelectedPersona(res.data[0]);
        }
      } catch (error) {
        console.error("Error fetching personas:", error);
      }
    };
    fetchPersonas();
  }, []);

  return (
    <PersonaContext.Provider
      value={{ personas, selectedPersona, setSelectedPersona }}
    >
      {children}
    </PersonaContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const usePersona = () => useContext(PersonaContext);
