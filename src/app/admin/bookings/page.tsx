export default function AdminBookings() {
    return (
        <div className="p-8">
            {/* Booking ID Search */}
            <form className="mb-6 flex gap-4" method="get">
                <input
                    type="text"
                    name="id"
                    placeholder="Search by booking ID"
                    className="border px-3 py-2 rounded w-64"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Filter
                </button>
            </form>

            {/* Booking Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center gap-4 text-sm">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                        key={p}
                        href={`/admin/bookings?id=${id}&page=${p}`}
                        className={`px-3 py-1 rounded border ${
                            p === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {p}
                    </Link>
                ))}
            </div>
        </div>
    );
}