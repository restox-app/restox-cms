import { CollectionConfig } from "payload/types";

const CartItems: CollectionConfig = {
  slug: 'cart_items',
  labels: {
    singular: 'Cart Item',
    plural: 'Cart Items',
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
        if (v.resource.name === 'Cart Item' && v.access_level.create) {
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
        if (v.resource.name === 'Cart Item' && v.access_level.read) {
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
        if (v.resource.name === 'Cart Item' && v.access_level.update) {
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
        if (v.resource.name === 'Cart Item' && v.access_level.delete) {
          allow = true;
        }
      })

      return allow;
    },
  },
  fields: [
    {
      type: 'relationship',
      name: 'buyer_id',
      label: 'Buyer',
      hasMany: false,
      relationTo: 'buyers',
      required: true,
    },
    {
      type: 'relationship',
      name: 'restaurant_id',
      label: 'Restaurant',
      hasMany: false,
      relationTo: 'restaurants',
      required: true,
    },
    {
      type: 'relationship',
      name: 'menu_item_id',
      label: 'Menu Item',
      hasMany: false,
      relationTo: 'menu_items'
    },
    {
      type: 'number',
      name: 'qty',
      label: 'Quantity',
      min: 1,
    },
    {
      type: 'number',
      name: 'price',
      label: 'Price',
      required: true,
    },
    {
      type: 'relationship',
      name: 'order_id',
      label: 'Order',
      hasMany: false,
      relationTo: 'orders'
    },
    {
      type: 'checkbox',
      name: 'ordered',
      label: 'Ordered',
      defaultValue: false,
    },
  ],
};

export default CartItems;
