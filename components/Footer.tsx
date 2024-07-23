import { logoutAccount } from '@/lib/actions/user.actions';
import { Router } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Footer = ({ user, type = "desktop" }: FooterProps) => {
    const Router = useRouter()
    const handleLogout = async () => {
        const logOut = await logoutAccount();
        if (logOut) Router.push("/sign-in")
    }

    return (
        <footer className="footer">
            <div className={type === 'mobile' ? 'footer_name_mobile' : 'footer_name'}>
                <p className="text-xl font-bold text-gray-700">
                    {user?.name[0]}
                </p>
            </div>
            <div className={type === 'mobile' ? 'footer_email_mobile' : 'footer_email'}>
                <h1 className="text-14 truncate text-gray-700 font-semibold">
                    {user?.name}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">
                    {user?.email}
                </p>
            </div>
            <div className="footer-image" onClick={handleLogout}>
                <Image src="icons/logout.svg" width={20} height={20} alt="logout" />
            </div>
        </footer>
    );
}
export default Footer;