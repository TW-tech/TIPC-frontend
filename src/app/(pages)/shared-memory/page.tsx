import NineBlockCard from "@/components/sections/NineBlockCard";
import PageLayout from "@/components/layout/PageLayout";

export default function SharedMemoryPage() {
  return (
    <PageLayout 
      title="共享/文化(影像)記憶"
      subtitle="Cultural Memory"
      headerpic="/images/header/NineBlock.jpg"
    >
      <NineBlockCard />
    </PageLayout>
  );
}
