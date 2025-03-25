'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import editCampground from '@/libs/getCampground';

export default function EditCampgroundPage() {
  const router = useRouter();
  const { id } = useParams();
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
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function fetchCampground() {
      try {
        const res = await fetch(
          `https://campground-backend-red.vercel.app/api/v1/campgrounds/${id}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch campground data');
        }

        const data = await res.json();
        setFormData({
          name: data.name || '',
          address: data.address || '',
          region: data.region || '',
          tel: data.tel || '',
          picture: data.picture || '',
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setInitialLoading(false);
      }
    }

    if (id) fetchCampground();
  }, [id]);

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
        throw new Error('You must be logged in to update a campground.');
      }

      await editCampground(session.user.token, id as string, formData);
      alert('Campground updated successfully!');
      router.push('/admin/campgrounds');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-8">Loading campground details...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Campground</h1>

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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
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
