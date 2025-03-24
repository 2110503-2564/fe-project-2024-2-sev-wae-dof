import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function  TopMenu(){

    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            <Image src={'/img/logo.png'} className={styles.logoimg} alt='logo'
            width={0} height={0} sizes='100vh'/>
            <TopMenuItem title='Home' pageRef='/'/>
            <TopMenuItem title='About' pageRef='/about'/>
            <TopMenuItem title='Campgrounds' pageRef='/campground'/>
            <TopMenuItem title='Your Bookings' pageRef='/cart'/>
            
            
            
            <div className='flex flex-row absolute right-0 h-full'>
            <TopMenuItem title='Book Now' pageRef='/reservations'/>
            
            {
                session? <Link href="/api/auth/signout">
                   <div className='flex items-center h-full px-2 text-white text-sm'> Sign-Out of {session?.user?.name} </div>
                </Link>
                :<Link href="/api/auth/signin"><div className='flex items-center h-full px-2 text-white text-sm'>Sign-In</div></Link>
            }
            </div>


        </div>
    );
}