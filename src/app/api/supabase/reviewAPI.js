import { supabase } from "../../../utils/supabase/client";


export const createReview = async ({
    fullname,
    organizationName,
    designation,
    starRating,
    note
}) => {
    try {
        const now = new Date().toISOString();

        const { data, error } = await supabase
            .from("reviews")
            .insert([
                {
                    fullname,
                    organizationName: organizationName || null,
                    designation,
                    starRating,
                    note,
                    is_deleted: false,
                    createdAt: now,
                    updatedAt: now
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Error creating review:", err.message);
        throw err;
    }
};


export const getReviews = async () => {
    try {
        const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .eq("is_deleted", false)
            .order("createdAt", { ascending: false });

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Error fetching reviews:", err.message);
        throw err;
    }
};
