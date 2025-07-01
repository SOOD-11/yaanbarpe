export default function PyramidLayout() {
    const tiers = [
      {
        name: "Immersive Package",
        icon: "🏛️",
        description: "7–9 Day Premium Immersive Experience",
        price: "₹20,000+",
        color: "bg-purple-100 text-purple-900"
      },
      {
        name: "Semi-Immersive Package",
        icon: "🎨",
        description: "4-Day Wide Exposure Experience",
        price: "₹10,000+",
        color: "bg-orange-100 text-orange-900"
      },
      {
        name: "Intermediate Package",
        icon: "🎭",
        description: "2-Day Deeper Cultural Exploration",
        price: "₹5,000+",
        color: "bg-yellow-100 text-yellow-900"
      },
      {
        name: "Basic Package",
        icon: "🌱",
        description: "Entry Level – Easy Accessibility",
        price: "₹1,000+",
        color: "bg-green-100 text-green-900"
      }
    ];
  
    return (
      <div className="py-10 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">△ Tulu Nadu Experience Pyramid</h2>
        <p className="text-muted-foreground mb-10">
          From basic accessibility to supreme immersion — a journey upwards.
        </p>
  
        <div className="flex flex-col items-center gap-4">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`w-full max-w-[${100 - index * 20}%] mx-auto rounded-lg border border-white shadow-md ${tier.color} py-4 px-6`}
            >
              <div className="flex flex-col items-center">
                <div className="text-3xl">{tier.icon}</div>
                <div className="text-lg font-semibold mt-2">{tier.name}</div>
                <div className="text-sm">{tier.description}</div>
                <div className="mt-2 font-bold">{tier.price}</div>
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-12 bg-gradient-to-r from-pink-50 via-rose-100 to-yellow-50 p-6 rounded-xl border border-dashed border-rose-300 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-rose-800 mb-2">
            Ready to shape your soulful escape?
          </h3>
          <p className="text-sm text-rose-700 leading-relaxed">
            Whether you're chasing sunsets, stories, or serenity — help us craft an unforgettable
            journey for you. Your voice matters in building experiences that resonate. <br />
            <span className="font-medium text-rose-900">Take 30 seconds,</span> and let your dream
            trip begin with a simple gesture.
          </p>
          <a
            href="https://forms.gle/6HxmgaacowCPBFJt6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-rose-600 text-white font-medium rounded-full hover:bg-rose-700 transition"
          >
           Join Survey
          </a>
        </div>
      </div>
    );
  }