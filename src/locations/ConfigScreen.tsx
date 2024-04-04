import {
  ConfigAppSDK,
  type OnConfigureHandlerReturn,
} from "@contentful/app-sdk";
import { Checkbox, Flex } from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import { ContentTypeProps } from "contentful-management";
import { css } from "emotion";
import { useCallback, useEffect, useState } from "react";

export interface AppInstallationParameters {}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({});
  const sdk = useSDK<ConfigAppSDK>();

  const [contentTypes, setContentTypes] = useState<ContentTypeProps[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(
    []
  );

  const onConfigure =
    useCallback(async (): Promise<OnConfigureHandlerReturn> => {
      // This method will be called when a user clicks on "Install"
      // or "Save" in the configuration screen.
      // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

      // Get current the state of EditorInterface and other entities
      // related to this app installation
      const currentState = await sdk.app.getCurrentState();

      return {
        parameters,
        targetState: {
          EditorInterface: {
            ...currentState?.EditorInterface,
            ...Object.fromEntries(
              contentTypes.map((contentType) => [
                contentType.sys.id,
                selectedContentTypes.includes(contentType.sys.id)
                  ? { sidebar: { position: 0 } }
                  : {},
              ])
            ),
          },
        },
      };
    }, [parameters, sdk, contentTypes, selectedContentTypes]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null =
        await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      const ctResponse = await sdk.cma.contentType.getMany({});
      setContentTypes(ctResponse.items);

      const state = await sdk.app.getCurrentState();
      if (state) {
        setSelectedContentTypes(
          Object.entries(state.EditorInterface)
            .filter(([_, editorInterface]) => !!editorInterface.sidebar)
            .map(([contentTypeId]) => contentTypeId)
        );
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <Flex
      flexDirection="column"
      className={css({ margin: "80px", maxWidth: "800px" })}
    >
      {contentTypes.map((contentType) => (
        <Checkbox
          key={contentType.sys.id}
          id={`ct-${contentType.sys.id}`}
          name={`ct-${contentType.sys.id}`}
          isChecked={selectedContentTypes.includes(contentType.sys.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedContentTypes([
                ...selectedContentTypes,
                contentType.sys.id,
              ]);
            } else {
              setSelectedContentTypes(
                selectedContentTypes.filter((id) => id !== contentType.sys.id)
              );
            }
          }}
        >
          {contentType.name}
        </Checkbox>
      ))}
    </Flex>
  );
};

export default ConfigScreen;
