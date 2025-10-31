import React from "react"
import { useParams } from "react-router-dom";
import useArticle from "@/hooks/useArticle";

import  {  useEffect } from "react";
// Since this must be a single file, we will mock the external dependencies
// like useParams, useArticle, and ImageGrid.

// --- Mock Data and Utilities for Self-Contained Execution ---

/**
 * Utility to format Firestore Timestamp objects into a readable date string.
 * @param {object} timestamp - {_seconds: number, _nanoseconds: number}
 */
const formatDate = (timestamp) => {
    if (!timestamp || typeof timestamp._seconds !== 'number') return 'N/A';
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// --- Mock ImageGrid Component ---

const ImageGrid = ({ images }) => {
    if (!images || images.length === 0) return null;

    // Use the first image as the large featured image
    const featuredImage = images[0];
    const thumbnailImages = images.slice(1);

    return (
        <div className="my-8 space-y-4">
            {/* Featured Image */}
            <img
                src={featuredImage}
                alt="Featured image for the article"
                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.01]"
                onError={(e) => e.currentTarget.src = 'https://placehold.co/800x600/ef4444/ffffff?text=Image+Error'}
            />
            {/* Thumbnail Grid */}
            {thumbnailImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {thumbnailImages.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-md hover:opacity-90 transition-opacity"
                            onError={(e) => e.currentTarget.src = 'https://placehold.co/400x300/ef4444/ffffff?text=Image+Error'}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- ArticlePage Component (Main Display) ---

const ArticlePage = () => {
    const { id } = useParams();

    const { getArticleByIdState: { loading, error, data, successful }, getArticle } = useArticle();

    useEffect(() => {
        console.log("ArticlePage: useEffect called", id);
        if (id) {
            getArticle(id);
        }
    }, [getArticle, id]);
  console.log("ArticlePage: render called", id, loading, error, data, successful);
    // Show loading or error states
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex items-center space-x-3 text-purple-600">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading Article...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center bg-red-50 text-red-700">
                <p className="font-semibold">Error retrieving article: {error.message}</p>
            </div>
        );
    }

    if (!data || !successful) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center bg-yellow-50 text-yellow-700">
                <p className="font-semibold">Article not found.</p>
            </div>
        );
    }

    // --- Main Article View ---
    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
                
                {/* Article Header & Metadata */}
                <header className="p-8 md:p-12 border-b border-gray-100">
                    {/* Category & Tags */}
                    <div className="flex items-center space-x-3 text-sm font-medium mb-3">
                        <span className="text-purple-600 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">{data.category}</span>
                        {data.tags.map(tag => (
                            <span key={tag} className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {data.title}
                    </h1>

                    {/* Author and Date */}
                    <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                            <span>By <strong className="text-gray-700">{data.author}</strong></span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                            <span>{formatDate(data.date)}</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                            <span>{data.readTime || '5 min read'}</span>
                        </div>
                    </div>
                </header>
                
                {/* Images Section */}
                <section className="p-8 md:p-12">
                    <ImageGrid images={data.image} />
                </section>

                {/* Article Content - Uses a separate wrapper for typography control */}
                <section className="article-content-wrapper px-8 pb-12 md:px-12">
                    <div 
                        className="prose prose-lg max-w-none font-serif text-gray-700" 
                        dangerouslySetInnerHTML={{ __html: data.article }}
                    />
                </section>

            </article>
            
            {/* Custom Tailwind/Prose Styles (Embedded for single-file mandate) */}
            <style jsx="true">{`
                /* Ensure article body text is readable and styled */
                .article-content-wrapper {
                    line-height: 1.8;
                }
                .prose p {
                    margin-bottom: 1.5rem;
                    font-size: 1.125rem; /* text-lg */
                }
                .prose h2 {
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                    font-size: 2rem; /* text-3xl */
                    border-bottom: 2px solid #e5e7eb;
                    padding-bottom: 0.5rem;
                }
                .prose ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                .prose li {
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default ArticlePage;
