import { useState, useCallback, useEffect } from "react";

const BASE_URL = "https://yocaco-backend.onrender.com";

interface ApiState<T = any> {
  loading: boolean;
  success?: boolean | null;
  data?: T | null;
  error?: Error | null;
}

interface MvcContent {
  MISSION: string;
  VISSION: string;
  CORE_VALUE: string[];
}

 function useContent() {
  // --- State Management ---
  const [mvcState, setMvcState] = useState<ApiState<MvcContent>>({
    loading: true,
    data: null,
    error: null,
  });

 

  const [bannerState, setBannerState] = useState<ApiState>({
    loading: false,
    success: null,
    error: null,
  });

    const [deleteBannerState, setDeleteBannerState] = useState<ApiState>({
    loading: false,
    success: null,
    error: null,
    
  });
  const [addBannerState, setAddBannerState] = useState<ApiState>({
    loading: false,
    success: null,
    error: null,
    
  });
  const [getTestimonialsState, setGetTestimonialsState] = useState<ApiState>({
    loading: false,
    success: null,
    error: null,
    data: null,
  });

  




  // --- Fetch Mission / Vision / Core Values ---
  const fetchMvc = useCallback(async () => {
    setMvcState({ loading: true, data: null, error: null });

    try {
      const response = await fetch(`${BASE_URL}/api/mvc/get-mvc`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();

      setMvcState({
        loading: false,
        data: data.result,
        error: null,
      });
    } catch (error) {
      setMvcState({
        loading: false,
        data: null,
        error: error as Error,
      });
    }
  }, []);

  //--- Add banner ---
  const addBanner = useCallback(async (data: any) => {
    setAddBannerState({ loading: true, success: null, error: null });
    try {
      const response = await fetch(`${BASE_URL}/api/banner/add-banner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add banner");
      setAddBannerState({ loading: false, success: true, error: null });
      fetchBanner();
    } catch (error) {
      setAddBannerState({ loading: false, success: false, error: error as Error });
    }
  }, []);

  /// --- Effects --- get banner
  const fetchBanner = useCallback(async () => {
    setBannerState({ loading: true, success: null, error: null });

    try {
      const response = await fetch(`${BASE_URL}/api/banner/get-banners`);
      if (!response.ok) throw new Error("Failed to fetch banner data");
      const data = await response.json();

      setBannerState({
        loading: false,
        success: true,
        data: data.banners,
        error: null,
      });
    } catch (error) {
      setBannerState({
        loading: false,
        success: false,
        data: null,
        error: error as Error,
      });
    }
  }, []);

  const deleteBanner = useCallback(async (id: string) => {
    setDeleteBannerState({ loading: true, success: null, error: null });
    try {
      const response = await fetch(`${BASE_URL}/api/banner/delete-banner/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete banner");
      setDeleteBannerState({ loading: false, success: true, error: null });
      fetchBanner();
    } catch (error) {
      setDeleteBannerState({ loading: false, success: false, error: error as Error });
    }
  }, []);
//// get testimonials

const getTestimonials = useCallback(async () => {
  setGetTestimonialsState({ loading: true, success: null, error: null, data: null });

  try {
    const response = await fetch(`${BASE_URL}/api/testimonials/get-testimonials`);
    if (!response.ok) throw new Error("Failed to fetch testimonials");
    const data = await response.json();

    setGetTestimonialsState({
      loading: false,
      success: true,
      data: data.data,
      error: null,
    });
  } catch (error) {
    setGetTestimonialsState({
      loading: false,
      success: false,
      data: null,
      error: error as Error,
    });
  }
}, []);



  useEffect(() => {
    fetchMvc();
    fetchBanner();
    getTestimonials();
  }, [fetchMvc]);

  return {
    mvcState,
    bannerState,
    deleteBannerState,
    deleteBanner,
    addBanner,
    addBannerState,
    setBannerState,
    getTestimonialsState,
    setGetTestimonialsState
  };
}

export default useContent;
