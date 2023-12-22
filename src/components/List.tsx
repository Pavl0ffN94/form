import React, {memo} from 'react';

const ListImpl = value => {
  return <span>{value}</span>;
};

export const List = memo(ListImpl);
