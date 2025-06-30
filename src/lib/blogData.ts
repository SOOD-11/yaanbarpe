export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  contentParts: string [];
  video:string,
  author: string;
  date: string;
  readTime: string;
  image?: string[];
  tags: string[];
  category: string;
  audioAvailable?: boolean;
  featured?: boolean;
  authorImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'Polali-RajaRajeshwari-Temple',
    title: 'Polali RajaRajeshwari Temple',
    excerpt: '“A sacred shrine dedicated to the fierce yet graceful Goddess Rajarajeshwari, steeped in centuries of devotion.”',
    category:'Temple',
 contentParts : [
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#00555A]">Introduction</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Polali Rajarajeshwari Temple</strong> is located in <strong>Polali, Dakshina Kannada district</strong>, Karnataka.
          The temple’s presiding deity is <strong>Shri Rajarajeshwari</strong>. Originally constructed by <strong>King Suratha</strong>,
          it has since been developed by various dynasties. The temple dates back to the <strong>8th century</strong>,
          with the <strong>clay idol</strong> believed to be even older.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">History of Polali Rajarajeshwari</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          The idol of <strong>Sri Rajarajeshwari</strong>—another form of the divine <strong>Goddess Sri Lalita Tripurasundari</strong>—is
          entirely made from <strong>special medicinal clay</strong>.
          <strong>Chinese Buddhist monk Fa-Hien</strong>, who visited India in the <strong>6th century</strong>,
          wrote about this powerful idol, claiming he hadn’t seen such divine power elsewhere in Hindustan.
          The temple boasts classic <strong>Hindu architecture</strong>, featuring <strong>intricately carved wooden roofs</strong> and <strong>copper plates</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          The area was known as <em><strong>Pural</strong></em> in ancient times, which means <strong>“Flute”</strong> in the <strong>Tulu language</strong>.
          In <strong>Mugera</strong> language, "Pural" or "Purel" can also imply <strong>“changing sides”</strong>—perhaps referencing how the nearby
          river <strong>sharply turns near the temple</strong>.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Cultural Festival: Chendu</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          The <strong>Polali Chendu</strong> festival—popularly known as the <em><strong>Football Festival</strong></em>—is a vibrant <strong>five-day event</strong>
          held <strong>seven days before</strong> the temple’s <strong>Avabritha celebration</strong>.
          A <strong>handmade leather ball</strong> is crafted by a <strong>cobbler family in Mijar</strong> and ceremonially delivered by an
          <strong>oil miller family from Kadapu Karia</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          On the first evening, the <strong>ball and a palm-leaf umbrella</strong> are offered at the <strong>gopuram</strong> of the temple.
          After divine blessings, the ball is taken to the field to commence the game, symbolizing the <strong>eternal battle of good vs. evil</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          Villages <strong>Ammunje</strong> and <strong>Manel</strong> compete as rivals, with <strong>Bollur</strong> and <strong>Mallur</strong> supporting them.
          Up to <strong>500 participants</strong> may join, making this not just a sport but a <strong>cultural ritual</strong>.
          The concluding <strong>car festival</strong> celebrates the <strong>triumph of good over evil</strong>.
        </p>
      </section>
      `
    ],
    author: 'Jeevan Shetty',
    date: '2024-12-01',
    readTime: '8 min read',
    image: [
   "/blog-images/polaliBlog/44C505A0-0235-481B-BF16-DC6160A1F23B_1_105_c.jpeg"
    ],
    video:"",
    tags: ['Coastal Heritage', 'St. Mary\'s Islands', 'Fishing Culture', 'Temples'],
   
    audioAvailable: true
  },
  {
    id: 'Pilivesha',
    title: 'Pilivesha',
    excerpt: 'A fierce and vibrant folk dance where performers embody tigers to invoke divine power and thrill the crowds.',
    image: ['/blog-images/PiliveshaBlog/DF61DBA2-3A60-43A9-84AC-3BC20A7C392C.jpeg',
   
     ],
 contentParts : [
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#00555A]">Introduction</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Pilivesha</strong>, or <strong>Hulivesha</strong>, is a vibrant <strong>folk dance</strong> tradition from <strong>Tulunadu</strong>,
          celebrated during <strong>religious and festive occasions</strong>. Performers, painted in vivid colors
          and adorned like <strong>tigers</strong>, dance with intense energy to the beats of the <strong>Thase</strong> (a percussion instrument).
          The tradition transcends <strong>age, gender, and religion</strong>, symbolizing <strong>life</strong>, <strong>cultural identity</strong>, and <strong>inclusivity</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          The name <strong>'Pilivesha'</strong> is derived from the <strong>Tulu language</strong>—<strong>'Pili'</strong> means <em>Tiger</em> and <strong>'Vesha'</strong>
          refers to <em>costume</em> or <em>makeup</em>. Thus, Pilivesha is the <strong>art of impersonating a tiger</strong> through costume and movement.
          However, it is more than impersonation—it's a deeply expressive <strong>dance performance</strong>.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">History of Pilivesha</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          The exact <strong>historical origins</strong> of Pilivesha in <strong>Tulunadu</strong> are unclear, but its roots are tied to the
          <strong>well-being</strong> of the community. It holds <strong>ritualistic significance</strong>, often beginning with a spiritual
          initiation called <strong>Udu Pooje</strong>. Some dancers are believed to become <strong>possessed</strong> by the spirit of the tiger.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          Participants follow strict <strong>ritual purity</strong> norms, refraining from <strong>meat and alcohol</strong>. Scholars suggest
          that Pilivesha may have evolved from agrarian efforts to <strong>coexist with wild tigers</strong>, which once
          posed real threats to livestock and villagers. These tigers, like other <strong>Bhutas</strong> (spirit deities),
          were likely worshipped for <strong>protection</strong>.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Variation in Udupi and Mangalore Style of Pilivesha</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          Pilivesha has diverged into two prominent styles across Tulunadu:
          <strong>Udupi Style</strong> and <strong>Mangalore Style</strong>.
        </p>
        <ul class="list-disc list-inside text-gray-700 text-lg space-y-1">
          <li><strong>Udupi Style</strong>: Performed during <strong>Krishna Janmashtami</strong> and <strong>Ganesh Chaturthi</strong>. Dancers are adorned with <strong>sheep wool</strong> before painting.</li>
          <li><strong>Mangalore Style</strong>: Featured in <strong>Dasara/Navaratri</strong>. Performers <strong>shave all body hair</strong> before painting.</li>
          <li>Both styles involve <strong>Ram Dhol</strong> and <strong>Thrase instruments</strong> and unique <strong>headgear variations</strong>.</li>
        </ul>
        <p class="text-gray-700 text-lg leading-relaxed">
          While Udupi’s tradition is closely tied to the <strong>Krishna Matha</strong>, Mangalore's version is seen more in
          <strong>Devi temples</strong> during Dasara.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#00555A]">Key Features of Pilivesha</h2>
        <ul class="list-disc list-inside text-gray-700 text-lg space-y-1">
          <li><strong>Tiger-themed Performances</strong>: Dancers are painted as <strong>tigers</strong>, often with one portraying a <strong>hunter</strong>.</li>
          <li><strong>Distinctive Dance Steps</strong>: Synchronized with <strong>percussion rhythms</strong>; a defining element of the performance.</li>
          <li><strong>Inclusion of Hunter</strong>: A performer with a toy gun, <strong>paid separately</strong>, adds dramatic flair.</li>
          <li><strong>Musical Accompaniment</strong>: Live music with <strong>traditional percussion instruments</strong>.</li>
          <li><strong>Competitions and Innovation</strong>: New-age troupes include <strong>stunts</strong> and elements from other dance forms.</li>
          <li><strong>Choreographed Performances</strong>: Requires <strong>rigorous practice</strong> and often judged in <strong>formal contests</strong>.</li>
          <li><strong>Local Funding</strong>: Local committees sponsor performances by covering <strong>costumes, paint, travel, and food</strong>.</li>
          <li><strong>Cultural Significance</strong>: Performed during <strong>Navratri</strong> and <strong>Krishna Janmashtami</strong> to honor <strong>Goddess Durga</strong>.</li>
        </ul>
        <p class="text-gray-700 text-lg leading-relaxed">
          Pilivesha is not just a performance—it's a <strong>visceral experience</strong>. To witness its intensity and grace is
          to truly understand the <strong>essence of Tulunadu's culture</strong>.
        </p>
      </section>
      `
    ],
    video:"",
    author: 'Jeevan Shetty',
    date: '2024-11-28',
    readTime: '12 min read',
  
    tags: ['Yakshagana', 'Traditional Arts', 'Cultural Heritage', 'Dance Drama', 'Coastal Karnataka'],
    category: 'Art Forms',
    audioAvailable: true
  },
  {
    id: 'Kambala',
    title: 'Kambala',
    excerpt: "Experience the thunderous energy of Tulunadu’s traditional buffalo race through slushy paddy fields",
  contentParts : [
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#00555A]">Introduction</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Tulunadu</strong> is renowned for its <strong>rich culture and spirituality</strong>, and one of its most iconic traditions is <strong>Kambala</strong>.
          This <strong>mud-track buffalo race</strong> is held annually from <strong>November to March</strong>, where pairs of buffaloes are raced across
          a muddy paddy field.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          The word <strong>Kambala</strong> is believed to be derived from <strong>"Kampa"</strong> (mud) and <strong>"Kala"</strong> (large area), essentially meaning
          a <strong>large muddy agricultural field</strong>. Originating in the <strong>15th century</strong>, Kambala began as a <strong>ritualistic tradition</strong>
          among <strong>feudal agricultural communities</strong> of Tulunadu. It was historically organized by <strong>feudal lords</strong>, particularly
          from the <strong>Bunt</strong> and <strong>Jain</strong> communities.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Categories in Kambala</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          Kambala races are classified not only by <strong>traditional vs competitive</strong> types, but also by the <strong>gear used</strong> to
          tie the buffaloes. Here are the key categories:
        </p>
        <ul class="list-disc list-inside text-gray-700 text-lg space-y-1">
          <li><strong>Noda Kambala</strong>: A casual, less competitive form of Kambala.</li>
          <li><strong>Negilu Ota (Plough)</strong>: A <strong>light plough</strong> is tied to the buffaloes; the jockey must control the plough while running.</li>
          <li><strong>Hagga Ota (Rope Race)</strong>: Buffaloes are tied with a <strong>rope</strong> and the rider follows behind. Typically used with experienced buffaloes.</li>
          <li><strong>Adda Halage (Wooden Plank)</strong>: The jockey stands on a <strong>wooden plank</strong> dragged by the buffaloes. This is generally for <strong>senior buffaloes</strong>.</li>
          <li><strong>Kene Halage (Slippery Track)</strong>: A variant held on a <strong>particularly slippery mud track</strong>.</li>
        </ul>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Human Relationship with the Buffaloes</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          As <strong>Kambala</strong> expanded beyond its traditional months into <strong>March and April</strong>, more attention was paid to <strong>buffalo well-being</strong>,
          including <strong>hydration</strong> and <strong>cooling</strong>. The racing buffaloes—usually <strong>uncastrated males</strong>—can grow aggressive with age,
          especially toward <strong>strangers</strong>. However, they recognize and remain <strong>gentle</strong> with their caretakers.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          Some buffaloes are exceptionally <strong>friendly and sociable</strong>, reflecting a <strong>diverse range of temperaments</strong>. This
          powerful bond between humans and animals goes beyond physical care—it's shaped by <strong>emotional and psychological understanding</strong>,
          essential for both <strong>health</strong> and <strong>performance</strong> in the <strong>competitive arena</strong> of Kambala.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Conclusion</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Kambala</strong>, though once <strong>banned in 2014</strong> due to animal welfare concerns, was <strong>legalized again in 2017</strong>.
          In <strong>May 2023</strong>, the <strong>Supreme Court</strong> upheld its legality, recognizing it as a <strong>traditional folk sport</strong>
          akin to <strong>Jallikattu</strong> and <strong>Bull Cart Races</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          Kambala is more than a sport—it is the <strong>heartbeat of Tulunadu</strong>. It unites <strong>people, heritage, and buffaloes</strong>
          in a spectacular celebration of <strong>resilience</strong>, <strong>unity</strong>, and <strong>tradition</strong>. It mirrors a cultural pride that cannot
          be fully understood without experiencing the passion and community spirit that drive this ancient ritual.
        </p>
      </section>
      `
    ],
    video:"",
    author: 'Jeevan Shetty',
    date: '2024-11-25',
    readTime: '7 min read',
    image: ['/blog-images/KambalaBlog/Screenshot 2025-06-30 at 11.02.23 PM.png',
     ],
    tags: ['Tulu Language', 'Tigalari Script', 'Literature', 'Oral Traditions'],
    category: 'Festivals',
    audioAvailable: false

  },
  {
    id: 'Kadri-Nath-Panth',
    title: 'Kadri & the Nath Panth',
video:"",
    excerpt: 'A mystic sanctuary tracing the spiritual lineage of Nath yogis and their esoteric traditions.',
  contentParts :[
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#5B3C88]">The Nath Panth</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          The <strong>Natha cult</strong> represents a unique fusion of <strong>Buddhist Avalokiteshvara</strong> and <strong>Shaivaite tantric</strong> traditions,
          particularly the <strong>Kapalika</strong> and <strong>Kaula</strong> sects. 
          <strong>Macchendra Nath</strong> and his disciple <strong>Gorakh Nath</strong> were key figures who propagated the Nath philosophy.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          During the <strong>8th to 10th centuries</strong>, the Nath cult spread across <strong>India</strong> and <strong>Sri Lanka</strong>. Over time, it evolved into 
          <strong>twelve distinct sub-sects</strong>, known as the <strong>“Bara-pantha”</strong>. 
          <strong>Natha Yogis</strong> were known for their long-distance spiritual pilgrimages by foot.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          The influence of the Nath cult is visible in major <strong>Shaiva centres</strong> like <strong>Srishaila</strong>. The term <strong>“Natha”</strong> is a shortened form of 
          <strong>“Lokeswara Natha”</strong>, as per <strong>Buddhist literature from Sri Lanka</strong>, showing its syncretic nature.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#3A6B70]">Kadri</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          It is believed that <strong>Matsyendranath</strong> stayed and worshipped at <strong>Kadri</strong>, the location of the famous <strong>Kadri Manjunatha Temple</strong>.
          There, he established a <strong>Lingam</strong> (symbol of Lord Shiva) and began worship in the name of <strong>“Manjunatha”</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Macchendra Natha</strong> gained the <strong>patronage of local rulers</strong>, who granted him <strong>administrative authority</strong> over the lands
          surrounding the temple and honored him with the title <strong>“Kadri Arasaru”</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          In a spiritually significant event, <strong>Gorakshnath</strong> is believed to have <strong>merged with the lingam</strong> of <strong>Lord Manjunatha</strong> at Kadri,
          symbolizing his union with the divine. This transformed <strong>Kadri</strong> into a revered pilgrimage site for followers of the 
          <strong>Nath Sampradaya</strong>.
        </p>
      </section>
      `
    ],
    author: 'Temple Heritage Documentation',
    date: '2024-11-22',
    readTime: '9 min read',
    image: ['/blog-images/kadriBlog/D7FB2855-3E57-4AF4-9578-3CA02246CA30.jpeg'
   
     ],
    tags: ['Udupi Temple', 'Madhvacharya', 'Spiritual Heritage', 'Architecture'],
    category: 'Temple',
    audioAvailable: true
  },
  {
    id: 'Neer-Dosa',
    title: 'Neer Dosa',
    excerpt: 'Delicately thin and soft rice crepes that melt in your mouth—Tulunadu’s signature breakfast delight.',
     contentParts : [
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#2F4F4F]">Introduction</h2>
        <p class="text-gray-800 text-lg leading-relaxed">
          The birthplace of <strong>Neer Dosa</strong> lies in the heart of the <strong>Tulu-speaking community</strong>. 
          The word <strong>"Neer"</strong> translates to <strong>“water”</strong> in Tulu, indicating the dosa’s unique <strong>thin and translucent</strong> nature.
        </p>
        <p class="text-gray-800 text-lg leading-relaxed">
          Originally a <strong>local delicacy</strong>, Neer Dosa has grown in popularity due to its <strong>simplicity, versatility, and quick preparation</strong>. 
          Its batter—a simple mix of <strong>rice</strong> and sometimes <strong>grated coconut</strong>—requires <strong>no fermentation</strong>, making it a <strong>convenient and fast</strong> choice.
        </p>
        <p class="text-gray-800 text-lg leading-relaxed">
          When poured thinly over a hot griddle, it forms a <strong>lacy, soft crepe</strong> that is both <strong>light and flavorful</strong>. 
          The use of <strong>coconut</strong> imparts healthy fats and a distinct coastal aroma, while the <strong>minimal use of oil</strong> makes it gentle on the stomach.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#3B7C71]">Preparation of Neer Dosa</h3>
        <p class="text-gray-800 text-lg leading-relaxed">
          Neer Dosa is primarily made from <strong>soaked rice, water</strong>, and a <strong>pinch of salt</strong>. 
          Some recipes also include <strong>grated coconut</strong> for extra richness.
        </p>
        <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
          <li><strong>Rice:</strong> Typically short-grain rice like <em>Tukda</em> or <em>Kolam</em>, though other varieties are also used.</li>
          <li><strong>Water:</strong> Added generously to achieve the <strong>thin, watery consistency</strong> of the batter.</li>
          <li><strong>Salt:</strong> A small amount for taste.</li>
          <li><strong>Grated Coconut (Optional):</strong> Enhances flavor and provides coastal richness.</li>
        </ul>
        <p class="text-gray-800 text-lg leading-relaxed">
          The rice is <strong>soaked overnight</strong> or for several hours, then ground into a <strong>smooth, buttermilk-like batter</strong>. 
          It’s poured onto a <strong>hot griddle</strong> and cooked <strong>without flipping</strong>, resulting in a <strong>soft and delicate dosa</strong>.
        </p>
        <p class="text-gray-800 text-lg leading-relaxed">
          Neer Dosa is not just a dish—it’s a celebration of <strong>coastal culinary wisdom</strong> and <strong>generations of Tulu tradition</strong>.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#3B7C71]">Benefits</h3>
        <p class="text-gray-800 text-lg leading-relaxed">
          <strong>Neer Dosa</strong> is widely recognized as a <strong>healthy choice</strong> among dosa varieties. 
          It is <strong>gluten-free</strong>, <strong>low in fat</strong>, and <strong>easy to digest</strong> due to its <strong>non-fermented, oil-free</strong> preparation.
        </p>
      </section>
      `
    ],
    video:"",
    author: 'Agricultural Heritage Team',
    date: '2024-11-20',
    readTime: '6 min read',
    image: ['/blog-images/NeerBlog/69B8133F-95C1-4B16-B115-77B9C2BBC6EC.jpeg'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Food & Cuisine',
    audioAvailable: false
  },
  
];

export const categories = [
  'All',
  'Temple',
  'Art Forms',
  'Festivals',
  'History',
];

export const featuredPosts = blogPosts.slice(0, 3);

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};
