import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  variant?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}

/* IntersectionObserver-driven reveal — fades/slides content in when it enters the viewport */
export default function Reveal({ children, variant = 'up', delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass = variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : variant === 'scale' ? 'reveal-scale' : 'reveal';

  return (
    <div
      ref={ref}
      className={`${variantClass} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
