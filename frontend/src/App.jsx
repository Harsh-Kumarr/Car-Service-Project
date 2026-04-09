import { useEffect, useState } from "react";
import Lenis from "lenis";
import Loader from "./components/common/Loader";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 LOADER TIMER
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // 🔥 LENIS INIT
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && <AppRoutes />}
    </>
  );
}

export default App;