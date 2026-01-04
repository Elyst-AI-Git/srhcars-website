import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  thumbnailSrc?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'video' | 'square' | 'auto';
  priority?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  thumbnailSrc,
  className,
  containerClassName,
  aspectRatio = 'video',
  priority = false,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    // If priority, load immediately; otherwise use intersection observer
    if (priority) {
      loadImage();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadImage();
            observer.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [src, thumbnailSrc, priority]);

  const loadImage = () => {
    // Start with thumbnail if available
    if (thumbnailSrc && thumbnailSrc !== src) {
      setCurrentSrc(thumbnailSrc);
      // Then load full image
      const fullImg = new Image();
      fullImg.onload = () => {
        setCurrentSrc(src);
        setIsLoading(false);
      };
      fullImg.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
      fullImg.src = src;
    } else {
      // Load full image directly
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
      img.src = src;
    }
  };

  const aspectRatioClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    auto: '',
  }[aspectRatio];

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-muted/20',
        aspectRatioClass,
        containerClassName
      )}
    >
      {/* Skeleton placeholder */}
      {isLoading && !currentSrc && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {/* Image with fade-in effect */}
      {currentSrc && !hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-70 blur-sm' : 'opacity-100 blur-0',
            className
          )}
          onLoad={() => setIsLoading(false)}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
