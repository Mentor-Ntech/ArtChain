import React, { useEffect, useRef } from 'react';

const skills = [
  { text: 'JavaScript', size: 11, color: 'pink' },
  { text: 'Canvas', size: 8, color: 'yellow' },
  { text: 'Vue.js', size: 15, color: 'chartreuse' },
  { text: 'Illustration', size: 17, color: 'orange' },
  { text: 'UI & UX', size: 16, color: 'red' },
  { text: 'Animation', size: 16, color: 'deeppink' },
];

const colors = ['#FFC900', '#29A4E8', '#FF4100', '#1CE840', '#DD0DFF'];

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const mouse = useRef({ x: undefined, y: undefined, wheel: undefined }).current;
  const circleArray = useRef([]).current;
  let angle = 0;
  let velocity = 0.0025;
  const totalCircle = 250;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = imageRef.current;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const getRandomRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    class Circle {
      constructor(x, y, radius, color, blurSize, text) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.blurSize = blurSize;
        this.rad = Math.random() * Math.PI * 2;
        this.velocity = velocity;
        this.distanceCenter = getRandomRange(50, window.innerWidth / 8);
        this.lastMouse = { x: x, y: y };
        this.opacity = Math.abs(((Math.random() * 100) / 10 - 1).toFixed(0) + '0');
        if (text) {
          this.text = text;
        }
      }

      update() {
        let lastPoint = {
          x: this.x,
          y: this.y,
        };
        this.rad += this.velocity;

        if (mouse.x) {
          this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
          this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
          this.x = this.lastMouse.x + Math.cos(this.rad) * (this.distanceCenter * 5);
          this.y = this.lastMouse.y + Math.sin(this.rad) * (this.distanceCenter + angle * 5);
        } else {
          this.x = this.lastMouse.x + Math.cos(this.rad) * (this.distanceCenter * 5);
          this.y = this.lastMouse.y + Math.sin(this.rad) * (this.distanceCenter + angle * 5);
        }

        image.style.setProperty('--dx', `${this.lastMouse.x}px`);
        image.style.setProperty('--dy', `${this.lastMouse.y - 48}px`);

        this.drawCircle(lastPoint);
      }

      drawCircle(lastPoint) {
        ctx.beginPath();
        ctx.shadowBlur = this.blurSize;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.setup();
      }

      setup() {
        if (this.text) {
          ctx.fillStyle = this.color;
        } else {
          if (this.opacity <= 10) {
            ctx.fillStyle = this.color + `${this.opacity}`;
          } else {
            ctx.fillStyle = this.color;
          }
        }
        ctx.fill();
        ctx.closePath();
        if (this.text) {
          ctx.font = `${this.text.size}px Arial`;
          ctx.fillStyle = this.text.color;
          ctx.fillText(this.text.text, this.x, this.y);
        }
      }
    }

    const createCircle = () => {
      circleArray.length = 0;
      for (let i = 0; i < totalCircle; i++) {
        const blurSize = Math.abs(Math.random() - 0.8) * 25;
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        const radius = Math.abs(Math.random() - 0.8) * 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        circleArray.push(new Circle(x, y, radius, color, blurSize));
      }
    };

    const createCircleText = (text) => {
      const blurSize = Math.abs(Math.random() - 0.8) * 25;
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      const radius = Math.abs(Math.random() - 0.8) * 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      circleArray.push(new Circle(x, y, text.size, color, blurSize, text));
    };

    const init = () => {
      createCircle();
      skills.forEach(skill => createCircleText(skill));
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      circleArray.forEach(circle => circle.update());
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = undefined;
      mouse.y = undefined;
      velocity = 0.0025;
    };

    const onMouseWheel = (e) => {
      const y = e.deltaY;
      mouse.wheel = y < 0 ? 'up' : 'down';
      angle += mouse.wheel === 'up' ? -15 : 15;
      setTimeout(() => (mouse.wheel = undefined), 0);
    };

    const onTouchMove = (e) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('wheel', onMouseWheel);
    document.addEventListener('touchmove', onTouchMove);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('wheel', onMouseWheel);
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="animated-canvas"></canvas>
      <img
        ref={imageRef}
        src="https://s.cdpn.io/profiles/user/1844768/80.jpg?1547398190"
        alt=""
        className="animated-image"
      />
      <style jsx>{`
        .animated-canvas {
          background: transparent;
          cursor: grabbing;
          filter: contrast(1.5);
        }

        .animated-image {
          width: 48px;
          height: 48px;
          position: absolute;
          z-index: 2;
          display: block;
          left: 0;
          top: 0;
          transform: translate(var(--dx), var(--dy));
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default CanvasAnimation;
