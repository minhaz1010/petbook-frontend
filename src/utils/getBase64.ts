import { getPlaiceholder } from "plaiceholder";

export default async function getBlurData(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {base64} = await getPlaiceholder(buffer);
  return base64;
}