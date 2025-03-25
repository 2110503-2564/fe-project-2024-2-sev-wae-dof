'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import createCampground from '@/libs/createCampground';

export default function CreateCampgroundPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    region: '',
    tel: '',
    picture: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!session?.user?.token) {
        throw new Error('You must be logged in to create a campground.');
      }

      await createCampground(session.user.token, formData);

      alert('Campground created successfully!');
      router.push('/admin/campgrounds');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Campground</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Campground Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows={3}
          required
        />

        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">All Regions</option>
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="east">East</option>
          <option value="west">West</option>
        </select>

        <input
          type="tel"
          name="tel"
          placeholder="Phone Number"
          value={formData.tel}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="picture"
          placeholder="Image URL (optional)"
          value={formData.picture}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin/campgrounds')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
