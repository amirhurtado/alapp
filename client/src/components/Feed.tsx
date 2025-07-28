"use client";

import { Image } from "@imagekit/next";

const Feed = () => {
  return (
    <div className="mt-10">
      <Image
        src="/default-image.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  );
};

export default Feed;
