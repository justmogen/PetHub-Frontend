import { Metadata } from "next";
import { PetDetailContainer } from "@/components/pets/PetDetailContainer";

interface PetDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PetDetailPageProps): Promise<Metadata> {
  // Use the pet ID for dynamic metadata
  const petId = params.id;

  return {
    title: `Pet Details | Pet Hub`,
    description: `View detailed information about this adorable pet (ID: ${petId}) available for adoption.`,
    openGraph: {
      title: `Pet Details | Pet Hub`,
      description: `View detailed information about this adorable pet available for adoption.`,
      type: "website",
    },
  };
}

export default function PetDetailPage({ params }: PetDetailPageProps) {
  return <PetDetailContainer petId={params.id} />;
}
