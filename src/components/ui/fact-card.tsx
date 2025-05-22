
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { addPoints } from "@/lib/gamification";
import { toast } from "@/hooks/use-toast";

const facts = [
  "Tulu is one of the five Dravidian languages of South India with a rich literary tradition.",
  "Yakshagana, a traditional theater form, combines dance, music, dialogue, costume, and stage techniques.",
  "Kambala, the buffalo race, is a traditional sport of coastal Karnataka with a history of over 800 years.",
  "The Tulunadu region has over 400 varieties of mangoes, many of which are indigenous.",
  "Buta Kola is a spirit worship ritual performed by the Tulu community.",
  "Udupi cuisine is one of the most famous vegetarian cuisines in India.",
  "The Netravathi river, flowing through Tulu Nadu, is considered sacred by the locals.",
  "Tulunadu has a unique form of matrilineal inheritance system called Aliyasantana."
];

export function FactCard() {
  const [fact, setFact] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    getNewFact();
    
    // Update fact daily
    const lastFactDate = localStorage.getItem('lastFactDate');
    const today = new Date().toDateString();
    
    if (lastFactDate !== today) {
      setIsNew(true);
      localStorage.setItem('lastFactDate', today);
    }
  }, []);
  
  const getNewFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    const newFact = facts[randomIndex];
    setFact(newFact);
  };
  
  const handleFactRead = () => {
    if (isNew) {
      const levelUp = addPoints(5, "Learning new facts");
      
      if (levelUp > 0) {
        toast({
          title: "Level Up!",
          description: `You've reached level ${levelUp}!`,
          duration: 3000,
        });
      } else {
        toast({
          title: "+5 points",
          description: "Thanks for learning about Tulu Nadu!",
          duration: 2000,
        });
      }
      
      setIsNew(false);
    }
    
    setExpanded(!expanded);
  };
  
  return (
    <div className={cn(
      "bg-[#EDE8D0] border border-[#00555A]/20 rounded-lg p-4 mb-6 transition-all",
      expanded ? "shadow-md" : "shadow-sm hover:shadow-md"
    )}>
      <div className="flex items-start gap-3">
        <div className="bg-[#00555A] rounded-full p-2 shrink-0">
          <Lightbulb className="text-white h-5 w-5" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-[#00555A]">Did You Know?</h4>
            {isNew && (
              <span className="bg-[#CC4E5C] text-white text-xs px-2 py-1 rounded-full">New</span>
            )}
          </div>
          
          <p className={cn(
            "text-sm text-muted-foreground transition-all",
            expanded ? "line-clamp-none" : "line-clamp-2"
          )}>
            {fact}
          </p>
          
          <Button 
            variant="link" 
            size="sm" 
            className="p-0 h-auto mt-1 text-[#CC4E5C]"
            onClick={handleFactRead}
          >
            {expanded ? "Show less" : "Read more"}
          </Button>
        </div>
      </div>
    </div>
  );
}
