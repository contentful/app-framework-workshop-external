import { useAutoResizer, useFieldValue } from "@contentful/react-apps-toolkit";

const Field = () => {
  const [text, setText] = useFieldValue<string>();

  useAutoResizer();

  return (
    <input
      type="text"
      value={text ?? ""}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default Field;
