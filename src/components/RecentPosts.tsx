
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const recentPosts = [
  {
    id: 1,
    title: "The Lost Coins of Vijayanagara: Archaeological Discoveries in Tulu Nadu",
    image: "https://source.unsplash.com/photo-1492321936769-b49830bc1d1e",
    date: "May 5, 2025",
    category: "History"
  },
  {
    id: 2,
    title: "Preserving Tulu Language: Digital Initiatives for Cultural Conservation",
    image: "https://source.unsplash.com/photo-1466721591366-2d5fba72006d",
    date: "May 2, 2025",
    category: "Language & Culture"
  },
  {
    id: 3,
    title: "Environmental Conservation Efforts Along the Netravati River Basin",
    image: "https://source.unsplash.com/photo-1472396961693-142e6e269027",
    date: "April 28, 2025",
    category: "Environment"
  }
];

const RecentPosts = () => {
  return (
    <div className="bg-tulu-blue/5 py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Latest from our <span className="text-tulu-red">Blog</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Stay updated with our newest stories, insights, and discoveries from Tulu Nadu
            </p>
          </div>
          
          <Button 
            variant="outline"
            className="mt-6 md:mt-0 border-tulu-blue text-tulu-blue hover:bg-tulu-blue hover:text-white transition-colors group scroll-reveal"
          >
            Subscribe to Newsletter
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer scroll-reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-tulu-gold/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5 bg-white">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <h3 className="font-display text-lg font-medium mt-2 line-clamp-2">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
