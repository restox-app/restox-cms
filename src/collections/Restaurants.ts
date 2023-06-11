import { CollectionConfig } from "payload/types";

const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Restaurant',
    plural: 'Restaurants',
  },
  access: {
    create: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator') {
        return true;
      }

      let allow = false;

      const acl: any[] = user.acl;

      acl.forEach((v) => {
        if (v.resource.name === 'Restaurant' && v.access_level.create) {
          allow = true;
        }
      })

      return allow;
    },
    read: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator') {
        return true;
      }

      let allow = false;

      const acl: any[] = user.acl;

      acl.forEach((v) => {
        if (v.resource.name === 'Restaurant' && v.access_level.read) {
          allow = true;
        }
      })

      return allow;
    },
    update: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator') {
        return true;
      }

      let allow = false;

      const acl: any[] = user.acl;

      acl.forEach((v) => {
        if (v.resource.name === 'Restaurant' && v.access_level.update) {
          allow = true;
        }
      })

      return allow;
    },
    delete: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator') {
        return true;
      }

      let allow = false;

      const acl: any[] = user.acl;

      acl.forEach((v) => {
        if (v.resource.name === 'Restaurant' && v.access_level.delete) {
          allow = true;
        }
      })

      return allow;
    },
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      maxLength: 128,
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      required: true,
    },
    {
      type: 'text',
      name: 'contact',
      label: 'Contact',
      required: true,
    },
    {
      type: 'group',
      name: 'address',
      label: 'Address',
      fields: [
        {
          type: 'textarea',
          name: 'line1',
          label: 'Line 1',
          required: true,
        },
        {
          type: 'textarea',
          name: 'line2',
          label: 'Line 2',
        },
        {
          type: 'text',
          name: 'city',
          label: 'City',
          required: true,
        },
        {
          type: 'text',
          name: 'state',
          label: 'State',
          required: true,
        },
        {
          type: 'text',
          name: 'pin_code',
          label: 'Pin Code',
          required: true,
        },
      ],
    },
  ]
};

export default Restaurants;