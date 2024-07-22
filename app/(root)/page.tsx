import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'

const HomePage = () => {
    const loggedIn = { firstName: 'Rachit', lastName: 'Gupta', email: 'rachit.gupta@gmail.com' }
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account"
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={2}
                        totalCurrentBalance={23.342}
                    />
                </header>
            </div>
            <RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{
                    currentBalance: 55.342,
                }, {
                    currentBalance: 23.342,
                }]}
            />
        </section>
    )
}
export default HomePage