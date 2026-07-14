/**
 * Helper to optimize Unsplash URLs by forcing WebP format, quality, and resizing.
 */
export function optimizeUnsplashUrl(url: string, width?: number): string {
  if (!url || !url.includes('unsplash.com')) return url;
  
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('fm', 'webp');
    urlObj.searchParams.set('q', '80');
    if (width) {
      urlObj.searchParams.set('w', width.toString());
    }
    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * Processes a File to crop it to a specific aspect ratio (default 16:9),
 * resize it to a max width, and export it as an optimized WebP File.
 */
export async function processAndCropImage(
  file: File,
  targetAspectRatio = 16 / 9,
  maxWidth = 1200
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Failed to get canvas context'));

        const { width, height } = img;
        const imgAspect = width / height;

        let sx = 0, sy = 0, sWidth = width, sHeight = height;

        if (imgAspect > targetAspectRatio) {
          // Image is wider than target -> crop horizontally
          sWidth = height * targetAspectRatio;
          sx = (width - sWidth) / 2;
        } else if (imgAspect < targetAspectRatio) {
          // Image is taller than target -> crop vertically
          sHeight = width / targetAspectRatio;
          sy = (height - sHeight) / 2;
        }

        // Target canvas dimensions
        let dWidth = sWidth;
        let dHeight = sHeight;

        if (dWidth > maxWidth) {
          const ratio = maxWidth / dWidth;
          dWidth = maxWidth;
          dHeight = dHeight * ratio;
        }

        canvas.width = dWidth;
        canvas.height = dHeight;

        // Draw image onto canvas, cropping to source rect and scaling to dest rect
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Canvas to Blob failed'));
            // Create a new File from the blob
            const optimizedFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, "") + ".webp", // replace extension with .webp
              { type: 'image/webp' }
            );
            resolve(optimizedFile);
          },
          'image/webp',
          0.85 // quality 0 to 1
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
