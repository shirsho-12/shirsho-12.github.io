import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useInteractionTracking = () => {
  const logInteraction = useCallback(
    async (interactionType: string, elementClicked?: string) => {
      try {
        const { data: ipData } = await fetch(
          "https://api.ipify.org?format=json"
        ).then((res) => res.json());

        await supabase.from("user_interactions").insert({
          page_url: window.location.pathname,
          interaction_type: interactionType,
          element_clicked: elementClicked,
          user_agent: navigator.userAgent,
          ip_address: ipData?.ip,
        });
      } catch (error) {
        console.error("Error logging interaction:", error);
      }
    },
    []
  );

  return { logInteraction };
};
