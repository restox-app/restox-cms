import { buildConfig } from 'payload/config';
import path from 'path';
import Admins from './collections/Admins';
import AccessControlPolicies from './collections/AccessControlPolicies';
import Resources from './collections/Resources';
import Buyers from './collections/Buyers';
import Restaurants from './collections/Restaurants';
import MenuItems from './collections/MenuItems';
import MenuItemPhotos from './collections/MenuItemPhotos';
import CartItems from './collections/CartItems';
import Orders from './collections/Orders';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Admins.slug,
  },
  collections: [
    Admins,
    AccessControlPolicies,
    Resources,
    Buyers,
    Restaurants,
    MenuItems,
    MenuItemPhotos,
    CartItems,
    Orders,
    // Add Collections here
    // Examples,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
