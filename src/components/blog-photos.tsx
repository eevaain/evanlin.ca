import photos from "@/data/blog-photos.json";

const sizes = "(max-width: 704px) calc((100vw - 64px) / 2), 320px";

export default function BlogPhotos() {
  return (
    <div className="grid w-full max-w-[656px] grid-cols-2 items-start gap-4">
      {photos.map((photo) => (
        <picture key={photo.name}>
          <source type="image/avif" srcSet={photo.avifSrcSet} sizes={sizes} />
          <img
            src={photo.src}
            srcSet={photo.webpSrcSet}
            sizes={sizes}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="h-auto w-full"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      ))}
    </div>
  );
}
