import "./style.css";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zstywelqfgshdnkypvwi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdHl3ZWxxZmdzaGRua3lwdndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxODYxMzYsImV4cCI6MjAwMjc2MjEzNn0.6Yt8jkgmCWBKH4Od0yeq3_kRQIRZerf2Lj0LAYV8c7U";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getData() {
  const { data, error } = await supabase.from("countries").select();

  console.log(error);
  const listCountry = document.getElementById("listCountry");
  if (data != null) {
    for (let index = 0; index < data.length; index++) {
      console.log(data[index]);
      const li = document.createElement("li");
      li.textContent = data[index].name;
      li.id = data[index].id;
      listCountry?.appendChild(li);
    }
  }
}

getData();

const submitBtn = document.getElementById("submit");

submitBtn?.addEventListener("click", async () => {
  const countryName = document.getElementById('countryName') as (HTMLInputElement | null);
  const { error } = await supabase
    .from("countries")
    .insert({name: countryName?.value });
});
