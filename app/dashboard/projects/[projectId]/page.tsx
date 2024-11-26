"use client";

import DASHBOARDAdminProjectDetails from '@/components/DASHBOARDAdminProjectDetails';
import DASHBOARDClientProjectDetails from '@/components/DASHBOARDClientProjectDetails';
import { useAuth } from '@/context/authContext';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ProjectPageProps = {
  params: {
    projectId: string;
  };
};

const ProjectPage = ({ params }: ProjectPageProps) => {
  const router = useRouter();
  const { user } = useAuth(); // Retrieve user from authentication context
  const searchParams = useSearchParams(); // Initialize useSearchParams
  const userId = searchParams.get('userId'); // Get userId from query parameters
  const projectId = searchParams.get('projectId'); // Get projectId from query parameters

  console.log(userId);
  console.log(projectId);

  useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirect to login if no user is logged in
    }
  }, [user, router]);

  // Ensure userId and projectId exist before rendering the component
  if (!userId || !projectId) {
    return <div>Missing user or project information.</div>;
  }

  // Prevent rendering until user is confirmed
  if (!user) {
    return null;
  }

  // Render correct dashboard
  return user.email === 'ayush.bhujle@gmail.com' ? (
    <DASHBOARDAdminProjectDetails userId={userId} projectId={projectId} />
  ) : (
    <DASHBOARDClientProjectDetails userId={userId} projectId={projectId} />
  );
};

export default ProjectPage;
