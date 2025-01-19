import { CSSProperties } from "react";
import cloud from "../assets/cloud2.png";

interface CloudProps {
  style?: CSSProperties;
  className?: string;
  flipped?: boolean;
}

export const Cloud = ({
  style,
  className,
  flipped,
}: CloudProps): JSX.Element => {
  const getCloudStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      ...style,
      height: "auto",
      transform: flipped ? "scaleX(-1)" : "none",
      transition: "transform 0.5s ease",
      objectFit: "contain",
    };

    return baseStyle;
  };

  return (
    <img
      src={cloud}
      alt='Decorative cloud'
      className={`cloud ${className || ""}`}
      style={getCloudStyle()}
    />
  );
};
