import { Metadata } from "next";
import TextDetail from "@/components/TextGallery/TextDetail";

interface Props {
  params: {
    type: 'math' | 'code';
    idx: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.type.toUpperCase()} #${params.idx} | Pandalla AI`,
    description: `Detailed analysis and solution for ${params.type} problem #${params.idx}`,
  };
}

const TextDetailPage = ({ params }: Props) => {
  return (
    <>
      <TextDetail type={params.type} idx={params.idx} />
    </>
  );
};

export default TextDetailPage;