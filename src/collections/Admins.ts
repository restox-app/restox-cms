import { CollectionConfig } from "payload/types";

const Admins: CollectionConfig = {
  slug: 'admins',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
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

      return {
        email: {
          equals: user.email,
        },
      };
    },
    delete: () => false,
  },
  fields: [
    // Email added by default
    {
      type: 'text',
      name: 'name',
      maxLength: 128,
      required: true,
      access: {
        update: ({ req: { user }, doc }) => {
          const role = user.role ?? '';
        
          if (role === 'administrator') {
            return true;
          }
    
          return doc ? user.email === doc.email : true;
        },
      },
    },
    {
      type: 'select',
      name: 'role',
      hasMany: false,
      options: [
        {
          label: 'Administrator',
          value: 'administrator',
        },
        {
          label: 'Observer',
          value: 'observer',
        },
        {
          label: 'Developer',
          value: 'developer',
        },
        {
          label: 'Content Manager',
          value: 'content_manager',
        },
        {
          label: 'Moderator',
          value: 'moderator',
        },
      ],
      required: true,
      access: {
        read: () => true,
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
    },
    {
      type: 'relationship',
      name: 'acl',
      label: 'Access Control List',
      hasMany: true,
      relationTo: 'access_control_policies',
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
    },
    {
      type: 'relationship',
      name: 'initiated_by',
      label: 'Initiated By',
      hasMany: false,
      relationTo: 'admins',
      admin: {
        position: 'sidebar',
      },
      access: {
        update: () => false,
      },
    },
  ],
};

export default Admins;