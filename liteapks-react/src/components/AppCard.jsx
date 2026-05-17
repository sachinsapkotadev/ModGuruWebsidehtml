import { Link } from 'react-router-dom';

const AppCard = ({ app, type = 'app' }) => {
  return (
    <Link 
      to={`/${type}s/${app.slug || app.id}`}
      className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%] rounded-2xl overflow-hidden cursor-pointer no-underline text-gray-900 bg-gray-50 block relative group"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <img 
          src={app.coverImage || app.icon} 
          alt={app.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 flex items-center gap-3 bg-white/50 backdrop-blur-sm absolute bottom-0 left-0 right-0">
        <img 
          src={app.icon} 
          alt={app.name} 
          className="w-10 h-10 rounded-xl shadow-sm" 
        />
        <div>
          <h3 className="font-semibold text-gray-900 text-md m-0 leading-tight">{app.name}</h3>
          <p className="text-xs font-semibold text-blue-600 mt-0.5">{app.category}</p>
        </div>
      </div>
      
      {app.badges && app.badges.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {app.badges.map((badge, index) => (
            <span 
              key={index}
              className={`text-[9px] font-bold px-[5px] py-[2px] rounded-lg leading-[1.4] ${
                badge.type === 'editor' ? 'bg-orange-500 text-white' :
                badge.type === 'premium' ? 'bg-blue-600 text-white' :
                badge.type === 'mod' ? 'bg-green-600 text-white' :
                'bg-gray-600 text-white'
              }`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

export default AppCard;
