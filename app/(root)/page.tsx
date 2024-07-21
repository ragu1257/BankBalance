import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'

const HomePage = () => {
    const loggedIn = { firstName: 'Rachit' }
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
        </section>
    )
}
export default HomePage