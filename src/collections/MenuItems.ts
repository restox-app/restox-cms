import { CollectionConfig } from "payload/types";

const MenuItems: CollectionConfig = {
  slug: 'menu_items',
  labels: {
    singular: 'Menu Item',
    plural: 'Menu Items',
  },
  admin: {
    useAsTitle: 'name',
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
        if (v.resource.name === 'Menu Item' && v.access_level.create) {
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
        if (v.resource.name === 'Menu Item' && v.access_level.read) {
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
        if (v.resource.name === 'Menu Item' && v.access_level.update) {
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
        if (v.resource.name === 'Menu Item' && v.access_level.delete) {
          allow = true;
        }
      })

      return allow;
    },
  },
  fields: [
    {
      name: 'restaurant_id',
      type: 'relationship',
      label: 'Restaurant',
      relationTo: 'restaurants',
      required: true,
      hasMany: false,
    },
    {
      type: 'text',
      name: 'name',
      maxLength: 128,
      required: true,
    },
    {
      type: 'number',
      name: 'price',
      label: 'Price',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'menu_item_photos'
    },
  ],
};

export default MenuItems;