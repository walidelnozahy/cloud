import Image from "next/image";
import Main from "@layout/Main";

export default function ImagePage({ data }) {
  const { url, width, height, username } = data;
  return (
    <Main>
      <p>{username}</p>
      <Image src={url} width={width} height={height}></Image>
    </Main>
  );
}

export async function getServerSideProps({ req, params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLOUD_URL}/images/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${req.cookies.sid}`,
      },
    }
  );
  const data = await res.json();
  return { props: { data } };
}
