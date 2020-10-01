import client from '../../client';

export type RecipeData = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  company: string;
  __v: number;
}

type GetRecipesResponse = {
    message: string;
    data: {
      _id: string;
      title: string;
      description: string;
      price: number;
      imageUrl: string;
      company: string;
      __v: number;
    }[];
  };

type GetDetailRecipeResponse = {
    message: string;
    data: RecipeData;
  };

const getRecipes = async (title : string): Promise<GetRecipesResponse> => {
  const response = await client.get(`/recipes?title=${title}`);

  return response.data;
};

const getRecipeById = async (id: string | string[]): Promise<GetDetailRecipeResponse> => {
  const response = await client.get(`/recipes/${id}`);

  return response.data;
};

export default {
  getRecipes,
  getRecipeById,
};
