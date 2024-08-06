import { Hero } from "../components/Hero";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  "use server";

  const supabase = createClient();
  const name = "Data";

  async function fetchData() {
    const { data, error } = await supabase.from("Data").select("*");
    console.log("Fetched data:", data);
    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
  }

  await fetchData();

  return (
    <>
      <Hero />
    </>
  );
}
