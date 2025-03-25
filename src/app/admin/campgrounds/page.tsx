import getCampgrounds from '@/libs/getCampgrounds';
import CampgroundAdminCard from '@/components/CampgroundCard';
import { CampgroundItemAdmin } from '../../../../interfaces';
import Link from 'next/link';


export const dynamic = 'force-dynamic';

type Props = {
  searchParams: {
    id?: string;
    search?: string;
    region?: string;
    minRating?: string;
    sort?: string;
    page?: string;
  };
};

export default async function AdminCampgrounds({ searchParams }: Props) {
  const {
    id = '',
    search = '',
    region = '',
    minRating = '',
    sort = '',
    page: pageStr = '1',
  } = searchParams;

  const page = parseInt(pageStr, 10);

  const { data: campgrounds, totalPages } = await getCampgrounds({
    id,
    search,
    region,
    minRating: minRating ? parseInt(minRating) : undefined,
    sort,
    page,
  });

  return (
    <div className="p-8">
      {/* Create Button */}
      <div className="mb-4 flex justify-end">
        <Link
          href="/admin/campgrounds/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Campground
        </Link>
      </div>

      {/* Filters */}
      <form className="mb-6 flex flex-wrap gap-4 items-end" method="get">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name"
          className="border px-3 py-2 rounded w-56"
        />

        <input
          type="text"
          name="id"
          defaultValue={id}
          placeholder="Campground ID"
          className="border px-3 py-2 rounded w-56"
        />

        <select name="region" defaultValue={region} className="border px-3 py-2 rounded w-40">
          <option value="">All Regions</option>
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="east">East</option>
          <option value="west">West</option>
        </select>

        <select name="minRating" defaultValue={minRating} className="border px-3 py-2 rounded w-32">
          <option value="">Any Rating</option>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}+</option>
          ))}
        </select>

        <select name="sort" defaultValue={sort} className="border px-3 py-2 rounded w-40">
          <option value="">Sort by newest</option>
          <option value="oldest">Oldest first</option>
          <option value="rating">Top rated</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </form>

      {/* Campground Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campgrounds.map((campground: CampgroundItemAdmin) => (
          <CampgroundAdminCard key={campground.id} campground={campground} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-4 text-sm">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
          const params = new URLSearchParams({
            id,
            search,
            region,
            minRating,
            sort,
            page: p.toString(),
          });

          return (
            <Link
              key={p}
              href={`/admin/campgrounds?${params.toString()}`}
              className={`px-3 py-1 rounded border ${
                p === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {p}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
