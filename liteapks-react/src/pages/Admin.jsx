import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser, logoutUser } from '../firebase/auth';
import { Shield, LogOut, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { addApp, getApps, updateApp, deleteApp } from '../firebase/firestore';

const Admin = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('apps');
  const [apps, setApps] = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    icon: '',
    coverImage: '',
    description: '',
    version: '',
    size: '',
    badges: []
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      setError('');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const loadApps = async () => {
    try {
      const appsData = await getApps(100);
      setApps(appsData);
    } catch (err) {
      console.error('Error loading apps:', err);
    }
  };

  const handleSaveApp = async (e) => {
    e.preventDefault();
    try {
      if (editingApp) {
        await updateApp(editingApp.id, formData);
      } else {
        await addApp(formData);
      }
      setShowForm(false);
      setEditingApp(null);
      setFormData({
        name: '',
        slug: '',
        category: '',
        icon: '',
        coverImage: '',
        description: '',
        version: '',
        size: '',
        badges: []
      });
      loadApps();
    } catch (err) {
      console.error('Error saving app:', err);
    }
  };

  const handleEditApp = (app) => {
    setEditingApp(app);
    setFormData(app);
    setShowForm(true);
  };

  const handleDeleteApp = async (appId) => {
    if (window.confirm('Are you sure you want to delete this app?')) {
      try {
        await deleteApp(appId);
        loadApps();
      } catch (err) {
        console.error('Error deleting app:', err);
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingApp(null);
    setFormData({
      name: '',
      slug: '',
      category: '',
      icon: '',
      coverImage: '',
      description: '',
      version: '',
      size: '',
      badges: []
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex gap-4 px-6">
              <button
                onClick={() => {
                  setActiveTab('apps');
                  loadApps();
                }}
                className={`py-4 px-2 font-medium ${
                  activeTab === 'apps'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Apps
              </button>
              <button
                onClick={() => setActiveTab('games')}
                className={`py-4 px-2 font-medium ${
                  activeTab === 'games'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Games
              </button>
              <button
                onClick={() => setActiveTab('collections')}
                className={`py-4 px-2 font-medium ${
                  activeTab === 'collections'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Collections
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'apps' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Manage Apps</h2>
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setEditingApp(null);
                      setFormData({
                        name: '',
                        slug: '',
                        category: '',
                        icon: '',
                        coverImage: '',
                        description: '',
                        version: '',
                        size: '',
                        badges: []
                      });
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add App
                  </button>
                </div>

                {showForm && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingApp ? 'Edit App' : 'Add New App'}
                    </h3>
                    <form onSubmit={handleSaveApp} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            App Name
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Slug
                          </label>
                          <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Version
                          </label>
                          <input
                            type="text"
                            value={formData.version}
                            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Size
                          </label>
                          <input
                            type="text"
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Icon URL
                          </label>
                          <input
                            type="url"
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Image URL
                          </label>
                          <input
                            type="url"
                            value={formData.coverImage}
                            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelForm}
                          className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">App</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Version</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apps.map((app) => (
                        <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={app.icon} alt={app.name} className="w-10 h-10 rounded-lg" />
                              <span className="font-medium">{app.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{app.category}</td>
                          <td className="py-3 px-4 text-gray-600">{app.version || '-'}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditApp(app)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteApp(app.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'games' && (
              <div className="text-center py-12 text-gray-500">
                <p>Games management coming soon...</p>
              </div>
            )}

            {activeTab === 'collections' && (
              <div className="text-center py-12 text-gray-500">
                <p>Collections management coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
