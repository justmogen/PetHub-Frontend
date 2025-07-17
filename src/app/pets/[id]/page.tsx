import { Metadata } from "next";
import { PetDetailContainer } from "@/components/pets/PetDetailContainer";

interface PetDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PetDetailPageProps): Promise<Metadata> {
  // Use the pet ID for dynamic metadata
  const { id: petId } = await params;

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

export default async function PetDetailPage({ params }: PetDetailPageProps) {
  const { id } = await params;
  return <PetDetailContainer petId={id} />;
}
