import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
})



export const uploadFile = async (file : File, folder: string) =>{
    const bytes =  await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    const resultImage = await imagekit.upload({
        file: buffer,
        fileName: "imageprofile",
        useUniqueFileName: true,
        folder: folder,
    })
    return  resultImage.url
}
