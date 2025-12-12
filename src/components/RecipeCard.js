import Link from 'next/link';
import { Clock, Users, ChefHat, Star } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100">
            <div className="p-8 bg-gradient-to-r from-amber-50 to-orange-50 flex justify-center">
                <span className="text-6xl">{recipe.image}</span>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                        {recipe.category}
                    </span>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="ml-1 text-gray-700 font-medium">{recipe.rating}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{recipe.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{recipe.totalTime} mins</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center">
                        <ChefHat className="w-4 h-4 mr-1" />
                        <span>{recipe.difficulty}</span>
                    </div>
                </div>

                <Link
                    href={`/recipes/${recipe.id}`}
                    className="block w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                >
                    View Recipe
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;