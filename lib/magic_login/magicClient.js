import { Magic } from "magic-sdk";

const createMagic = (lo) => {
  console.log(lo);
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY, {
      locale: lo,
    })
  ); // ✨
};

export const magiclink = (lo) => createMagic(lo);
