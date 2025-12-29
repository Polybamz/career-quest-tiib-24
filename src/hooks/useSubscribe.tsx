import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

export interface SubsType {
    employerId: string;
    plan: 'Starter' | 'Professional' | 'Enterprise';
    startDate: any;
    duration: number;
    transactionId: string;
}

const BASE_URL = "https://yocaco-backend.onrender.com/api";


const useSubscription = () => {

    const [subscriptionState, setSubscriptionState] = useState({
        loading: false,
        error: null,
        success: false
    })

    const [getSubsState, setGetSubsState] = useState({
        loaing: false,
        error: null,
        subdcription: null
    })


    const createSubscription = useCallback(async (payload: SubsType) => {
        setSubscriptionState({
            loading: true,
            error: null,
            success: false
        })
        console.log(payload)

        try {

            const response = await fetch(`${BASE_URL}/subscription/subscribe`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
            )

            if (!response.ok) throw Error('Error subscribing')

            const data = response.json()
            console.log(data)
            // Cookies.set('subsStatus', 'pending')

            setSubscriptionState({
                loading: false,
                error: null,
                success: true
            })

        } catch (er) {
            setSubscriptionState({
                success: false,
                loading: false,
                error: er
            })
            return;
        }
    }, [])
    const fetchUserSubscription = useCallback(async (userId: string) => {
        setGetSubsState({
            ...getSubsState,
            loaing: true
        })
        console.log('/////////////////////////////////////////////////////',userId)
        try {
     console.log(`${BASE_URL}/subscription/emloyer-subscription/${userId}`)

            const response = await fetch(`${BASE_URL}/subscription/emloyer-subscription/${userId}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
            }
            )
     // LOG URL
            console.log('Response:', response)

            if (!response.ok) throw Error('Error fetching subscription')

            const data =await response.json()
            console.log('dddddddddddddddddddddddddddddddddddddddddddddddd',data)

            setGetSubsState({
                loaing: false,
                error: null,
                subdcription: data
            })

        } catch (er) {
            console.error('Error fetching subscription:', er)
            setGetSubsState({
                loaing: false,
                error: er,
                subdcription: null
            })
        }
    }, [])

    useEffect(() => {
        const rawUser = Cookies.get('user')
        let userObj: { uid?: string } | null = null
        try {
            userObj = rawUser ? JSON.parse(rawUser) : null
        } catch (e) {
            console.error('Failed to parse user cookie', e)
            userObj = null
        }
        if (userObj?.uid) {
            fetchUserSubscription(userObj.uid)
        }
    }, [fetchUserSubscription])


    return {
        subscriptionState,
        createSubscription,
        getSubsState,
        
    }

}

export default useSubscription