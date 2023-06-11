import { CollectionConfig } from "payload/types";

const Buyers: CollectionConfig = {
  slug: 'buyers',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Buyer',
    plural: 'Buyers',
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
        if (v.resource.name === 'Buyer' && v.access_level.create) {
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
        if (v.resource.name === 'Buyer' && v.access_level.read) {
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
        if (v.resource.name === 'Buyer' && v.access_level.update) {
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
        if (v.resource.name === 'Buyer' && v.access_level.delete) {
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
  ],
};

export default Buyers;
