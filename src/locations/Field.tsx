import { FieldAppSDK } from "@contentful/app-sdk";
import { Paragraph } from "@contentful/f36-components";
import { useAutoResizer, useSDK } from "@contentful/react-apps-toolkit";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();

  useAutoResizer();

  return (
    <Paragraph>Hello Entry Field Component (AppId: {sdk.ids.app})</Paragraph>
  );
};

export default Field;
