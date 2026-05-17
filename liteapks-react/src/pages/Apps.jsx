import { useEffect, useState } from 'react';
import { getApps } from '../firebase/firestore';
import AppCard from '../components/AppCard';
import { Star } from 'lucide-react';

const Apps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    try {
      const appsData = await getApps(100);
      setApps(appsData);
    } catch (error) {
      console.error('Error loading apps:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <nav className="flex items-center gap-2 text-sm mb-8">
          <a href="/" className="text-blue-600 hover:underline">Home</a>
          <span>/</span>
          <span className="text-orange-500">Apps</span>
        </nav>

        <section className="mb-12">
          <div className="flex items-center justify-between my-5">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-7 h-7 text-yellow-500" />
              Top Apps
            </h2>
          </div>

          <div className="scroll-section flex gap-4 overflow-x-auto pb-4">
            {apps.map((app) => (
              <div key={app.id} className="app-card flex-shrink-0 py-1 w-[132px]">
                <div className="app-thumb aspect-[1] rounded-2xl overflow-hidden mb-3 relative">
                  <img 
                    src={app.icon} 
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {app.badges && app.badges.length > 0 && (
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                      {app.badges.map((badge, index) => (
                        <span 
                          key={index}
                          className={`text-[9px] font-bold px-[5px] py-[2px] rounded-lg leading-[1.4] ${
                            badge.type === 'editor' ? 'bg-orange-500 text-white' :
                            badge.type === 'premium' ? 'bg-blue-600 text-white' :
                            'bg-gray-600 text-white'
                          }`}
                        >
                          {badge.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 truncate">{app.name}</h3>
                <p className="text-sm text-gray-500">{app.category}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Apps</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} type="app" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Apps;
