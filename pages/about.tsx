import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Carousel from '@/components/Carousel';
import Content from '@/components/Content';
import Card from '@/components/Card/Card';
import useApi from 'utils/useApi';
import RecipeAPI from 'services'

const IndexPage = () => {
  const router = useRouter()
  const { sync: detailRecipeSync, state: recipeDetail } = useApi(RecipeAPI.recipe.getRecipeById);

  const loadRecipes = useCallback((): void => {
    detailRecipeSync(router.query.id)
  }, [detailRecipeSync])

  useEffect(() => {
    if(router.query.id !== '' && typeof router.query.id !== 'undefined'){
      loadRecipes();
    }
  }, [loadRecipes])
  return (
    <Layout title="Recipe App - Personal Project with Next JS and Typescript">
      <div className="carousel relative container mx-auto" style={{maxWidth: '1600px'}}>
        <div className="carousel-inner relative overflow-hidden w-full">
            <input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden checked />
            <div className="carousel-item absolute opacity-0" style={{height:'50vh'}}>
                <div className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right" 
                  style={{backgroundImage: typeof recipeDetail.data?.data.imageUrl !== 'undefined' ? `url(${recipeDetail.data?.data.imageUrl})` : 'url(https://wallpapercave.com/wp/wp4766529.jpg)'}}
                >

                    <div className="container mx-auto">
                        <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                            <p className="text-black text-2xl my-4">{recipeDetail.data?.data.title}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
      {
        !recipeDetail.loading && !recipeDetail.error && (
          <Content title="Recipe Detail" sideTools={false}>
            <p className="px-8">
            {recipeDetail.data?.data.description}
            </p>
          </Content>
        )
      }
    </Layout>
  )
} 

export default IndexPage
