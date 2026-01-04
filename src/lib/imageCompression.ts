import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
  useWebWorker?: boolean;
  fileType?: string;
}

const FULL_SIZE_OPTIONS: CompressionOptions = {
  maxSizeMB: 0.5, // 500KB
  maxWidthOrHeight: 1200,
  useWebWorker: true,
  fileType: 'image/webp',
};

const THUMBNAIL_OPTIONS: CompressionOptions = {
  maxSizeMB: 0.1, // 100KB
  maxWidthOrHeight: 400,
  useWebWorker: true,
  fileType: 'image/webp',
};

/**
 * Check if the browser supports WebP format
 */
export const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
};

/**
 * Compress an image file with the specified options
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = FULL_SIZE_OPTIONS
): Promise<File> => {
  try {
    // Use WebP if supported, otherwise fallback to JPEG
    const fileType = supportsWebP() ? 'image/webp' : 'image/jpeg';
    
    const compressionOptions = {
      maxSizeMB: options.maxSizeMB || 0.5,
      maxWidthOrHeight: options.maxWidthOrHeight || 1200,
      useWebWorker: options.useWebWorker ?? true,
      fileType: options.fileType || fileType,
      initialQuality: options.quality || 0.8,
    };

    console.log(`Compressing image: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    
    const compressedFile = await imageCompression(file, compressionOptions);
    
    console.log(`Compressed to: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
    
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    // Return original file if compression fails
    return file;
  }
};

/**
 * Compress an image for full-size display (max 1200px, 500KB)
 */
export const compressForFullSize = async (file: File): Promise<File> => {
  return compressImage(file, FULL_SIZE_OPTIONS);
};

/**
 * Compress an image for thumbnail display (max 400px, 100KB)
 */
export const compressForThumbnail = async (file: File): Promise<File> => {
  return compressImage(file, THUMBNAIL_OPTIONS);
};

/**
 * Process an image file and return both full-size and thumbnail versions
 */
export const processImageForUpload = async (
  file: File
): Promise<{ fullSize: File; thumbnail: File }> => {
  const [fullSize, thumbnail] = await Promise.all([
    compressForFullSize(file),
    compressForThumbnail(file),
  ]);

  return { fullSize, thumbnail };
};

/**
 * Get the file extension based on the file type
 */
export const getFileExtension = (file: File): string => {
  if (file.type === 'image/webp') return 'webp';
  if (file.type === 'image/jpeg') return 'jpg';
  if (file.type === 'image/png') return 'png';
  return 'webp'; // Default to webp
};
