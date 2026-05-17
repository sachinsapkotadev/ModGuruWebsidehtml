import { useEffect, useState } from 'react';
import { getApps, getCollections } from '../firebase/firestore';
import AppCard from '../components/AppCard';
import CollectionCard from '../components/CollectionCard';
import { Flame, PuzzlePiece } from 'lucide-react';

const Home = () => {
  const [apps, setApps] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [appsData, collectionsData] = await Promise.all([
        getApps(10),
        getCollections()
      ]);
      setApps(appsData);
      setCollections(collectionsData);
    } catch (error) {
      console.error('Error loading data:', error);
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
      <section className="pt-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-start gap-1">
            <Flame className="w-6 h-6 text-orange-500" />
            <h2 className="text-lg font-bold">Indispensable on your phone</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory mt-4">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} type="app" />
            ))}
          </div>
        </div>
      </section>

      <section className="pt-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-1">
              <PuzzlePiece className="w-6 h-6 text-orange-500" />
              <h2 className="text-lg font-bold">Must have collection</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
