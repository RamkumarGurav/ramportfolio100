"use client";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export default function uploadPage() {
  const [file, setFile] = useState<any>();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(file);
    const data = new FormData();
    data.set("file", file);

    let result = await fetch("api/upload", {
      method: "POST",
      body: data,
    });
    result = await result.json();
    console.log(result);
  };
  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <Button type="submit">upload</Button>
      </form>
    </div>
  );
}
