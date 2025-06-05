import { useState, useEffect } from "react";

const LoadingCircles = ({ color = "#3B82F6" }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`rounded-full transition-all duration-500 ease-in-out transform ${
              active === idx
                ? "w-5 h-5 opacity-100 translate-y-0 scale-110"
                : "w-3.5 h-3.5 opacity-50 translate-y-2 scale-100"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-600">Cargando...</p>
    </div>
  );
};

export default LoadingCircles;
