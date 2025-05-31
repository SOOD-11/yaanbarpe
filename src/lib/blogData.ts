
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
      <div class="space-y-8">
        <p class="text-lg leading-relaxed">In the verdant coastal plains of Karnataka, where the Western Ghats meet the Arabian Sea, exists a cultural treasure unlike any other. Yakshagana, a 700-year-old traditional theatre form, stands as one of Tulu Nadu's most magnificent artistic expressions, combining elaborate costumes, mesmerizing dance movements, dramatic makeup, and compelling storytelling to create an immersive spectacle that has defined the region's cultural identity for centuries.</p>

        <div class="bg-gradient-to-r from-blue-50 to-yellow-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h3 class="text-xl font-bold text-blue-700 mb-3">Quick Facts About Yakshagana</h3>
          <ul class="space-y-2 text-gray-700">
            <li>• <strong>Age:</strong> Over 700 years old</li>
            <li>• <strong>Origin:</strong> Coastal Karnataka (Tulu Nadu region)</li>
            <li>• <strong>Performance Duration:</strong> 6-8 hours (traditionally all night)</li>
            <li>• <strong>Active Troupes:</strong> 78 professional groups</li>
            <li>• <strong>Annual Economic Impact:</strong> ₹42 crore</li>
          </ul>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">The Origins of a Cultural Masterpiece</h2>
        <p class="leading-relaxed">The word "Yakshagana" derives from "Yaksha" (celestial beings in Hindu mythology) and "gana" (song), literally translating to "song of the celestial beings." Historical evidence traces its origins to the 13th century, though it reached its artistic zenith during the 16th century under the patronage of the Vijayanagara Empire.</p>

        <p class="leading-relaxed">Unlike many classical art forms that were confined to royal courts, Yakshagana evolved as a people's art form, performed in village squares, temple courtyards, and paddy fields after harvest. This accessible nature allowed it to absorb influences from diverse communities across the region, making it a true reflection of Tulu Nadu's composite cultural identity.</p>

        <div class="bg-yellow-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-yellow-800 mb-3">🎭 Performance Elements</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-bold text-yellow-700">Visual Elements:</h4>
              <ul class="text-sm text-gray-700 mt-2 space-y-1">
                <li>• Elaborate costumes (Kavacha)</li>
                <li>• Towering headgear (Mundasu)</li>
                <li>• Intricate facial makeup</li>
                <li>• Traditional jewelry</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-yellow-700">Performance Elements:</h4>
              <ul class="text-sm text-gray-700 mt-2 space-y-1">
                <li>• Epic storytelling</li>
                <li>• Classical dance movements</li>
                <li>• Live musical accompaniment</li>
                <li>• Audience interaction</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">The Elaborate Artistry</h2>
        <p class="leading-relaxed">What distinguishes Yakshagana is its extraordinary attention to detail across multiple artistic dimensions. Perhaps the most visually striking element is its elaborate costume design. Performers wear towering headgear (mundasu) adorned with intricate patterns and motifs that can extend nearly two feet above their heads.</p>

        <p class="leading-relaxed">The costume includes a jacket (kavacha) with mirror work and embroidery, a dhoti styled distinctively, and ornate jewelry that transforms the performer into a larger-than-life character. The facial makeup, applied by specialized artists over several hours, uses natural pigments and follows strict character-specific patterns.</p>

        <div class="bg-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-blue-800 mb-3">🎵 Musical Heritage</h3>
          <p class="text-gray-700 leading-relaxed">The music of Yakshagana deserves special attention as a distinctive classical tradition. Led by the bhagavata (singer-narrator), the music employs ragas unique to the Tulu Nadu region, accompanied by:</p>
          <ul class="mt-3 space-y-2 text-gray-700">
            <li>• <strong>Maddale:</strong> Traditional percussion instrument</li>
            <li>• <strong>Chende:</strong> Powerful drum beats</li>
            <li>• <strong>Harmonium:</strong> Melodic accompaniment</li>
            <li>• <strong>Taala:</strong> Rhythmic cymbals</li>
          </ul>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Modern Preservation and Economic Impact</h2>
        <p class="leading-relaxed">Today, Yakshagana supports a vibrant economic ecosystem in Tulu Nadu. The region's 78 active professional troupes contribute approximately ₹42 crore annually through performances, while creating livelihood opportunities for over 3,000 artists and supporting craftspeople.</p>

        <p class="leading-relaxed">Educational institutions like the Yakshagana Kendra in Udupi and government-sponsored training programs ensure the transmission of traditional knowledge to younger generations. Digital documentation projects are preserving rare compositions and performance techniques for future scholars and artists.</p>

        <div class="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 class="text-xl font-semibold text-green-800 mb-3">🌟 UNESCO Recognition</h3>
          <p class="text-gray-700">Yakshagana is being considered for UNESCO Intangible Cultural Heritage status, recognizing its significance not just to Karnataka but to world cultural heritage. This recognition would provide additional support for preservation efforts and international exposure.</p>
        </div>
      </div>
    `,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80",
    date: "May 18, 2025",
    readTime: "12 min read",
    author: "Dr. Deepak Shetty",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
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
      <div class="space-y-8">
        <p class="text-lg leading-relaxed">In the moonlit courtyards of coastal Karnataka, an ancient ritual unfolds that bridges the earthly and divine realms. Bhuta Kola, literally meaning "worship of spirits," represents one of the most profound spiritual traditions of Tulu Nadu, where elaborate ceremonies invoke guardian spirits through sacred performances that have sustained the region's spiritual ecosystem for over a millennium.</p>

        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border-l-4 border-purple-500">
          <h3 class="text-xl font-bold text-purple-700 mb-3">The Sacred Universe of Bhuta Kola</h3>
          <p class="text-gray-700">Bhuta Kola is not merely a performance; it is a living embodiment of ancient animistic beliefs that recognize the presence of protective spirits (Bhutas) in every aspect of life.</p>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">The Transformation Process</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-orange-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-orange-800 mb-3">🎨 Makeup & Costume</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>Face Painting:</strong> Intricate designs using natural pigments</li>
              <li>• <strong>Headgear:</strong> Towering structures up to 8 feet tall</li>
              <li>• <strong>Materials:</strong> Arecanut palm leaves, coconut fronds</li>
              <li>• <strong>Ornaments:</strong> Silver jewelry and traditional weapons</li>
            </ul>
          </div>
          
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-800 mb-3">⏰ Ritual Timeline</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>Preparation:</strong> 3-4 hours before sunset</li>
              <li>• <strong>Invocation:</strong> Begins at dusk</li>
              <li>• <strong>Performance:</strong> Continues through the night</li>
              <li>• <strong>Conclusion:</strong> At dawn with blessings</li>
            </ul>
          </div>
        </div>

        <p class="leading-relaxed">The most striking aspect of Bhuta Kola is the elaborate costume and makeup transformation. The performer's face is painted with intricate designs using natural pigments - vermillion, turmeric, and charcoal create bold patterns that represent different spirits. Each design follows ancient iconographic traditions passed down through generations.</p>

        <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 class="text-xl font-semibold text-yellow-800 mb-3">🏛️ Types of Bhuta Spirits</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="text-center">
              <h4 class="font-bold text-yellow-700">Guliga</h4>
              <p class="text-sm text-gray-600">Fierce protector spirit</p>
            </div>
            <div class="text-center">
              <h4 class="font-bold text-yellow-700">Kallurti</h4>
              <p class="text-sm text-gray-600">Guardian of boundaries</p>
            </div>
            <div class="text-center">
              <h4 class="font-bold text-yellow-700">Panjurli</h4>
              <p class="text-sm text-gray-600">Boar spirit deity</p>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Spiritual Significance and Community Healing</h2>
        <p class="leading-relaxed">Beyond its theatrical elements, Bhuta Kola serves as a powerful mechanism for community healing and conflict resolution. During the ritual, community members present their problems, disputes, and concerns to the spirit through the performer. The spirit, speaking through the impersonator, provides guidance, resolves conflicts, and offers blessings.</p>

        <div class="bg-green-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-green-800 mb-3">🌿 Modern Relevance</h3>
          <p class="text-gray-700 leading-relaxed">This tradition has maintained its relevance in modern times, with many people continuing to seek spiritual guidance through Bhuta Kola, especially during times of crisis or important life transitions. The ritual serves as a bridge between traditional wisdom and contemporary challenges.</p>
        </div>

        <p class="leading-relaxed">The economic impact of Bhuta Kola extends beyond the spiritual realm. Professional performers, costume makers, musicians, and ritual specialists derive significant income from these ceremonies, supporting entire families and preserving traditional crafts.</p>
      </div>
    `,
    image: "https://images.unsplash.com/photo-1578161816900-9145b3c4dbf5?w=1200&q=80",
    date: "May 12, 2025",
    readTime: "8 min read",
    author: "Dr. Radha Hegde",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&q=80",
    category: "Spiritual Traditions",
    tags: ["Bhuta Kola", "Spiritual Rituals", "Guardian Spirits", "Tulu Nadu", "Ancient Traditions"],
    audioAvailable: true
  },
  {
    id: "coastal-cuisine",
    title: "Coastal Cuisine: The Flavors that Define Tulu Nadu",
    excerpt: "Explore the distinctive culinary traditions of coastal Karnataka, where coconut, fresh seafood, and unique spice blends come together to create a cuisine unlike any other in India.",
    content: `
      <div class="space-y-8">
        <p class="text-lg leading-relaxed">The cuisine of Tulu Nadu is a symphony of flavors that mirrors the region's coastal geography and cultural diversity. Where the Western Ghats meet the Arabian Sea, a unique culinary tradition has evolved that combines the abundance of the ocean with the spices of the mountains, creating dishes that are both distinctive and deeply rooted in local traditions.</p>

        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-500">
          <h3 class="text-xl font-bold text-green-700 mb-3">🥥 The Foundation: Coconut Culture</h3>
          <p class="text-gray-700">At the heart of Tulu Nadu cuisine lies the coconut - not just as an ingredient, but as a way of life. Every part finds its way into the kitchen.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-orange-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-orange-800 mb-3">🌶️ Signature Spices</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>Byadgi Chilies:</strong> Color without excessive heat</li>
              <li>• <strong>Kokum:</strong> Distinctive sourness</li>
              <li>• <strong>Ghangal:</strong> Dried garcinia for tang</li>
              <li>• <strong>Tamarind:</strong> Complex flavor profiles</li>
              <li>• <strong>Curry Leaves:</strong> Aromatic base</li>
            </ul>
          </div>
          
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-800 mb-3">🐟 Ocean's Bounty</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>Kane (Kingfish):</strong> Most prized catch</li>
              <li>• <strong>Pomfret:</strong> Delicate white fish</li>
              <li>• <strong>Mackerel:</strong> Common daily fish</li>
              <li>• <strong>Prawns:</strong> Various sizes and preparations</li>
              <li>• <strong>Crabs:</strong> Specialty coastal delicacy</li>
            </ul>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Signature Dishes</h2>
        
        <div class="space-y-6">
          <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 class="text-xl font-semibold text-yellow-800 mb-3">🍛 Fish Curry & Rice</h3>
            <p class="text-gray-700 leading-relaxed">The quintessential Tulu Nadu meal, featuring fresh fish cooked in coconut-based curry with kokum, served with steamed red rice. Each family has its secret spice blend passed down through generations.</p>
            <div class="mt-3 text-sm text-gray-600">
              <strong>Preparation Time:</strong> 45 minutes | <strong>Serves:</strong> 4-6 people
            </div>
          </div>

          <div class="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 class="text-xl font-semibold text-green-800 mb-3">🥞 Neer Dosa</h3>
            <p class="text-gray-700 leading-relaxed">Delicate, lace-like crepes made from fermented rice batter. These paper-thin dosas are perfect accompaniments to spicy curries and are a testament to the region's mastery of fermentation techniques.</p>
            <div class="mt-3 text-sm text-gray-600">
              <strong>Texture:</strong> Light and airy | <strong>Best served:</strong> Hot with coconut chutney
            </div>
          </div>

          <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 class="text-xl font-semibold text-purple-800 mb-3">🌿 Patrode</h3>
            <p class="text-gray-700 leading-relaxed">Colocasia leaves stuffed with spiced rice paste and steamed to perfection. This ingenious dish showcases the region's creative use of local vegetation and traditional steaming techniques.</p>
            <div class="mt-3 text-sm text-gray-600">
              <strong>Key Ingredient:</strong> Colocasia leaves | <strong>Cooking Method:</strong> Steaming
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Festival Foods & Sweet Traditions</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-pink-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-pink-800 mb-3">🍯 Sweet Delights</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>Payasa:</strong> Coconut milk-based sweet</li>
              <li>• <strong>Chiroti:</strong> Layered sweet bread</li>
              <li>• <strong>Mysore Pak:</strong> Festival specialty</li>
              <li>• <strong>Holige:</strong> Stuffed sweet flatbread</li>
            </ul>
          </div>
          
          <div class="bg-indigo-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-indigo-800 mb-3">🎉 Festival Specials</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>Moode:</strong> Steamed in jackfruit leaves</li>
              <li>• <strong>Kadubu:</strong> Rice dumplings</li>
              <li>• <strong>Pundi:</strong> Spiced rice balls</li>
              <li>• <strong>Goli Baje:</strong> Crispy fritters</li>
            </ul>
          </div>
        </div>

        <div class="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 class="text-xl font-semibold text-red-800 mb-3">👨‍🍳 Cooking Techniques</h3>
          <p class="text-gray-700 leading-relaxed">Tulu Nadu cuisine employs unique cooking methods including steaming in banana and jackfruit leaves, tempering with curry leaves and mustard seeds, and the extensive use of clay pots that impart earthy flavors to the food. These traditional techniques not only enhance flavors but also preserve the nutritional value of ingredients.</p>
        </div>

        <p class="leading-relaxed">Today, Tulu Nadu cuisine is gaining recognition beyond coastal Karnataka, with restaurants in major cities serving authentic coastal delicacies. However, the true essence of this cuisine can only be experienced in the traditional homes and local eateries of the region, where recipes continue to be prepared with the same love and care passed down through generations.</p>
      </div>
    `,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&q=80",
    date: "May 21, 2025",
    readTime: "10 min read",
    author: "Chef Akshay Kamath",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    category: "Food & Cuisine",
    tags: ["Coastal Cuisine", "Seafood", "Coconut", "Traditional Cooking", "Tulu Nadu"],
    audioAvailable: true
  },
  {
    id: "tiger-dance-tradition",
    title: "The Ancient Tiger Dance of Mangaluru",
    excerpt: "Discover the vibrant Pili Vesha (Tiger Dance) tradition that brings color and energy to Mangaluru's Dasara celebrations, with performers adorned in striking tiger body paint and costumes.",
    content: `
      <div class="space-y-8">
        <p class="text-lg leading-relaxed">Every year during Dasara, the streets of Mangaluru come alive with the thunderous roars and vibrant colors of Pili Vesha, the traditional Tiger Dance that has captivated audiences for over 150 years. This spectacular folk art form transforms ordinary men into magnificent tigers through intricate body painting and energetic performances that embody the raw power and grace of the king of the jungle.</p>

        <div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-orange-500">
          <h3 class="text-xl font-bold text-orange-700 mb-3">🐅 The Tiger Transformation</h3>
          <p class="text-gray-700">Pili Vesha originated in the late 19th century, born from the region's ancient tradition of spirit worship and animal reverence.</p>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Origins and Evolution</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-yellow-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-yellow-800 mb-3">📅 Historical Timeline</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>1870s:</strong> First documented performances</li>
              <li>• <strong>1900s:</strong> Spread across coastal districts</li>
              <li>• <strong>1950s:</strong> Organized troupe formations</li>
              <li>• <strong>2000s:</strong> International recognition</li>
            </ul>
          </div>
          
          <div class="bg-green-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-green-800 mb-3">🌟 Cultural Significance</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Honors Goddess Sharada</li>
              <li>• Represents divine protection</li>
              <li>• Community bonding ritual</li>
              <li>• Artistic expression medium</li>
            </ul>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">The Art of Transformation</h2>
        <p class="leading-relaxed">The most striking aspect of Pili Vesha is the elaborate body painting process that transforms performers into living tigers. Using only natural pigments - yellow ochre for the base, charcoal for the black stripes, and vermillion for accents - skilled artists spend 3-4 hours creating intricate tiger patterns on the dancer's body.</p>

        <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 class="text-xl font-semibold text-blue-800 mb-3">🎨 Painting Process</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
              <div>
                <h4 class="font-semibold">Base Preparation (30 minutes)</h4>
                <p class="text-sm text-gray-600">Yellow ochre applied as foundation coat</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
              <div>
                <h4 class="font-semibold">Stripe Creation (2 hours)</h4>
                <p class="text-sm text-gray-600">Black charcoal stripes painted with precision</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
              <div>
                <h4 class="font-semibold">Final Details (1 hour)</h4>
                <p class="text-sm text-gray-600">Vermillion accents and facial features</p>
              </div>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">The Performance: Energy and Athleticism</h2>
        
        <div class="space-y-6">
          <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 class="text-xl font-semibold text-purple-800 mb-3">💪 Athletic Requirements</h3>
            <p class="text-gray-700 leading-relaxed">Pili Vesha is as much about athletic prowess as artistic expression. Performers must possess exceptional stamina and agility to execute the demanding choreography that includes powerful leaps, acrobatic rolls, and synchronized group movements that mimic tiger behavior.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-red-50 p-4 rounded-lg text-center">
              <h4 class="font-bold text-red-700">Strength</h4>
              <p class="text-sm text-gray-600">Core and leg strength for jumps</p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg text-center">
              <h4 class="font-bold text-orange-700">Agility</h4>
              <p class="text-sm text-gray-600">Quick movements and rolls</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg text-center">
              <h4 class="font-bold text-yellow-700">Endurance</h4>
              <p class="text-sm text-gray-600">Hours of continuous performance</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">🥁 Musical Accompaniment</h3>
          <p class="text-gray-700 leading-relaxed">The dance is accompanied by traditional percussion instruments - the chende (drums), gongs, and trumpets - creating a rhythm that drives the performers to increasingly energetic displays. The sound of dozens of drums reverberating through the streets creates an almost hypnotic atmosphere.</p>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Community and Cultural Impact</h2>
        <p class="leading-relaxed">Pili Vesha represents more than entertainment; it embodies the community spirit of Mangaluru. Entire neighborhoods come together to support their local troupes, with families contributing to costume expenses and young men training year-round for the annual performances.</p>

        <div class="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 class="text-xl font-semibold text-green-800 mb-3">🌍 Global Recognition</h3>
          <p class="text-gray-700 leading-relaxed">Today, Pili Vesha has gained international recognition, with troupes performing in cultural festivals worldwide, carrying the spirit of Tulu Nadu's vibrant traditions to global audiences. The art form has been featured in documentaries, cultural exhibitions, and international folk festivals.</p>
        </div>

        <p class="leading-relaxed">The tradition serves as a bridge between generations, with elderly masters training young performers in the intricate techniques of movement and expression. This knowledge transfer ensures the continuation of authentic techniques while allowing for creative evolution.</p>
      </div>
    `,
    image: "https://images.unsplash.com/photo-1578769522753-dfd0d99daa9d?w=1200&q=80",
    date: "May 5, 2025",
    readTime: "7 min read",
    author: "Pramod Shetty",
    authorImage: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&q=80",
    category: "Folk Traditions",
    tags: ["Tiger Dance", "Pili Vesha", "Dasara", "Folk Art", "Mangaluru"],
    audioAvailable: true
  },
  {
    id: "kambala-buffalo-races",
    title: "Kambala: The Thrilling Buffalo Races of Coastal Karnataka",
    excerpt: "Experience the adrenaline rush of Kambala, the traditional buffalo races that showcase the unique bond between farmers and their animals while preserving an ancient sporting tradition.",
    content: `
      <div class="space-y-8">
        <p class="text-lg leading-relaxed">In the muddy fields of coastal Karnataka, an ancient sport unfolds that combines speed, skill, and the remarkable bond between humans and buffalo. Kambala, the traditional buffalo race, is more than just a sporting event—it's a celebration of agricultural heritage, community spirit, and the extraordinary relationship between farmers and their prized animals.</p>

        <div class="bg-gradient-to-r from-brown-50 to-green-50 p-6 rounded-lg border-l-4 border-amber-500">
          <h3 class="text-xl font-bold text-amber-700 mb-3">🏃‍♂️ The Sport of Champions</h3>
          <p class="text-gray-700">Kambala races can reach speeds of up to 60 km/h, with some buffalo achieving times that rival professional sprinters!</p>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Ancient Origins and Evolution</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-amber-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-amber-800 mb-3">📜 Historical Roots</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>Origin:</strong> Over 800 years old</li>
              <li>• <strong>Purpose:</strong> Agricultural celebration</li>
              <li>• <strong>Season:</strong> Post-harvest festivities</li>
              <li>• <strong>Blessing:</strong> Prayers for good crops</li>
            </ul>
          </div>
          
          <div class="bg-green-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-green-800 mb-3">🏆 Race Categories</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>Negilu Hiriya:</strong> Major league races</li>
              <li>• <strong>Hagga Hiriya:</strong> Smaller buffalo category</li>
              <li>• <strong>Kane Halage:</strong> Wet field races</li>
              <li>• <strong>Adda Halage:</strong> Parallel track racing</li>
            </ul>
          </div>
        </div>

        <p class="leading-relaxed">The sport originated as a ritualistic offering to the gods for a bountiful harvest. Farmers would race their best buffalo through flooded paddy fields, believing that the faster the animals ran, the more pleased the deities would be, ensuring prosperity for the community.</p>

        <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 class="text-xl font-semibold text-blue-800 mb-3">🐃 Buffalo Breeds</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-bold text-blue-700 mb-2">Murrah Buffalo</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Powerful build and speed</li>
                <li>• Excellent in wet conditions</li>
                <li>• Prized for racing ability</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-blue-700 mb-2">Banni Buffalo</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Local Karnataka breed</li>
                <li>• Well-adapted to climate</li>
                <li>• Strong endurance</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">The Racing Experience</h2>
        
        <div class="space-y-6">
          <div class="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 class="text-xl font-semibold text-orange-800 mb-3">🏁 Race Mechanics</h3>
            <p class="text-gray-700 leading-relaxed">The race takes place on a muddy track approximately 120-150 meters long. Two buffalo run in parallel tracks, churning through ankle-deep muddy water. The jockey, called "joduvaannu," holds wooden plows attached to the buffalo and must maintain balance while the animals charge through the slush at incredible speeds.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-red-50 p-4 rounded-lg text-center">
              <h4 class="font-bold text-red-700">Track Length</h4>
              <p class="text-2xl font-bold text-red-600">120-150m</p>
              <p class="text-sm text-gray-600">Standard race distance</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg text-center">
              <h4 class="font-bold text-yellow-700">Top Speed</h4>
              <p class="text-2xl font-bold text-yellow-600">60+ km/h</p>
              <p class="text-sm text-gray-600">Record speeds achieved</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg text-center">
              <h4 class="font-bold text-green-700">Water Depth</h4>
              <p class="text-2xl font-bold text-green-600">6-8 inches</p>
              <p class="text-sm text-gray-600">Muddy field conditions</p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-purple-800 mb-3">👨‍🌾 The Jockey's Skill</h3>
          <p class="text-gray-700 leading-relaxed">Being a Kambala jockey requires exceptional skill and bravery. The jockey must coordinate with the buffalo, maintain balance on the wooden plow, and navigate through splashing mud while encouraging the animals to run faster. Many jockeys develop an almost telepathic connection with their buffalo partners.</p>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Cultural and Economic Impact</h2>
        
        <div class="space-y-6">
          <div class="bg-teal-50 p-6 rounded-lg border border-teal-200">
            <h3 class="text-xl font-semibold text-teal-800 mb-3">💰 Economic Significance</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Prize money can reach ₹1-2 lakhs per race</li>
              <li>• Buffalo breeding has become a significant industry</li>
              <li>• Tourism revenue during race seasons</li>
              <li>• Local businesses benefit from increased footfall</li>
              <li>• Employment for trainers, caretakers, and organizers</li>
            </ul>
          </div>

          <div class="bg-indigo-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-indigo-800 mb-3">🏟️ Modern Developments</h3>
            <p class="text-gray-700 leading-relaxed">Today's Kambala events feature professional timing systems, organized tournaments, and significant prize money. The sport has attracted attention from sports enthusiasts worldwide, with some comparing the speeds achieved to human Olympic sprinting records.</p>
          </div>
        </div>

        <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 class="text-xl font-semibold text-yellow-800 mb-3">🌱 Conservation Efforts</h3>
          <p class="text-gray-700 leading-relaxed">Kambala has played a crucial role in preserving indigenous buffalo breeds. The sport incentivizes farmers to maintain and breed high-quality buffalo, contributing to genetic diversity and conservation of traditional livestock varieties that might otherwise be lost to modernization.</p>
        </div>

        <p class="leading-relaxed">The thunderous sound of hooves, the cheers of spectators, and the sight of magnificent buffalo charging through muddy fields make Kambala an unforgettable experience. It represents the enduring connection between humans and animals, the celebration of agricultural life, and the preservation of cultural traditions in modern times.</p>
      </div>
    `,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&q=80",
    date: "April 28, 2025",
    readTime: "9 min read",
    author: "Manjunath Acharya",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    category: "Sports & Traditions",
    tags: ["Kambala", "Buffalo Racing", "Traditional Sports", "Agriculture", "Karnataka"],
    audioAvailable: true
  },
  {
    id: "temple-architecture",
    title: "Sacred Geometry: The Temple Architecture of Tulu Nadu",
    excerpt: "Discover the intricate architectural marvels of Tulu Nadu's ancient temples, where sacred geometry meets artistic brilliance in structures that have stood for over a millennium.",
    content: `
      <div class="space-y-8">
        <p class="text-lg leading-relaxed">Across the landscape of Tulu Nadu, ancient temples rise like prayers carved in stone, their spires reaching toward the heavens while their foundations remain deeply rooted in spiritual and architectural traditions that span over a thousand years. These sacred structures represent not just places of worship, but masterpieces of engineering, art, and sacred geometry that continue to inspire awe and devotion.</p>

        <div class="bg-gradient-to-r from-gold-50 to-orange-50 p-6 rounded-lg border-l-4 border-amber-500">
          <h3 class="text-xl font-bold text-amber-700 mb-3">🕉️ Sacred Architecture</h3>
          <p class="text-gray-700">Tulu Nadu's temples represent the perfect fusion of Dravidian architectural principles with unique coastal Karnataka innovations.</p>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Architectural Styles and Influences</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-amber-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-amber-800 mb-3">🏛️ Dravidian Style</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Pyramid-shaped towers (Vimanas)</li>
              <li>• Intricate stone carvings</li>
              <li>• Mandapa (pillared halls)</li>
              <li>• Sacred water tanks</li>
            </ul>
          </div>
          
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-800 mb-3">🌊 Coastal Adaptations</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Laterite stone construction</li>
              <li>• Sloped roofs for monsoons</li>
              <li>• Wooden elements integration</li>
              <li>• Tiled roof systems</li>
            </ul>
          </div>

          <div class="bg-green-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-green-800 mb-3">🎨 Artistic Elements</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Intricate relief sculptures</li>
              <li>• Mythological narratives</li>
              <li>• Floral and geometric patterns</li>
              <li>• Divine figure representations</li>
            </ul>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Iconic Temples of Tulu Nadu</h2>
        
        <div class="space-y-6">
          <div class="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 class="text-xl font-semibold text-orange-800 mb-3">🏛️ Udupi Sri Krishna Temple</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-gray-700 leading-relaxed">Founded in the 13th century by Saint Madhvacharya, this temple is renowned for its unique tradition where devotees view the deity through a silver-plated window with nine holes (Navagraha Kitiki).</p>
              </div>
              <div class="space-y-2 text-sm text-gray-600">
                <p><strong>Founded:</strong> 13th century</p>
                <p><strong>Architectural Style:</strong> Dravidian with local adaptations</p>
                <p><strong>Main Feature:</strong> Navagraha Kitiki (nine-holed window)</p>
                <p><strong>Annual Visitors:</strong> Over 1 million</p>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 class="text-xl font-semibold text-purple-800 mb-3">⛩️ Kollur Mookambika Temple</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-gray-700 leading-relaxed">Nestled in the Sahyadri Hills, this ancient temple dedicated to Goddess Mookambika features beautiful woodwork and is considered one of the seven Mukti Kshetras (places of salvation).</p>
              </div>
              <div class="space-y-2 text-sm text-gray-600">
                <p><strong>Location:</strong> Kollur, Western Ghats</p>
                <p><strong>Deity:</strong> Goddess Mookambika</p>
                <p><strong>Significance:</strong> One of seven Mukti Kshetras</p>
                <p><strong>Architecture:</strong> Traditional Kerala-Karnataka fusion</p>
              </div>
            </div>
          </div>

          <div class="bg-teal-50 p-6 rounded-lg border border-teal-200">
            <h3 class="text-xl font-semibold text-teal-800 mb-3">🌸 Dharmasthala Manjunatha Temple</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-gray-700 leading-relaxed">A unique temple where Hindu traditions are maintained by a Jain family, representing the secular harmony of the region. The temple complex includes museums and cultural centers.</p>
              </div>
              <div class="space-y-2 text-sm text-gray-600">
                <p><strong>Unique Feature:</strong> Jain family maintains Hindu temple</p>
                <p><strong>Complex:</strong> Temple, museums, cultural centers</p>
                <p><strong>Pilgrims:</strong> Over 10,000 daily</p>
                <p><strong>Architecture:</strong> Modern with traditional elements</p>
              </div>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Sacred Geometry and Symbolism</h2>
        
        <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 class="text-xl font-semibold text-yellow-800 mb-3">📐 Vastu Shastra Principles</h3>
          <p class="text-gray-700 leading-relaxed">Temple construction follows ancient Vastu Shastra principles, where every element from the foundation to the pinnacle is designed according to cosmic proportions. The sanctum sanctorum (Garbhagriha) is positioned to align with celestial movements, ensuring that divine energy flows optimally through the structure.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-800 mb-3">🔢 Mathematical Precision</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Golden ratio in proportions</li>
              <li>• Fibonacci sequences in design</li>
              <li>• Astronomical alignments</li>
              <li>• Sacred number integration</li>
            </ul>
          </div>
          
          <div class="bg-green-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-green-800 mb-3">🕸️ Spiritual Symbolism</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Lotus motifs (purity and awakening)</li>
              <li>• Kalasha (pot of abundance)</li>
              <li>• Swastika (prosperity and good fortune)</li>
              <li>• Om symbol (cosmic consciousness)</li>
            </ul>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">Construction Techniques and Materials</h2>
        
        <div class="space-y-6">
          <div class="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 class="text-xl font-semibold text-red-800 mb-3">🪨 Local Materials</h3>
            <p class="text-gray-700 leading-relaxed">Tulu Nadu temples predominantly use laterite stone, a local sedimentary rock that's easy to carve when fresh but hardens with exposure to air. This material, combined with skilled craftsmanship, has allowed many structures to withstand centuries of monsoons and coastal weather.</p>
          </div>

          <div class="bg-indigo-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-indigo-800 mb-3">🔨 Traditional Craftsmanship</h3>
            <p class="text-gray-700 leading-relaxed">The construction of these temples employed hereditary craftsmen families who passed down their skills through generations. Stone carvers, wood workers, and metal artists worked together to create integrated artistic masterpieces where architecture and sculpture blend seamlessly.</p>
          </div>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">🌿 Sustainable Practices</h3>
          <p class="text-gray-700 leading-relaxed">Ancient temple architecture incorporated sustainable practices like rainwater harvesting through temple tanks, natural ventilation systems, and the use of locally sourced materials. These eco-friendly approaches ensured that temples remained in harmony with their natural environment.</p>
        </div>

        <p class="leading-relaxed">Today, these architectural marvels continue to serve their communities while attracting scholars, architects, and spiritual seekers from around the world. Conservation efforts are ongoing to preserve these treasures for future generations, ensuring that the sacred geometry and artistic brilliance of Tulu Nadu's temples continue to inspire and uplift the human spirit.</p>
      </div>
    `,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
    date: "April 15, 2025",
    readTime: "11 min read",
    author: "Dr. Priya Nayak",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&q=80",
    category: "Architecture & Heritage",
    tags: ["Temple Architecture", "Sacred Geometry", "Dravidian Style", "Heritage", "Spiritual"],
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
