import { CollectionConfig } from "payload/types";

const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Order',
    plural: 'Orders',
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
        if (v.resource.name === 'Order' && v.access_level.create) {
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
        if (v.resource.name === 'Order' && v.access_level.read) {
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
        if (v.resource.name === 'Order' && v.access_level.update) {
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
        if (v.resource.name === 'Order' && v.access_level.delete) {
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
      name: 'notes',
      type: 'array',
      minRows: 0,
      maxRows: 10,
      labels: {
        singular: 'Detail',
        plural: 'Details',
      },
      fields: [
        {
          type: 'text',
          name: 'key',
        },
        {
          type: 'text',
          name: 'value',
        },
      ],
    },
    {
      type: 'select',
      name: 'status',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Confirmed',
          value: 'confirmed',
        },
      ],
      required: true,
    },
    {
      type: 'text',
      name: 'payment_gateway',
      label: 'Payment Gateway',
      required: true,
    },
    {
      type: 'select',
      name: 'payment_status',
      label: 'Payment Status',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Paid',
          value: 'paid',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
      ],
      required: true,
    },
    {
      type: 'group',
      name: 'gateway_details',
      label: 'Gateway Details',
      fields: [
        {
          type: 'text',
          name: 'payment_id',
          label: 'Payment Id',
        },
        {
          type: 'text',
          name: 'order_id',
          label: 'Order Id',
        },
      ],
    },
  ],
};

export default Orders;
