import { createCurrentUserHook, createClient } from "next-sanity";
// import { createImageUrlBuilder } from "@sanity/image-url";
import imageUrlBuilder from "@sanity/image-url";
export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-03-25',
    useCdn: process.env.NODE_ENV === 'development',

}

export const sanityClient = createClient(config)
export const urlFor = (source) => imageUrlBuilder(config).image(source);


// export const urlFor = (source) => createImageUrlBuilder(config).Image(source)