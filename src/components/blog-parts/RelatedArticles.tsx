
import { ArrowRight, Clock, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addPoints } from '@/lib/gamification';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface RelatedArticlesProps {
  onArticleClick: () => void;
}

const RelatedArticles = ({ onArticleClick }: RelatedArticlesProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const relatedArticles = [
    {
      id: 'tiger-dance-festival',
      title: "The Annual Tiger Dance Festival of Mangaluru",
      date: "April 22, 2025",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80",
      readTime: "8 min read",
      points: 7,
      excerpt: "Experience the vibrant Tiger Dance tradition during Mangaluru's most colorful festival",
      views: 1240,
      likes: 89
    },
    {
      id: 'udupi-temple-architecture',
      title: "Exploring the Temple Architecture of Udupi",
      date: "May 1, 2025",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&q=80",
      readTime: "10 min read",
      points: 8,
      excerpt: "Discover the intricate architectural marvels and spiritual significance of Udupi's ancient temples",
      views: 2156,
      likes: 134
    },
    {
      id: 'coastal-cuisine-secrets',
      title: "Coastal Cuisine: Secrets of Tulu Nadu Flavors",
      date: "April 28, 2025",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&q=80",
      readTime: "6 min read",
      points: 6,
      excerpt: "Uncover the culinary traditions and authentic recipes passed down through generations",
      views: 1876,
      likes: 112
    }
  ];

  const handleArticleClick = (article: typeof relatedArticles[0]) => {
    addPoints(article.points, `Clicked on related article: ${article.title}`);
    toast({
      title: `Article opened! +${article.points} points`,
      description: `Exploring: ${article.title}`,
      duration: 2000,
    });
    onArticleClick();
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display text-3xl font-bold text-tulu-blue mb-2">Related Articles</h3>
          <p className="text-muted-foreground">Continue your cultural journey with these stories</p>
        </div>
        <Button variant="outline" className="hidden md:flex">
          View All Articles
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {relatedArticles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleArticleClick(article)}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-${i === 0 ? '1517022812141-23620dba5c23' : i === 1 ? '1466442929976-97f336a657be' : '1466721591366-2d5fba72006d'}?w=800&q=80`;
                  }}
                />
                
                {/* Overlay with stats */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                  hoveredIndex === i ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{article.likes}</span>
                        </div>
                      </div>
                      <div className="bg-tulu-gold/90 text-white text-xs px-3 py-1 rounded-full font-medium">
                        +{article.points} pts
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-tulu-blue/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    Featured
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span>{article.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h4 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-tulu-blue transition-colors">
                  {article.title}
                </h4>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Trending</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-tulu-blue hover:text-tulu-red hover:bg-tulu-blue/10 group/btn p-0 h-auto"
                  >
                    Read Article
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Call to action */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-tulu-blue/10 to-tulu-green/10 rounded-2xl p-8">
          <h4 className="font-display text-2xl font-bold mb-4 text-tulu-blue">
            Discover More Stories
          </h4>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore our complete collection of articles about Tulu Nadu's rich heritage, traditions, and culture.
          </p>
          <Button className="bg-tulu-green hover:bg-tulu-blue transition-colors">
            Browse All Articles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
