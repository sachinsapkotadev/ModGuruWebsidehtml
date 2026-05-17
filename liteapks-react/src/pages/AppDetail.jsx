import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAppById } from '../firebase/firestore';
import { Download, ArrowLeft, Share2 } from 'lucide-react';

const AppDetail = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApp();
  }, [id]);

  const loadApp = async () => {
    try {
      const appData = await getAppById(id);
      setApp(appData);
    } catch (error) {
      console.error('Error loading app:', error);
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

  if (!app) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">App not found</h1>
          <Link to="/apps" className="text-blue-600 hover:underline">
            Back to Apps
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <span>/</span>
          <Link to="/apps" className="text-blue-600 hover:underline">Apps</Link>
          <span>/</span>
          <span className="text-orange-500">{app.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
              <div className="relative aspect-video">
                <img 
                  src={app.coverImage || app.icon} 
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={app.icon} 
                    alt={app.name}
                    className="w-20 h-20 rounded-xl shadow-lg"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{app.name}</h1>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {app.category}
                      </span>
                      {app.version && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                          v{app.version}
                        </span>
                      )}
                      {app.size && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                          {app.size}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {app.badges && app.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.badges.map((badge, index) => (
                      <span 
                        key={index}
                        className={`text-xs font-bold px-3 py-1 rounded-lg ${
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

                {app.description && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">About this app</h2>
                    <p className="text-gray-600 leading-relaxed">{app.description}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex-1 justify-center">
                    <Download className="w-5 h-5" />
                    Download APK
                  </button>
                  <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">App Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{app.category}</span>
                </div>
                {app.version && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version</span>
                    <span className="font-medium">{app.version}</span>
                  </div>
                )}
                {app.size && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium">{app.size}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated</span>
                  <span className="font-medium">
                    {app.updatedAt ? new Date(app.updatedAt.toDate()).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">How to Install</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Download the APK file</li>
                  <li>Enable "Unknown Sources" in settings</li>
                  <li>Install the APK</li>
                  <li>Enjoy the app!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppDetail;
