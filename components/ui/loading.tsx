import { useState, useEffect } from "react";

const LoadingCircles = ({ color = "#3B82F6" }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    },300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`rounded-full transition-all duration-100 ease-in-out transform ${
              active === idx
                ? "w-4 h-4 opacity-100 translate-y-0"
                : "w-3 h-3 opacity-50 translate-y-2"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-600">Cargando datos...</p>
    </div>
  );
};

export default LoadingCircles;
