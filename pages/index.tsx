import React, { useCallback, useEffect } from 'react';
import Layout from '@/components/Layout';
import Carousel from '@/components/Carousel';
import Content from '@/components/Content';
import Card from '@/components/Card/Card';
import useApi from 'utils/useApi';
import RecipeAPI from 'services'

const IndexPage = () => {
  const { sync: recipeSync, state: recipeList } = useApi(RecipeAPI.recipe.getRecipes);

  const loadRecipes = useCallback((): void => {
    recipeSync('')
  }, [recipeSync])

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes])

  const searchRecipe = useCallback(
    event => {
      event.preventDefault();
      recipeSync(event.target.elements.searchKey.value)
    },
    []
  );

  return (
    <Layout title="Recipe App - Personal Project with Next JS and Typescript">
      <Carousel />
      <form onSubmit={searchRecipe}>
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-6 px-6 py-3">
            <div className="w-full bg-white shadow px-6 py-3 flex">
                <span className="w-auto flex justify-end items-center text-gray-500 p-2">
                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                </svg>
                </span>
                <input className="w-full rounded p-2" type="text" name="searchKey" placeholder="Try 'Burger'" />
                <button type="submit" className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4">
                    <p className="font-semibold text-xs">Search</p>
                </button>
            </div>
          </div>
      </form>
      {
        !recipeList.loading && !recipeList.error && (
          <Content title="Recipe List" sideTools={false}>
            {recipeList.data && recipeList.data?.data.length > 0 ? recipeList.data?.data.map((content) => (
                <Card key={content._id} data={content} />
              )
            ) : (
              <div className="container px-6 mx-auto">
                  <p className="mt-4 mb-4 px-2">Your Search Term doesnt match any kind of our Recipe Title. Please try another keyword</p>
              </div>
            )}
          </Content>
        )
      }
      <Content title="About" sideTools={false}>
        <section className="bg-white">
          <div className="container px-8 mx-auto">
              <p className="mt-4 mb-4">Personal Project For Breef Studio Test </p>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur <a href="#">random link</a> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Vitae aliquet nec ullamcorper sit. Nullam eget felis eget nunc lobortis mattis aliquam. In est ante in nibh mauris. Egestas congue quisque egestas diam in. Facilisi nullam vehicula ipsum a arcu. Nec nam aliquam sem et tortor consequat. Eget mi proin sed libero enim sed faucibus turpis in. Hac habitasse platea dictumst quisque. In aliquam sem fringilla ut. Gravida rutrum quisque non tellus orci ac auctor augue mauris. Accumsan lacus vel facilisis volutpat est velit egestas dui id. At tempor commodo ullamcorper a. Volutpat commodo sed egestas egestas fringilla. Vitae congue eu consequat ac.</p>
          </div>
        </section>
      </Content>
    </Layout>
  )
} 

export default IndexPage
