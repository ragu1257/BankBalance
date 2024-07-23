
import { useCallback, useEffect, useState } from 'react';
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/router';
import { createLinkToken } from '@/lib/actions/user.actions';

const PlaidLink = (
    { user, variant }: PlaidLinkProps
) => {
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {

        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data.linkToken);
        }
        getLinkToken();
    }, [user])
    
    const onSuccess = useCallback(async (public_token: string) => {
        // await exchangePublicToken(publicToken: public_token, user);
        router.push('/');
    }, [user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { ready, open } = usePlaidLink(config);

    return (
        <>
            {variant === 'primary' ? (
                <button className='plaidlink-primary' onClick={() => open()} disabled={!ready}>
                    Connect to Bank
                </button>
            ) :
                variant === 'ghost' ? (
                    <button className='btn-ghost'>
                        Connect to Bank
                    </button>
                ) :
                    (
                        <button className='btn-secondary'>
                            Connect to Bank
                        </button>
                    )}
        </>
    )
}

export default PlaidLink;