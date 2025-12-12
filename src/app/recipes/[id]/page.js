'use client';

import { Spinner } from '@/components/ui/spinner';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecipeDetailPage() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        async function fetchMeal() {
            try {
                const res = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                const mealData = res.data.meals[0];
                setMeal(mealData);

                // Map ingredients dynamically
                const ingrList = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredient = mealData[`strIngredient${i}`];
                    const measure = mealData[`strMeasure${i}`];

                    if (ingredient && ingredient.trim() !== '') {
                        ingrList.push(`${ingredient} - ${measure}`);
                    }
                }
                setIngredients(ingrList);
            } catch (err) {
                console.log(err);
            }
        }

        fetchMeal();
    }, [id]);

    if (!meal) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Spinner className="size-8" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <img
                src={meal.strMealThumb}
                className="w-full rounded-xl mb-6"
                alt={meal.strMeal}
            />

            <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>

            <p className="text-gray-600 mb-4">
                Category: <b>{meal.strCategory}</b>
            </p>

            <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc list-inside mb-6">
                {ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-line">{meal.strInstructions}</p>
        </div>
    );
}