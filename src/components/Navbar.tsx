import SearchBar from './SearchBar';
import Link from 'next/link';

export default function Navbar(){
    return(
        <nav className = "absolute top-0 bg-transparent w-full p-4 flex items-center justify-between">
            <div className='w-1/3'>
                <SearchBar/>
            </div>

            <div className='flex items-center gap-4'>
                <Link href="/" style={{ color: 'cyan', textDecoration: 'underline' }}>
                    O nas
                </Link>
            </div>
        </nav>
    );
}