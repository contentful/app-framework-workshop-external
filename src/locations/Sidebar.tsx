import { Paragraph } from "@contentful/f36-components";
import { useFieldValue } from "@contentful/react-apps-toolkit";

const FIELD_ID = "text";

const Sidebar = () => {
  const [text] = useFieldValue<string | undefined>(FIELD_ID);

  return <Paragraph>{(text ?? "").length} chars</Paragraph>;
};

export default Sidebar;
