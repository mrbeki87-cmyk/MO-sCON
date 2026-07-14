import { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { Skeleton } from './Skeleton';
import { optimizeUnsplashUrl } from '../../lib/image';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  width?: number | string;
  height?: number | string;
}

export function LazyImage({ src, alt, className, containerClassName, ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)} ref={containerRef}>
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}
      {isInView && (
        <img
          src={optimizeUnsplashUrl(src as string, 800)}
          alt={alt}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          width={props.width}
          height={props.height}
          {...props}
        />
      )}
    </div>
  );
}
