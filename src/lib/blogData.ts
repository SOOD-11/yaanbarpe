
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  authorImage?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  audioAvailable?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "yakshagana-legacy",
    title: "The Intricate Artistry of Yakshagana: A 700-Year Legacy",
    excerpt: "Delve into the vibrant world of Yakshagana, the traditional theatre form that has shaped Tulu Nadu's cultural identity for centuries, featuring elaborate costumes, mesmerizing dance movements, and compelling storytelling techniques.",
    content: `
      <p>In the verdant coastal plains of Karnataka, where the Western Ghats meet the Arabian Sea, exists a cultural treasure unlike any other. Yakshagana, a 700-year-old traditional theatre form, stands as one of Tulu Nadu's most magnificent artistic expressions, combining elaborate costumes, mesmerizing dance movements, dramatic makeup, and compelling storytelling to create an immersive spectacle that has defined the region's cultural identity for centuries.</p>

      <h2>The Origins of a Cultural Masterpiece</h2>
      <p>The word "Yakshagana" derives from "Yaksha" (celestial beings in Hindu mythology) and "gana" (song), literally translating to "song of the celestial beings." Historical evidence traces its origins to the 13th century, though it reached its artistic zenith during the 16th century under the patronage of the Vijayanagara Empire.</p>

      <p>Unlike many classical art forms that were confined to royal courts, Yakshagana evolved as a people's art form, performed in village squares, temple courtyards, and paddy fields after harvest. This accessible nature allowed it to absorb influences from diverse communities across the region, making it a true reflection of Tulu Nadu's composite cultural identity.</p>

      <h2>The Elaborate Artistry</h2>
      <p>What distinguishes Yakshagana is its extraordinary attention to detail across multiple artistic dimensions. Perhaps the most visually striking element is its elaborate costume design. Performers wear towering headgear (mundasu) adorned with intricate patterns and motifs that can extend nearly two feet above their heads.</p>

      <p>The costume includes a jacket (kavacha) with mirror work and embroidery, a dhoti styled distinctively, and ornate jewelry that transforms the performer into a larger-than-life character. The facial makeup, applied by specialized artists over several hours, uses natural pigments and follows strict character-specific patterns.</p>

      <h2>Musical Heritage and Modern Preservation</h2>
      <p>The music of Yakshagana deserves special attention as a distinctive classical tradition. Led by the bhagavata (singer-narrator), the music employs ragas unique to the Tulu Nadu region, accompanied by maddale (percussion), chende (drum), and harmonium.</p>

      <p>Today, Yakshagana supports a vibrant economic ecosystem in Tulu Nadu. The region's 78 active professional troupes contribute approximately ₹42 crore annually through performances, while creating livelihood opportunities for over 3,000 artists and supporting craftspeople.</p>
    `,
    image: "https://images.pexels.com/photos/2773927/pexels-photo-2773927.jpeg",
    date: "May 18, 2025",
    readTime: "12 min read",
    author: "Deepak Shetty",
    authorImage: "https://i.pravatar.cc/150?img=1",
    category: "Cultural Heritage",
    tags: ["Yakshagana", "Performance Art", "Cultural Heritage", "Tulu Nadu", "Traditional Theatre"],
    featured: true,
    audioAvailable: true
  },
  {
    id: "bhuta-kola-rituals",
    title: "Sacred Rituals of Bhuta Kola: Connecting with Guardian Spirits",
    excerpt: "Experience the mystical ancient ritual of Bhuta Kola, where elaborate ceremonies invoke guardian spirits through sacred performances that have sustained coastal Karnataka's spiritual ecosystem for generations.",
    content: `
      <p>In the moonlit courtyards of coastal Karnataka, an ancient ritual unfolds that bridges the earthly and divine realms. Bhuta Kola, literally meaning "worship of spirits," represents one of the most profound spiritual traditions of Tulu Nadu, where elaborate ceremonies invoke guardian spirits through sacred performances that have sustained the region's spiritual ecosystem for over a millennium.</p>

      <h2>The Sacred Universe of Bhuta Kola</h2>
      <p>Bhuta Kola is not merely a performance; it is a living embodiment of ancient animistic beliefs that recognize the presence of protective spirits (Bhutas) in every aspect of life. These guardian spirits are believed to protect villages, families, and individuals from harm while ensuring prosperity and well-being.</p>

      <p>The ritual typically begins at dusk and continues through the night, creating a transformative experience for both participants and observers. The performer, known as the "impersonator," undergoes an intense spiritual preparation that includes fasting, meditation, and ritual purification before embodying the spirit.</p>

      <h2>The Transformation Process</h2>
      <p>The most striking aspect of Bhuta Kola is the elaborate costume and makeup transformation. The performer's face is painted with intricate designs using natural pigments - vermillion, turmeric, and charcoal create bold patterns that represent different spirits. Each design follows ancient iconographic traditions passed down through generations.</p>

      <p>The costume includes elaborate headgear made from arecanut palm leaves, coconut fronds, and flowers, creating towering structures that can reach eight feet in height. Silver ornaments, bells, and traditional weapons complete the transformation, turning the performer into a living deity.</p>

      <h2>Spiritual Significance and Community Healing</h2>
      <p>Beyond its theatrical elements, Bhuta Kola serves as a powerful mechanism for community healing and conflict resolution. During the ritual, community members present their problems, disputes, and concerns to the spirit through the performer. The spirit, speaking through the impersonator, provides guidance, resolves conflicts, and offers blessings.</p>

      <p>This tradition has maintained its relevance in modern times, with many people continuing to seek spiritual guidance through Bhuta Kola, especially during times of crisis or important life transitions.</p>
    `,
    image: "https://images.pexels.com/photos/5859323/pexels-photo-5859323.jpeg",
    date: "May 12, 2025",
    readTime: "8 min read",
    author: "Radha Hegde",
    authorImage: "https://i.pravatar.cc/150?img=5",
    category: "Spiritual Traditions",
    tags: ["Bhuta Kola", "Spiritual Rituals", "Guardian Spirits", "Tulu Nadu", "Ancient Traditions"],
    audioAvailable: true
  },
  {
    id: "coastal-cuisine",
    title: "Coastal Cuisine: The Flavors that Define Tulu Nadu",
    excerpt: "Explore the distinctive culinary traditions of coastal Karnataka, where coconut, fresh seafood, and unique spice blends come together to create a cuisine unlike any other in India.",
    content: `
      <p>The cuisine of Tulu Nadu is a symphony of flavors that mirrors the region's coastal geography and cultural diversity. Where the Western Ghats meet the Arabian Sea, a unique culinary tradition has evolved that combines the abundance of the ocean with the spices of the mountains, creating dishes that are both distinctive and deeply rooted in local traditions.</p>

      <h2>The Foundation: Coconut and Spices</h2>
      <p>At the heart of Tulu Nadu cuisine lies the coconut - not just as an ingredient, but as a way of life. Every part of the coconut finds its way into the kitchen: fresh coconut is grated for curries, coconut oil provides the cooking medium, coconut milk adds richness to dishes, and even coconut palm sap is fermented to create the mildly alcoholic toddy that accompanies many meals.</p>

      <p>The spice palette of Tulu Nadu is unique in India, featuring combinations rarely found elsewhere. Byadgi chilies provide color without excessive heat, while kokum adds a distinctive sourness to curries. Ghangal (dried garcinia) and tamarind create complex flavor profiles that define the region's signature dishes.</p>

      <h2>Seafood: The Ocean's Bounty</h2>
      <p>With a 320-kilometer coastline, seafood naturally dominates Tulu Nadu's culinary landscape. Fish curry and rice form the staple meal, but the preparation methods showcase remarkable diversity. Kane (kingfish) rava fry represents the region's mastery of crispy, spiced seafood preparations.</p>

      <p>Crab curry, prepared with fresh coconut and aromatic spices, demonstrates the sophisticated flavor balancing that characterizes local cooking. Prawns are prepared in coconut-based curries or dried and used as flavor enhancers in vegetable dishes.</p>

      <h2>Vegetarian Delicacies and Fermented Foods</h2>
      <p>Despite the prominence of seafood, Tulu Nadu boasts an impressive array of vegetarian specialties. Patrode, made from colocasia leaves stuffed with spiced rice paste and steamed, represents the region's ingenious use of local vegetation.</p>

      <p>Fermentation plays a crucial role in the cuisine. Neer dosa, a delicate, lace-like crepe made from fermented rice batter, serves as the perfect accompaniment to spicy curries. Moode, steamed rice dumplings wrapped in jackfruit leaves, showcase traditional preservation techniques.</p>

      <h2>Sweet Traditions and Festival Foods</h2>
      <p>Tulu Nadu's sweet preparations reflect both religious traditions and seasonal celebrations. Payasa, a coconut milk-based sweet preparation, varies according to the grain used - rice, wheat, or vermicelli - each creating distinct textures and flavors.</p>

      <p>During festivals, special preparations like chiroti (layered sweet bread) and mysore pak demonstrate the community's collective culinary skills, often prepared in large quantities for temple festivals and community celebrations.</p>
    `,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    date: "May 21, 2025",
    readTime: "10 min read",
    author: "Akshay Kamath",
    authorImage: "https://i.pravatar.cc/150?img=3",
    category: "Food & Cuisine",
    tags: ["Coastal Cuisine", "Seafood", "Coconut", "Traditional Cooking", "Tulu Nadu"],
    audioAvailable: true
  },
  {
    id: "tiger-dance-tradition",
    title: "The Ancient Tiger Dance of Mangaluru",
    excerpt: "Discover the vibrant Pili Vesha (Tiger Dance) tradition that brings color and energy to Mangaluru's Dasara celebrations, with performers adorned in striking tiger body paint and costumes.",
    content: `
      <p>Every year during Dasara, the streets of Mangaluru come alive with the thunderous roars and vibrant colors of Pili Vesha, the traditional Tiger Dance that has captivated audiences for over 150 years. This spectacular folk art form transforms ordinary men into magnificent tigers through intricate body painting and energetic performances that embody the raw power and grace of the king of the jungle.</p>

      <h2>Origins and Evolution</h2>
      <p>Pili Vesha originated in the late 19th century in the villages around Mangaluru, born from the region's ancient tradition of spirit worship and animal reverence. The dance was initially performed to honor Goddess Sharada during Navratri celebrations, with the tiger representing her vahana (divine vehicle).</p>

      <p>What began as a simple village ritual has evolved into one of Karnataka's most recognizable cultural expressions, drawing thousands of spectators and participants from across the state and beyond.</p>

      <h2>The Art of Transformation</h2>
      <p>The most striking aspect of Pili Vesha is the elaborate body painting process that transforms performers into living tigers. Using only natural pigments - yellow ochre for the base, charcoal for the black stripes, and vermillion for accents - skilled artists spend 3-4 hours creating intricate tiger patterns on the dancer's body.</p>

      <p>The painting process is itself a ritual, with specific patterns and techniques passed down through generations. Each troupe has its signature style, and master painters are revered for their ability to create lifelike tiger appearances that seem to move and breathe with the dancer's movements.</p>

      <h2>The Performance: Energy and Athleticism</h2>
      <p>Pili Vesha is as much about athletic prowess as artistic expression. Performers must possess exceptional stamina and agility to execute the demanding choreography that includes powerful leaps, acrobatic rolls, and synchronized group movements that mimic tiger behavior.</p>

      <p>The dance is accompanied by traditional percussion instruments - the chende (drums), gongs, and trumpets - creating a rhythm that drives the performers to increasingly energetic displays. The sound of dozens of drums reverberating through the streets creates an almost hypnotic atmosphere.</p>

      <h2>Community and Cultural Significance</h2>
      <p>Pili Vesha represents more than entertainment; it embodies the community spirit of Mangaluru. Entire neighborhoods come together to support their local troupes, with families contributing to costume expenses and young men training year-round for the annual performances.</p>

      <p>The tradition serves as a bridge between generations, with elderly masters training young performers in the intricate techniques of movement and expression. This knowledge transfer ensures the continuation of authentic techniques while allowing for creative evolution.</p>

      <p>Today, Pili Vesha has gained international recognition, with troupes performing in cultural festivals worldwide, carrying the spirit of Tulu Nadu's vibrant traditions to global audiences.</p>
    `,
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    date: "May 5, 2025",
    readTime: "7 min read",
    author: "Pramod Shetty",
    authorImage: "https://i.pravatar.cc/150?img=7",
    category: "Folk Traditions",
    tags: ["Tiger Dance", "Pili Vesha", "Dasara", "Folk Art", "Mangaluru"],
    audioAvailable: true
  }
];

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};
