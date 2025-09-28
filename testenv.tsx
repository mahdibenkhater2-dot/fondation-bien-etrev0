import { useEffect } from "react";

const TestEnv = () => {
  useEffect(() => {
    console.log("VITE_EMAILJS_USER_ID:", import.meta.env.VITE_EMAILJS_USER_ID);
    console.log("VITE_EMAILJS_SERVICE_ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log("VITE_EMAILJS_TEMPLATE_ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
  }, []);

  return <div>Vérifie la console pour voir si les variables d'environnement sont chargées</div>;
};

export default TestEnv;
