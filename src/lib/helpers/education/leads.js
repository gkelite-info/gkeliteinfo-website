import { supabase } from "../../../utils/supabase/client";

/**
 * Uploads a file to a specified Supabase Storage bucket.
 * 
 * @param {File} file - The file to upload.
 * @param {string} bucket - The name of the storage bucket.
 * @param {string} path - The path inside the bucket (e.g., 'applications/profiles/filename.jpg').
 * @returns {Promise<{success: boolean, url?: string, error?: any}>}
 */
export async function uploadApplicationFile(file, bucket, path) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return { success: true, url: publicUrlData.publicUrl };
  } catch (error) {
    console.error("uploadApplicationFile error:", error);
    return { success: false, error };
  }
}

/**
 * Saves a new lead application and its related qualifications/exams.
 * 
 * @param {Object} payload 
 * @param {Object} payload.lead - Data for `lead_applications` table.
 * @param {Array} payload.qualifications - Data array for `education_qualifications` table.
 * @param {Object|null} payload.entranceExam - Data for `entrance_exams` table.
 */
export async function saveLeadApplication(payload) {
  try {
    const now = new Date().toISOString();

    const leadData = {
      ...payload.lead,
      createdAt: now,
      updatedAt: now,
    };

    const { data: leadResult, error: leadError } = await supabase
      .from("lead_applications")
      .insert([leadData])
      .select("applicationId")
      .single();

    if (leadError) throw leadError;

    const applicationId = leadResult.applicationId;

    const year = new Date().getFullYear();
    const type = (payload.lead.applicationFor || "APP").toUpperCase();
    const appNumber = `GK-${type}-${year}-${String(applicationId).padStart(5, '0')}`;

    const { error: updateError } = await supabase
      .from("lead_applications")
      .update({ applicationNumber: appNumber })
      .eq("applicationId", applicationId);

    if (updateError) {
      console.error("Failed to update applicationNumber:", updateError);
    }

    if (payload.qualifications && payload.qualifications.length > 0) {
      const qualificationsData = payload.qualifications.map(q => ({
        ...q,
        applicationId,
        createdAt: now,
        updatedAt: now,
      }));

      const { error: qualError } = await supabase
        .from("education_qualifications")
        .insert(qualificationsData);

      if (qualError) {
        console.error("education_qualifications insert error:", qualError);
      }
    }

    if (payload.entranceExam) {
      const examData = {
        ...payload.entranceExam,
        applicationId,
        createdAt: now,
        updatedAt: now,
      };

      const { error: examError } = await supabase
        .from("entrance_exams")
        .insert([examData]);

      if (examError) {
        console.error("entrance_exams insert error:", examError);
      }
    }

    return { success: true, applicationId, applicationNumber: appNumber };
  } catch (error) {
    console.error("saveLeadApplication error:", error);
    return { success: false, error };
  }
}
