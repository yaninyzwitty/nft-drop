import React from 'react'
import { ConnectWallet, useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import Link from 'next/link';


type Props = {
  collection: Collection,
}

function NftDropPage({collection}: Props) {
  // console.log(collection)
  // collection no problem

  // auth stuff
  const connectWithMetaMask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();
  // console.log(address);


   
  return (
    <div className='flex h-screen flex-col lg:grid lg:grid-cols-10'>
        {/* Left side */}
        <div className='bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4'>
            <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
                <div className='bg-gradient-to-tr from-yellow-400 to-purple-600 p-2 rounded-xl'>
              <img className="w-44 rounded-xl object-cover lg:h-96 lg:w-72" src={urlFor(collection.previewImage).url()} alt="" />
              {/* "https://links.papareact.com/8sg" */}

                </div>
              <div className='space-y-2 p-5 text-center'>
                <h1 className='text-4xl font-bold text-white'>{collection.nftCollectionName}</h1>
                <h2 className='text-xl text-gray-300'>{collection.description}</h2>
              </div>

            </div>

        </div>
        {/* right */}

        <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
          
            {/* Header */}
            <header className='flex items-center justify-between'>
              <Link href={'/'}>
              <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'> 
                THE {" "} COLLECTION OF <span className='font-extrabold underline decoration-pink-600/50'>WITTY FAM </span> {' '} MARKET-PLACE
                </h1>
              </Link>
             
                
                <button 
                onClick={() => {address ? disconnect() :connectWithMetaMask()}}
                className='rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base whitespace-nowrap'>
                  {address ? 'Sign Out': 'Sign In'}
                </button>
                
            </header>
            <hr className='my-2 border' />
            {address && (
              <p className='text-center text-sm text-rose-400'>You are logged in with the wallet: {address.substring(0, 5)}...{address.length - 5}</p>
            )}

            {/* content */}
            {/* "https://links.papareact.com/bdy" */}
            <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-x-8 lg:justify-center'>
                <img className="w-80 object-cover pb-10 lg:h-40" src={urlFor(collection.mainImage).url()} alt="" />
                <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>
                  {collection.title}
                </h1>
                {/* The witty Fam Coding Club | NFT-DROP */}
                <p className='p-2 text-xl text-green-500 '>13 / 21 NFTs claimed</p>

            </div>
            {/* mint button */}
            <button className='h-16 bg-red-600 text-white rounded-full w-full mt-5'><span className='font-bold'>MINT NFT</span>(0.01 ETH)</button>

        </div>
    </div>
  )
}

export default NftDropPage


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
    asset
  },
  previewImage {
    asset
  },
  slug {
    current
  },
  creator-> {
    _id,
    name,
    address,
    slug {
    current
  },
  },
    
}`
// check tje slug

const collection = await sanityClient.fetch(query, {
  // dollarsign key --> id
  id: params?.id
 
});
if (!collection) {
  return {
    notFound: true
  }
  
}

return {
  props: {
    collection,
  },
  }


}
