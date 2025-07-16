import ArtistView from "./View";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const id = (await props.params).id;

  return <ArtistView id={id} />;
}
