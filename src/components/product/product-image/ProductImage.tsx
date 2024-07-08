import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
}

export const ProductImage = ({ alt, height, width, className, src, style }: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src // https://images.com.4343
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};
