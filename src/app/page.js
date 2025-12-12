'use client';

import axios from 'axios';
import { ChefHat, Clock, Users, Star, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [mealsList, setMealsList] = useState([]);
  const [filter, setFilter] = useState('cake');
  const API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`
  const mealCategories = [
    { name: 'Quick & Easy', icon: <Clock className="w-6 h-6" />, count: '15-min meals' },
    { name: 'Healthy', icon: <ChefHat className="w-6 h-6" />, count: 'Low-calorie options' },
    { name: 'Family Meals', icon: <Users className="w-6 h-6" />, count: 'Kid-friendly recipes' },
    { name: 'Popular', icon: <Star className="w-6 h-6" />, count: 'Top rated dishes' },
  ];
  const filterList = [
    { id: 0, text: 'Cake' },
    { id: 1, text: 'Beef' },
    { id: 2, text: 'Chicken' },
    { id: 3, text: 'Lamb' },
    { id: 4, text: 'Pasta' },
    { id: 5, text: 'Seafood' },
    { id: 6, text: 'Vegan' },
    { id: 7, text: 'Vegetarian' },
    { id: 8, text: 'Breakfast' },
    { id: 9, text: 'Goat' },
  ]


  useEffect(() => {
    axios.get(API).then((response) => {
      setMealsList(response.data.meals);
    })
      .catch((err) => {
        console.log(err)
      });
  }, [filter]);

  console.log(mealsList)
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          What's Cooking <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Today?</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get personalized meal ideas, recipes, and cooking inspiration for every day of the week.
        </p>

        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-lg"
            />
            <button className="hidden md:flex absolute right-2 top-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
              Search
            </button>
            <button className="flex md:hidden absolute right-2 top-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
              <Search />
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mealCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-amber-100"
            >
              <div className="p-3 bg-amber-100 rounded-lg w-fit mb-4">
                <div className="text-amber-600">{category.icon}</div>
              </div>
              <h3 className="font-bold text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{category.count}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="filter flex items-center justify-start md:justify-center gap-3 max-w-full overflow-y-scroll">
        {filterList.map((li) => (
          <button className='bg-[#fe9700] text-white px-5 py-2 rounded-md font-medium hover:bg-[#ff6b00] transition-all duration-300' key={li.id} onClick={() => setFilter(li.text)}>{li.text}</button>
        ))}
      </div>

      {/* Today's Suggestions */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Today's Meal Ideas</h2>
          <button className="text-amber-600 hover:text-amber-700 font-medium">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mealsList.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className=" bg-gradient-to-r from-amber-50 to-orange-50 flex justify-center">
                {/* <span className="text-5xl">{meal.image}</span> */}
                <Image src={meal.strMealThumb} width={300} height={100} alt={meal.strMeal} />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-lg">{meal.strMeal}</h3>
                <p className='text-sm'>{(meal.strInstructions).slice(0, 50)}...</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-600 text-sm font-[600]">Category: {meal.strCategory}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${meal.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {meal.strArea}
                  </span>
                </div>
                <Link href={`/recipes/${meal.idMeal}`} className="block flex items-center justify-center w-full mt-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
                  View Recipe
                </Link>

                {/* href={`/meal/${item.id}`} */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose MealMaster?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ChefHat className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Expert Recipes</h3>
            <p className="text-gray-600">Curated recipes from professional chefs</p>
          </div>

          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Save Time</h3>
            <p className="text-gray-600">Quick meal ideas for busy schedules</p>
          </div>

          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">For Everyone</h3>
            <p className="text-gray-600">Dietary preferences & family-sized meals</p>
          </div>
        </div>
      </section>
    </div>
  );
}
