import Editor from "@/features/documents/components/document/editor";
import Toolbar from "@/features/documents/components/document/toolbar";

const Document = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default Document;
