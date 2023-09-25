import { useEffect, useRef } from "react";

export default function Picture({ images }) {
  const ref = useRef();

  useEffect(() => {
    const pre = new Image();
    pre.onload = () => {
      ref.current.src = pre.src;
    };
    pre.src = images.fixed_width_downsampled.url;
    return () => {
      pre.onload = null;
    };
  }, []);

  return (
    <picture
      style={{
        aspectRatio: `${images.fixed_width_downsampled.width}/${images.fixed_width_downsampled.height}`,
      }}
      className="gif"
    >
      <img loading="lazy" ref={ref} />
    </picture>
  );
}
