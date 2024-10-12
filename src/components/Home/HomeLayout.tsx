import React, { ReactNode } from 'react';

interface FeedLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: FeedLayoutProps) => {
  // Ensure children are always an array
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row">
        {/* Left sidebar */}
        {/* <div className=" lg:sticky lg:top-0 mt-11 lg:h-screen lg:overflow-y-auto mb-4 lg:mb-0">
          {childrenArray[0]}
        </div> */}

        {/* Middle content */}
        <div className="lg:size-[70%] container w-full mx-auto mb-4 lg:mb-0">
          {childrenArray[0]}
        </div>

        {/* Right sidebar */}
        {/* <div className=" lg:sticky mt-11 lg:top-0 lg:h-screen lg:overflow-y-auto">
          {childrenArray[2]}
        </div> */}
      </div>
    </div>
  );
};

export default HomeLayout;