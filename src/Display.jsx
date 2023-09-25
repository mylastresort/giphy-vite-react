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
        {current.map((item) => (
          <div
            key={item.id}
            style={{
              aspectRatio: `${item.images.original.width}/${item.images.original.height}`,
            }}
            href={item.images.original.url}
            className="gif"
          >
            <img key={item.id} src={item.images.original.url} />
          </div>
        ))}
      </div>
    </>
  );
}
