import withPlaiceholder from '@plaiceholder/next';
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
      remotePatterns:[
        {
          protocol:"https",
          hostname:"**"
        }
      ]
    }
};

export default withPlaiceholder(nextConfig)
