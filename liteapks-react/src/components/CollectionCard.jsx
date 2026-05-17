import { Link } from 'react-router-dom';

const CollectionCard = ({ collection }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-900">
      <img 
        src={collection.coverImage} 
        alt={collection.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#1d4ed8]/90 via-[#1d4ed8]/40 to-transparent transition-opacity duration-300 group-hover:opacity-0"
        style={{ background: `linear-gradient(to top, ${collection.color || '#1d4ed8'}cc 0%, ${collection.color || '#1d4ed8'}66 50%, transparent 100%)` }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1d4ed8]/90 via-[#1d4ed8]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(to top, ${collection.color || '#1d4ed8'}cc 0%, ${collection.color || '#1d4ed8'}66 50%, transparent 100%)` }}
      ></div>

      <Link 
        to={`/collection/${collection.slug || collection.id}`}
        className="absolute inset-0 z-[1]"
        aria-label={collection.name}
      ></Link>

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-[2] pointer-events-none">
        <h2 className="text-white font-bold text-sm sm:text-base leading-snug mb-2.5 drop-shadow">
          {collection.name}
        </h2>

        {collection.apps && collection.apps.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {collection.apps.slice(0, 3).map((app) => (
              <Link
                key={app.id}
                to={`/apps/${app.slug || app.id}`}
                className="relative z-[3] rounded-xl ring-2 ring-white/30 overflow-hidden w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 hover:ring-white/70 transition-all"
              >
                <img 
                  src={app.icon} 
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </Link>
            ))}
            {collection.apps.length > 3 && (
              <span className="flex items-end text-base font-bold text-white">
                +{collection.apps.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;
