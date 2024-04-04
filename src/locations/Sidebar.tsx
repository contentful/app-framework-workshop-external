import { SidebarAppSDK } from "@contentful/app-sdk";
import { Paragraph } from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import { useMemo, useState } from "react";

const FIELD_ID = "text";

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  const [text, setText] = useState<string | undefined>(
    sdk.entry.fields[FIELD_ID].getValue()
  );

  useMemo(() => {
    const unsubscribe = sdk.entry.fields[FIELD_ID].onValueChanged((value) => {
      setText(value);
    });

    return unsubscribe;
  }, []);

  return <Paragraph>{(text ?? "").length} chars</Paragraph>;
};

export default Sidebar;
