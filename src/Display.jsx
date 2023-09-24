import "./Display.css"
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
          <a key={item.id} href={item.images.original.url} className="gif">
            <img alt={item.slug} key={item.id} src={item.images.original.url} />
          </a>
        ))}
      </div>
    </>
  );
}
