import Image from "next/image";

type AssetImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function AssetImage({ src, alt, className, priority, sizes = "(max-width: 768px) 100vw, 50vw" }: AssetImageProps) {
  return <Image src={src} alt={alt} width={900} height={900} className={className} priority={priority} sizes={sizes} />;
}
