import { useEffect, useRef } from 'react';
import './Aurora.css';

const Aurora = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Aurora colors
    const colors = [
      { r: 45, g: 212, b: 191 },   // rgb(45, 212, 191) - Teal
      { r: 37, g: 99, b: 235 },    // rgb(37, 99, 235) - Blue
      { r: 29, g: 78, b: 216 },    // rgb(29, 78, 216) - Dark Blue
    ];

    // Create multiple aurora layers
    const auroraLayers = [
      { speed: 0.0005, scale: 1.5, opacity: 0.3, colorIndex: 0 },
      { speed: 0.0003, scale: 2, opacity: 0.2, colorIndex: 1 },
      { speed: 0.0007, scale: 1.2, opacity: 0.25, colorIndex: 2 },
    ];

    const animate = () => {
      time += 1;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each aurora layer
      auroraLayers.forEach((layer, index) => {
        const color = colors[layer.colorIndex];
        
        // Create gradient
        const gradient = ctx.createRadialGradient(
          canvas.width / 2 + Math.sin(time * layer.speed) * 200,
          canvas.height / 2 + Math.cos(time * layer.speed * 0.7) * 150,
          0,
          canvas.width / 2 + Math.sin(time * layer.speed) * 200,
          canvas.height / 2 + Math.cos(time * layer.speed * 0.7) * 150,
          canvas.width * layer.scale
        );

        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${layer.opacity})`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${layer.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Add some moving blobs
      for (let i = 0; i < 3; i++) {
        const color = colors[i];
        const x = canvas.width / 2 + Math.sin(time * 0.0003 + i * 2) * canvas.width * 0.3;
        const y = canvas.height / 2 + Math.cos(time * 0.0004 + i * 2) * canvas.height * 0.3;
        const radius = 150 + Math.sin(time * 0.001 + i) * 50;

        const blobGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        blobGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.15)`);
        blobGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = blobGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="aurora-container">
      <canvas ref={canvasRef} className="aurora-canvas" />
      <div className="aurora-overlay" />
    </div>
  );
};

export default Aurora;