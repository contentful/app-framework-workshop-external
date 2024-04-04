import { FieldAppSDK } from "@contentful/app-sdk";
import { Button, Stack } from "@contentful/f36-components";
import { SingleLineEditor } from "@contentful/field-editor-single-line";
import { useAutoResizer, useSDK } from "@contentful/react-apps-toolkit";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();

  useAutoResizer();

  return (
    <>
      <SingleLineEditor field={sdk.field} locales={sdk.locales} />
      <Button
        onClick={async () => {
          const selectedCat = await sdk.dialogs.openCurrentApp({
            title: "Select a cat",
            parameters: sdk.field.getValue(),
          });
          sdk.field.setValue(selectedCat);
        }}
      >
        Select
      </Button>
    </>
  );
};

export default Field;
