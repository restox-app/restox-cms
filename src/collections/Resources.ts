import { CollectionConfig } from "payload/types";

const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator' || role === 'developer') {
        return true;
      }

      return false;
    },
    update: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator' || role === 'developer') {
        return true;
      }

      return false;
    },
    delete: () => false,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      maxLength: 256,
      required: true,
      access: {
        update: ({ req: { user }, doc }) => {
          const role = user.role ?? '';
    
          if (role === 'administrator') {
            return true;
          }
    
          return doc ? user.email === doc.registered_by : true;
        },
      }
    },
    {
      type: 'checkbox',
      name: 'approved',
      required: true,
      defaultValue: false,
      access: {
        create: ({ req: { user } }) => {
          const role = user.role ?? '';
    
          if (role === 'administrator') {
            return true;
          }
    
          return false;
        },
        update: ({ req: { user } }) => {
          const role = user.role ?? '';
    
          if (role === 'administrator') {
            return true;
          }
    
          return false;
        },
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'registered_by',
      label: 'Registered By',
      hasMany: false,
      relationTo: 'admins',
      admin: {
        position: 'sidebar',
      },
      required: true,
      access: {
        update: () => false
      },
    },
  ],
};

export default Resources;
