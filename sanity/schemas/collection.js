export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      description: 'Enter the title of the nft drop',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'nftCollectionName',
      title: 'Name of the nft collection page',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },

    {
      // slug is the url...
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'creator',
      title: 'Creator',
      type: 'reference',
      to: {type: 'creator'},
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'previewImage',
      title: 'Preview image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    
    
    
  ],

  
}
