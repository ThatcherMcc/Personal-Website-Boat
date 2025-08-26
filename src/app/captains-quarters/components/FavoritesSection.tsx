import { FavoritesList } from "../configs/FavoritesConfigs";

export default function FavoritesSection() {
  const items = FavoritesList;
  return (
    <section className="max-w-8/10 flex flex-col gap-6 text-center bg-stone-900 bg-opacity-70 p-6 rounded-lg shadow-2xl backdrop-filter backdrop-blur-sm">
      <h1 className="font-semibold font-serif text-4xl text-stone-300 border-b-2 border-stone-400 pb-2">
        Some of My Favorite Things
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-6 p-4 rounded-lg bg-stone-600"
          >
            <img
              src={item.imageSrc}
              alt={item.altText}
              className="h-56 object-cover rounded-md"
            />
            <div className="flex flex-col text-left">
              <h3 className="text-xl font-semibold font-serif text-stone-400">
                {item.category} {/* Category */}
              </h3>
              <h4 className="text-2xl font-bold font-serif mb-4">
                {item.title} {/* Title */}
              </h4>
              <p className="font-serif text-lg">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
