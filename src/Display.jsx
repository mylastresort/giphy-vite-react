import "./Display.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Picture({ images, alt_text }) {
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current.style.top = 0;
    }, 0);
  }, []);

  return (
    <a href={images.fixed_width.url} target="_blank">
      <picture
        className="gif"
        ref={ref}
        style={{
          aspectRatio: images.fixed_width.width / images.fixed_width.height,
        }}
      >
        {images.fixed_width.webp && (
          <source srcSet={images.fixed_width.webp} type="image/webp" />
        )}
        <img
          alt={alt_text}
          loading="lazy"
          onLoad={(e) => (e.target.style.opacity = 1)}
          src={images.fixed_width.url}
        />
        <div className="overlay" />
      </picture>
    </a>
  );
}

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
        {current.map(({ images, id, alt_text }) => (
          <Picture key={id} images={images} alt_text={alt_text} />
        ))}
      </div>
      {/* <div className="load">
        <button>Load More..</button>
      </div> */}
    </>
  );
}
