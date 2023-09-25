import "./Display.css";
import { useSelector } from "react-redux";

export default function Display() {
  const current = useSelector((state) => state.giphy.current);

  const search = useSelector((state) => state.giphy.search);

  const loading = useSelector((state) => state.giphy.loading);

  if (!search) return null;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>{current.length} results</div>
      <div className="display">
        {current.map(({ images, id }) => (
          <picture
            key={id}
            style={{
              aspectRatio:
                images.fixed_width_downsampled.width /
                images.fixed_width_downsampled.height,
            }}
            className="gif"
          >
            {images.fixed_width_downsampled.webp && (
              <source
                srcSet={images.fixed_width_downsampled.webp}
                type="image/webp"
              />
            )}
            <img
              loading="lazy"
              onLoad={(e) => (e.target.style.opacity = 1)}
              src={images.fixed_width_downsampled.url}
            />
          </picture>
        ))}
      </div>
    </>
  );
}
