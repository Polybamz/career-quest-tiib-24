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
        try {

        } catch (er) {
            setGetSubsState({
                loaing: false,
                error: er,
                subdcription: null
            })
        }
    }, [])


    return {
        subscriptionState,
        createSubscription,
        getSubsState,
        fetchUserSubscription
    }

}

export default useSubscription