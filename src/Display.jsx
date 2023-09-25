import "./Display.css";
import { useSelector } from "react-redux";
import Picture from "./Picture";

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
          <Picture images={item.images} id={item.id} key={item.id} />
        ))}
      </div>
    </>
  );
}
