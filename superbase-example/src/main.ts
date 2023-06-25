import "./style.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zstywelqfgshdnkypvwi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdHl3ZWxxZmdzaGRua3lwdndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxODYxMzYsImV4cCI6MjAwMjc2MjEzNn0.6Yt8jkgmCWBKH4Od0yeq3_kRQIRZerf2Lj0LAYV8c7U";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getData() {
  const { data, error } = await supabase
  .from("countries")
  .select();

  if (error) {
    console.log(error);
    return;
  }

  const listCountry = document.getElementById("listCountry");

  if (data) {
    for (let index = 0; index < data.length; index++) {
      const li = document.createElement("li");
      const deleteIcon = document.createElement("i");

      deleteIcon.className = "fa-regular fa-trash-can";
      deleteIcon.dataset.id = data[index].id;
      li.textContent = data[index].name;
      li.id = data[index].id;

      listCountry?.appendChild(li);
      listCountry?.appendChild(deleteIcon);
    }
  }
}

getData();

const submitBtn = document.getElementById("submit");

submitBtn?.addEventListener("click", async () => {
  const countryName = document.getElementById("countryName") as HTMLInputElement | null;

  if (!countryName) {
    return;
  }

  const { error } = await supabase
  .from("countries")
  .insert([{ name: countryName.value }]);

  if (error) {
    console.log(error);
  }
});

const listCountry = document.getElementById("listCountry");

listCountry?.addEventListener("click", async (event) => {
  if (event.target instanceof HTMLElement) {
    const deleteIcon = event.target.closest("i");

    if (deleteIcon) {
      const countryId = deleteIcon.dataset.id;

      if (!countryId) {
        return;
      }

      const { error } = await supabase.from("countries")
      .delete()
      .eq("id", countryId);

      if (error) {
        console.log(error);
      } else {
        // Remove the deleted item from the UI
        const listItem = deleteIcon.parentNode;
        listItem?.parentNode?.removeChild(listItem);
        window.location.reload(); // Refresh the page

      }
    }
  }
});
