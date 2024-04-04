import { FieldAppSDK } from "@contentful/app-sdk";
import { SingleLineEditor } from "@contentful/field-editor-single-line";
import { useAutoResizer, useSDK } from "@contentful/react-apps-toolkit";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();

  useAutoResizer();

  return <SingleLineEditor field={sdk.field} locales={sdk.locales} />;
};

export default Field;
