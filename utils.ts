import axios from "axios";

/**
 * Uploads one or more files (image/video) to Cloudinary
 * @param {File[]} files - Array of File objects from input
 * @param {string} cloudName - Your Cloudinary cloud name
 * @param {string} uploadPreset - Unsigned upload preset name
 * @returns {Promise<string[]>} - List of uploaded file URLs
 */
interface UploadToCloudinaryParams {
    files: File[];
    cloudName: string;
    uploadPreset: string;
}

interface CloudinaryUploadResponse {
    secure_url: string;
    [key: string]: any;
}
// cloudName: dzfqiaf3v
// uploadPreset: investboost
// API_KEY: 724494275782599
// API_SECRET: gBeiAdYTjJsd-WPEqv2yOFt7im4
// E:CLOUDINARY_URL=cloudinary://724494275782599:gBeiAdYTjJsd-WPEqv2yOFt7im4@dzfqiaf3v
// preset:crypto-boost

// export const uploadToCloudinary = async (
//     files: UploadToCloudinaryParams["files"],
//     cloudName: UploadToCloudinaryParams["cloudName"],
//     uploadPreset: UploadToCloudinaryParams["uploadPreset"]
// ): Promise<string[]> => {
//     const uploaders: Promise<{ data: CloudinaryUploadResponse }>[] = [];
//     console.log("Starting Cloudinary upload...");
//     if (!files || files.length === 0) {
//         throw new Error("No files provided for upload");
//     } 

//     for (const file of files) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", uploadPreset);

//         const resourceType = file.type.startsWith("video") ? "video" : "image";

//         const uploader = axios.post<CloudinaryUploadResponse>(
//             `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
//             formData
//         );
//         console.log(`Uploading ${file.name} to Cloudinary...`);
//         uploaders.push(uploader);
//     }

//     try {
//         const responses = await Promise.all(uploaders);
//         console.log("All files uploaded successfully");
//         return responses.map((res) => res.data.secure_url);
//     } catch (error) {
//         console.error("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCloudinary upload failed:", error);
//         console.error("Cloudinary upload failed:", error);
//         throw error;
//     }
// };

// ...existing code...
export const uploadToCloudinary = async (
    files: UploadToCloudinaryParams["files"],
    cloudName: UploadToCloudinaryParams["cloudName"],
    uploadPreset: UploadToCloudinaryParams["uploadPreset"]
): Promise<string[]> => {
    if (!cloudName) throw new Error("cloudName is required for Cloudinary uploads");
    if (!uploadPreset) throw new Error("uploadPreset is required for Cloudinary uploads");

    const uploadFiles = Array.isArray(files) ? files : [files];
    if (uploadFiles.length === 0) {
        throw new Error("No files provided for upload");
    }

    const uploaders: Promise<{ data: CloudinaryUploadResponse }>[] = [];
    console.log("Starting Cloudinary upload...", { count: uploadFiles.length, cloudName, uploadPreset });

    for (const file of uploadFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const resourceType = file.type.startsWith("video") ? "video" : "image";
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        // Do not set manual Content-Type header here; browser/axios will set boundary correctly.
        const uploader = axios.post<CloudinaryUploadResponse>(url, formData);
        console.log(`Uploading ${file.name} to ${url} ...`);
        uploaders.push(uploader);
    }

    try {
        const responses = await Promise.all(uploaders);
        console.log("All files uploaded successfully", responses.map(res => res.data));
        return responses.map((res) => res.data.secure_url);
    } catch (error: any) {
        // Improved error logging: include Cloudinary response body if available
        if (axios.isAxiosError(error)) {
            console.error("Cloudinary upload Axios error:", {
                message: error.message,
                status: error.response?.status,
                responseData: error.response?.data
            });
            const cloudMessage = error.response?.data?.error?.message || JSON.stringify(error.response?.data);
            throw new Error(`Cloudinary upload failed: ${cloudMessage || error.message}`);
        }

        console.error("Cloudinary upload failed (non-Axios):", error);
        throw error;
    }
};
// ...existing code... 