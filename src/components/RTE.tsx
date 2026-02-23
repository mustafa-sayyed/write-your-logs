import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";

function RTE({ control, name, defaultValues = "" }) {
  const theme = useSelector((state) => state.theme.theme);

  
  return (
    <div>
      <Controller
        name={name || "content"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey={`${import.meta.env.VITE_TINYMCE_API_KEY}`}
            initialValue={defaultValues}
            init={{
              branding: false,
              content_css: theme === "dark" ? "dark" : "default",
              skin: theme === "dark" ? "oxide-dark" : "oxide",
              height: 400,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
