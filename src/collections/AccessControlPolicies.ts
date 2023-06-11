import { CollectionConfig } from "payload/types";

const AccessControlPolicies: CollectionConfig = {
  slug: 'access_control_policies',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Access Control Policy',
    plural: 'Access Control Policies',
  },
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
    delete: () => false,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      maxLength: 256,
      required: true,
    },
    {
      type: 'relationship',
      name: 'resource',
      hasMany: false,
      required: true,
      relationTo: 'resources',
      filterOptions: () => {
        return {
          'approved': {
            equals: true,
          },
        };
      },
    },
    {
      type: 'group',
      name: 'access_level',
      label: 'Access Level',
      fields: [
        {
          type: 'checkbox',
          name: 'create',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'read',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'update',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'delete',
          defaultValue: false,
        },
      ],
    },
    {
      type: 'relationship',
      name: 'created_by',
      label: 'Created By',
      hasMany: false,
      relationTo: 'admins',
      admin: {
        position: 'sidebar',
      },
      required: true,
      filterOptions: ({ user }) => {
        return {
          '_id': {
            equals: user.id,
          }
        }
      },
    },
  ],
};

export default AccessControlPolicies;
