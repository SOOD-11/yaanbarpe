
import { Headphones, Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface DetailedBlogPostProps {
  title: string;
  content: React.ReactNode;
  image: string;
  date: string;
  readTime: string;
  author: string;
  authorImage?: string;
  category: string;
  tags: string[];
  audioAvailable?: boolean;
}

const DetailedBlogPost = ({
  title,
  content,
  image,
  date,
  readTime,
  author,
  authorImage = "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
  category,
  tags,
  audioAvailable = false
}: DetailedBlogPostProps) => {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="bg-tulu-gold text-white text-sm font-medium px-3 py-1 rounded-full">
          {category}
        </span>
        
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold my-6 text-tulu-blue">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
          <span>•</span>
          <span>{readTime}</span>
          <span>•</span>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              <img src={authorImage} alt={author} className="w-full h-full object-cover" />
            </div>
            <span>{author}</span>
          </div>
          
          {audioAvailable && (
            <>
              <span>•</span>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-tulu-gold hover:text-tulu-gold/80 hover:bg-tulu-gold/10 flex items-center gap-1 h-8 px-3"
              >
                <Headphones className="w-4 h-4" />
                <span>Listen</span>
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="rounded-2xl overflow-hidden mb-10 image-shine">
        <img 
          src={image} 
          alt={title}
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="prose prose-lg max-w-none">
        {content}
      </div>
      
      <div className="mt-12 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-tulu-sand px-3 py-1 rounded-full text-sm hover:bg-tulu-sand/80 cursor-pointer transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Separator className="my-10" />
      
      <div className="rounded-xl border p-6 flex flex-col sm:flex-row gap-6 items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
          <img src={authorImage} alt={author} className="w-full h-full object-cover" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">About {author}</h3>
          <p className="text-muted-foreground mb-4">
            Cultural researcher and writer specializing in the traditions and heritage of Tulu Nadu. With over a decade of experience documenting the region's unique practices.
          </p>
          <Button variant="outline" size="sm" className="text-tulu-blue">
            View More Articles
          </Button>
        </div>
      </div>
      
      <div className="mt-16">
        <h3 className="font-display text-2xl font-bold mb-6">Related Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
            <div className="h-40 overflow-hidden">
              <img 
                src="https://source.unsplash.com/photo-1517022812141-23620dba5c23" 
                alt="Related article" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-sm text-muted-foreground">April 22, 2025</span>
              <h4 className="font-medium mt-1 mb-3">The Annual Tiger Dance Festival of Mangaluru</h4>
              <Button variant="link" className="text-tulu-blue p-0 h-auto flex items-center group">
                Read Article
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
            <div className="h-40 overflow-hidden">
              <img 
                src="https://source.unsplash.com/photo-1466442929976-97f336a657be" 
                alt="Related article" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-sm text-muted-foreground">May 1, 2025</span>
              <h4 className="font-medium mt-1 mb-3">Exploring the Temple Architecture of Udupi</h4>
              <Button variant="link" className="text-tulu-blue p-0 h-auto flex items-center group">
                Read Article
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DetailedBlogPost;
