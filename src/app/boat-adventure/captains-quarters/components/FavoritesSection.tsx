import { FavoritesList } from "../configs/FavoritesConfigs";

export default function FavoritesSection() {
  const items = FavoritesList;
  return (
    <section className="w-full max-w-none xl:max-w-8/10 xl:max-w-9/10 flex flex-col gap-6 text-center bg-stone-900 bg-opacity-70 p-4 md:p-6 rounded-lg shadow-2xl backdrop-filter backdrop-blur-sm mx-4 md:mx-0">
      <h1 className="font-semibold font-serif text-3xl md:text-4xl text-stone-300 border-b-2 border-stone-400 pb-2">
        Some of My Favorite Things
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6 p-3 md:p-4 rounded-lg bg-stone-600"
          >
            <img
              src={item.imageSrc}
              alt={item.altText}
              className="w-full md:w-auto h-48 md:h-56 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex flex-col text-center md:text-left w-full">
              <h3 className="text-lg md:text-xl font-semibold font-serif text-stone-400">
                {item.category} {/* Category */}
              </h3>
              <h4 className="text-xl md:text-2xl font-bold font-serif mb-2 md:mb-4">
                {item.title} {/* Title */}
              </h4>
              <p className="font-serif text-base md:text-lg">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
