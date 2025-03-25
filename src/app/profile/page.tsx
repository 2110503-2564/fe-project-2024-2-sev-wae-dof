import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return <p className="text-red-500 font-semibold">Error: User is not authenticated</p>;
    }

    try {
        const user = await getUserProfile(session?.user.token);
        return (
            <div className="min-h-screen bg-[#f7f4ed] flex justify-center items-center">
                <div className="flex flex-col items-center bg-white p-8 rounded-lg w-full max-w-3xl">
                    <h1 className="font-bold text-4xl mb-4 text-center text-blue-600">Profile</h1>
                    <div className="bg-white p-6 rounded-lg w-full space-y-4">
                        <h2 className="text-xl font-semibold">Name:</h2>
                        <p className="text-lg">{user.data.name}</p>
                        <h2 className="text-xl font-semibold">Tel:</h2>
                        <p className="text-lg">{user.data.tel}</p>
                        <h2 className="text-xl font-semibold">Email:</h2>
                        <p className="text-lg">{user.data.email}</p>
                        <h2 className="text-xl font-semibold">Member Since:</h2>
                        <p className="text-lg">
                            {new Date(user.data.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>

                    </div>
                </div>
            </div>
        );
    } catch (error: any) {
        return <p className="text-red-500 font-semibold">Error: {error.message}</p>;
    }
}
