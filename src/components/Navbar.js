'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Home, ChefHat, BookOpen, Heart, Search, User } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Close mobile menu when resizing to larger screen
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        // Handle scroll effect
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
        { name: 'Recipes', href: '#', icon: <ChefHat className="w-4 h-4" /> },
        { name: 'Meal Plans', href: '#', icon: <BookOpen className="w-4 h-4" /> },
        { name: 'Favorites', href: '#', icon: <Heart className="w-4 h-4" /> },
        { name: 'Search', href: '#', icon: <Search className="w-4 h-4" /> },
    ];

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-amber-50 to-orange-50'}`}>
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link href={'/'} className="flex items-center space-x-2">
                        <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                            <ChefHat className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">MealMaster</h1>
                            <p className="text-xs text-gray-600">Delicious Ideas Daily</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors duration-200 text-gray-700 font-medium"
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </a>
                        ))}

                        {/* User Profile */}
                        <div className="ml-4 pl-4 border-l border-gray-200">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
                                <User className="w-4 h-4" />
                                <span>Login</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors duration-200 text-gray-700 font-medium"
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </a>
                            ))}

                            {/* Mobile Login Button */}
                            <button className="flex items-center justify-center space-x-2 mt-4 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
                                <User className="w-4 h-4" />
                                <span>Login / Sign Up</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;