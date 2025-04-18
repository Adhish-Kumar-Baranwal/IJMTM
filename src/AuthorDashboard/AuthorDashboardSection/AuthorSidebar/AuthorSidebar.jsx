import React from 'react';
import AuthorAccount from './AuthorAccount/AuthorAccount';
import AuthorRouteSelect from './AuthorRouteSelect/AuthorRouteSelect';

const AuthorSidebar = () => {
  return (
    <div className='bg-stone-100'>
      <div className='sticky top-4 h-[94vh]'>
        <AuthorAccount />
        <AuthorRouteSelect />
      </div>
    </div>
  );
};

export default AuthorSidebar;
