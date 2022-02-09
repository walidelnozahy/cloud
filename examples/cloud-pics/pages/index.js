import Main from "@layout/Main";
import Home from "@views/Home";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function HomePage({ data }) {
  const { data: images } = useSWR("/api/images", fetcher, {
    fallbackData: data,
  });

  return (
    <Main>
      <Home items={images?.items} />
    </Main>
  );
}

export async function getServerSideProps({ req }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUD_URL}/images`);
  const data = await res.json();
  return { props: { data } };
}
