import React from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

type Params = {
  category: string;
};

const CategoryPage: React.FC = () => {
  const { category } = useParams<Params>();

  return (
    <div>
      <h1>{_.capitalize(category)}</h1>
    </div>
  );
};

export default CategoryPage;
