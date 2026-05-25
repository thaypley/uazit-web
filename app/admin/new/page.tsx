import AuthGuard from "@/components/admin/AuthGuard";
import Editor from "@/components/admin/Editor";

export default function NewPostPage() {
  return (
    <AuthGuard>
      <Editor />
    </AuthGuard>
  );
}
