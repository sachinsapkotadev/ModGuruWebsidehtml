import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGameById } from '../firebase/firestore';
import { Download, Share2 } from 'lucide-react';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGame();
  }, [id]);

  const loadGame = async () => {
    try {
      const gameData = await getGameById(id);
      setGame(gameData);
    } catch (error) {
      console.error('Error loading game:', error);
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

  if (!game) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Game not found</h1>
          <Link to="/games" className="text-blue-600 hover:underline">
            Back to Games
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
          <Link to="/games" className="text-blue-600 hover:underline">Games</Link>
          <span>/</span>
          <span className="text-orange-500">{game.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
              <div className="relative aspect-video">
                <img 
                  src={game.coverImage || game.icon} 
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={game.icon} 
                    alt={game.name}
                    className="w-20 h-20 rounded-xl shadow-lg"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{game.name}</h1>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {game.category}
                      </span>
                      {game.version && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                          v{game.version}
                        </span>
                      )}
                      {game.size && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                          {game.size}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {game.badges && game.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.badges.map((badge, index) => (
                      <span 
                        key={index}
                        className={`text-xs font-bold px-3 py-1 rounded-lg ${
                          badge.type === 'editor' ? 'bg-orange-500 text-white' :
                          badge.type === 'mod' ? 'bg-blue-600 text-white' :
                          badge.type === 'online' ? 'bg-red-500 text-white' :
                          badge.type === 'offline' ? 'bg-green-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>
                )}

                {game.description && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">About this game</h2>
                    <p className="text-gray-600 leading-relaxed">{game.description}</p>
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
              <h3 className="font-semibold text-gray-900 mb-4">Game Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{game.category}</span>
                </div>
                {game.version && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version</span>
                    <span className="font-medium">{game.version}</span>
                  </div>
                )}
                {game.size && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium">{game.size}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated</span>
                  <span className="font-medium">
                    {game.updatedAt ? new Date(game.updatedAt.toDate()).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">How to Install</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Download the APK file</li>
                  <li>Enable "Unknown Sources" in settings</li>
                  <li>Install the APK</li>
                  <li>Enjoy the game!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GameDetail;
