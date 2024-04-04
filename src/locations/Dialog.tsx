import { DialogAppSDK } from "@contentful/app-sdk";
import {
  EntityList,
  EntityListItem,
  Paragraph,
  Spinner,
} from "@contentful/f36-components";
import { useAutoResizer, useSDK } from "@contentful/react-apps-toolkit";
import { useEffect, useState } from "react";

const Dialog = () => {
  const sdk = useSDK<DialogAppSDK>();
  useAutoResizer();

  const [breeds, setBreeds] = useState<Breed[] | undefined>();
  useEffect(() => {
    fetchBreeds().then((breeds) => setBreeds(breeds));
  }, []);

  if (!breeds) {
    return <Spinner />;
  }

  return (
    <EntityList>
      {breeds.map((breed) => (
        <EntityListItem
          key={breed.id}
          title={`${breed.name}${
            sdk.parameters.invocation === breed.name ? " (selected)" : ""
          }`}
          description={breed.description}
          onClick={() => sdk.close(breed.name)}
        />
      ))}
    </EntityList>
  );
};

export default Dialog;

async function fetchBreeds(): Promise<Breed[]> {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  return await response.json();
}

export interface Breed {
  id: string;
  name: string;
  description: string;
}
