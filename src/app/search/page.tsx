import View from "./View";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [q: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const q = (await props.searchParams).q;
  const query = Array.isArray(q) ? q[0] : q;

  if (!query) {
    redirect("/");
  }

  return <View query={query} />;
}
