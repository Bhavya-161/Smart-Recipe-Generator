'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onImageChange: (base64: string | null, detectedIngredients?: string[]) => void;
}

export default function ImageUpload({ onImageChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1]; // remove data:image prefix
      setPreview(reader.result as string);
      setLoading(true);

      try {
        const res = await fetch("/api/detect-ingredients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Image: base64 }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        const data = await res.json();
        const ingredients: string[] = data.ingredients || [];
        onImageChange(base64, ingredients); // send detected ingredients to page.tsx
      } catch (err) {
        console.error("Ingredient detection failed:", err);
        onImageChange(base64); // fallback, just send base64
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null, []);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && (
        <div style={{ marginTop: '10px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '200px', borderRadius: '5px', marginBottom: '5px' }}
          />
          <br />
          <button type="button" onClick={handleRemove}>Remove Image</button>
        </div>
      )}
      {loading && <p>Detecting ingredients...</p>}
    </div>
  );
}
















