import React from 'react';
import Link from 'next/link';
import { RecipeData } from 'services/resources/recipe'

import styles from './Card.module.css';

type CardProps = {
    data: RecipeData
}

const Card = ({data}: CardProps) => {
    return (
        <Link href={{pathname: '/about', query: { id : data._id }}}>
            <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                    <img className="hover:grow hover:shadow-lg imgRecipe" src={data.imageUrl} />
                    <div className="pt-3 flex items-center justify-between">
                        <p className="">{data.title}</p>
                        <p>{data.company}</p>
                    </div>
                    <p className="pt-1 text-gray-900">Rp. {data.price}</p>
                    <p className={styles.descriptionText}>{data.description}</p>
            </div>
        </Link>
    )
}

export default Card;