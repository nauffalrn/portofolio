// Renders an image produced by scripts/build-content.mjs ({ src, srcSet,
// width, height }). width/height reserve space to prevent layout shift, and
// `sizes` tells the browser which srcset candidate to download.
// Set `priority` only for the above-the-fold LCP image.
const ResponsiveImage = ({ image, alt, sizes, priority = false, className }) => {
  if (!image) return null;

  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? undefined : "async"}
    />
  );
};

export default ResponsiveImage;
