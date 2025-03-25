import CampgroundAdminCard from '@/components/CampgroundCard';
import { CampgroundItemAdmin } from '../../../../interfaces';


export default function AdminCampgrounds() {
    const campground: CampgroundItemAdmin = {
    id: '123',
    name: 'Kuphal Hill',
    address: '73168 Barrows Junction',
    tel: '956-586-3777',
    avgRating: 1,
    ratings: [],
    picture: 'https://drive.google.com/uc?id=1Vsq3yGo0TbJtNnD-Q-GmIKEPhi774W_O',
    createdAt: '2025-03-01T18:35:16.866Z',
    };

  return (
    <div className="p-8">
      <CampgroundAdminCard campground={campground} />
    </div>
  );
}
