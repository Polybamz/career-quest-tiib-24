import { useState, useEffect } from "react";
import Cookies from "js-cookie";

/** Adjust this interface to your API shape */
export interface Job {
  _id: string;
  title: string;
  description: string;
  [key: string]: any; // additional fields
}

interface UseJobsHook {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  addJob: (job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => Promise<void>;
  updateJobState:{
    loading: boolean;
  error: string | null;
  success: boolean
  }
  deleteJobState: {
    loading: boolean;
    error: string | null;
    success: boolean | null
  }
  addJobState: {
    loading: boolean;
    error: string | null;
    success: boolean;
  }

  getJobByEmployerId: (employerId: string) => Promise<void>;
  employerJobState: {
    loading: boolean;
    success: boolean | null;
    error: string | null;
  };
}

/**
 * Custom hook to fetch and manage job data, providing state and CRUD operations.
 * This hook is self-contained and does not rely on React Context.
 * @returns {UseJobsHook} An object containing jobs array, loading state, error, and CRUD functions.
 */
export const useJobs = (): UseJobsHook => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [updated, setupdated] = useState<boolean>()
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccessful, setDeleteSuccessful] = useState(false)
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [jobAdded, setJobAdded] = useState<boolean>(false);
  const [employerJobState, setEmployerJobState] = useState({
    loading: false,
    success: null,
    error: null,
    data: null
  });

  const BASE_URL = "https://yocaco-backend.onrender.com/api/";

  // Helper function to get authorization token and headers
  const getAuthHeaders = () => {
    const token = Cookies.get("token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    // if (token) {
    //   headers["Authorization"] = `Bearer ${token}`;
    // } else {
    //   console.warn("Authorization token not found. Operations requiring auth may fail.");
    // }
    return headers;
  };

  // Effect to fetch all jobs on mount
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Fetch jobs from the API
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}jobs/get-job-by-status/approved`);
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched Jobs:', data);
        setJobs(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred while fetching jobs";
        setError(message);
        console.error("Fetch Jobs Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []); // Empty dependency array ensures it runs only once on mount
  // get job by employer id
  const getJobByEmployerId = async (employerId: string) => {
    setEmployerJobState({ loading: true, success: null, error: null, data: null });
    try {
      const response = await fetch(`${BASE_URL}jobs/get-job-by-employer-id/${employerId}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch jobs: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched Jobs:', data);
      setJobs(data);
      setEmployerJobState({ loading: false, success: true, error: null, data: data });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred while fetching jobs";
      setEmployerJobState({ loading: false, success: false, error: message, data: null });
      console.error("Fetch Jobs Error:", err);
    }
  }
  const addJob = async (job: Partial<Job>) => {
    setAddLoading(true);
    setAddError(null);
    try {
      const response = await fetch(`${BASE_URL}jobs/createJob`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to add job: ${response.statusText}`);
      }
      const data: Job = await response.json();
      console.log('Added Job:', data);
      //setJobs((prev.jobs) => [...prev, data]);
      setAddError(null);
      setJobAdded(true);
      setAddLoading(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred while adding job";
      setAddError(message);
      setAddLoading(false);
      console.error("Add Job Error:", err);
    }
  };

  const deleteJob = async (id: string) => {
    setDeleteLoading(true)
    setDeleteError(null)
    setDeleteSuccessful(null)
    try {
      const response = await fetch(`${BASE_URL}jobs/deleteJobById/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete job: ${response.statusText}`);
      }
      setJobs((prev) => prev.filter((job) => job._id !== id));
      setDeleteLoading(false)
      setDeleteError(null)
      setDeleteSuccessful(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred while deleting job";
      setDeleteError(message);
      setDeleteLoading(false)
      setDeleteSuccessful(false)

      console.error("Delete Job Error:", err);
    }
  };

  const updateJob = async (id: string, job: Partial<Job>) => {
    setUpdateError(null)
    setLoadingUpdate(true)
    setupdated(false)
    try {
      const response = await fetch(`${BASE_URL}jobs/updateJob/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update job: ${response.statusText}`);
      }
      const data: Job = await response.json();
      setJobs((prev) =>
        prev.map((j) => (j._id === id ? { ...j, ...data } : j))
      );
      setUpdateError(null)
      setupdated(true)
      setLoadingUpdate(false)
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred while updating job";
      setError(message);
      setUpdateError(message)
      setupdated(false)
      setLoadingUpdate(false)
      console.error("Update Job Error:", err);
    }
  };
  // useEffect to reset jobAdded after successful addition
  useEffect(() => {
  }, []);


  return {
    jobs,
    isLoading,
    error,
    addJob,
    deleteJob,
    updateJob,
    updateJobState:{
      loading:loadingUpdate,
      error:updateError,
      success:updated
    },
    deleteJobState: {
      loading: deleteLoading,
      error: deleteError,
      success: deleteSuccessful
    },
    addJobState: {
      loading: addLoading,
      error: addError,
      success: jobAdded
    },
    getJobByEmployerId,
    employerJobState
  };
};
