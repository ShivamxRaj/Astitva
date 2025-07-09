import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    let shootingStars = [];
    let time = 0;

    // Set canvas size
    const setCanvasSize = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Create stars
    const createStars = () => {
      stars = [];
      const numberOfStars = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          brightness: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    // Create shooting stars
    const createShootingStar = () => {
      if (Math.random() < 0.02) { // 2% chance each frame
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * 3 + 2,
          size: Math.random() * 2 + 1,
          life: 1,
          decay: Math.random() * 0.02 + 0.01
        });
      }
    };

    // Animate stars
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        // Twinkle effect
        star.twinkle += star.twinkleSpeed;
        const twinkleFactor = Math.sin(star.twinkle) * 0.3 + 0.7;
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * twinkleFactor})`;
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * twinkleFactor * 0.3})`;
        ctx.fill();

        // Move star down slowly
        star.y += star.speed;
        
        // Reset star position when it goes off screen (continuous loop)
        if (star.y > canvas.height + 10) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw shooting stars
      shootingStars.forEach((star, index) => {
        // Draw shooting star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`;
        ctx.fill();

        // Draw trail
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * 3, star.y - star.vy * 3);
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.life * 0.5})`;
        ctx.lineWidth = star.size * 0.5;
        ctx.stroke();

        // Update position
        star.x += star.vx;
        star.y += star.vy;
        star.life -= star.decay;

        // Remove dead shooting stars
        if (star.life <= 0 || star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
          shootingStars.splice(index, 1);
        }
      });

      // Create new shooting stars
      createShootingStar();

      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    setCanvasSize();
    createStars();
    animate();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      createStars();
      shootingStars = []; // Clear shooting stars on resize
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default StarryBackground; 