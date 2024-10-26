"use client"

import DASHBOARDAdminProjectDetailsProgress from '@/components/DASHBOARDAdminProjectDetailsProgress';
import DASHBOARDClientProjectDetailsProgress from '@/components/DASHBOARDClientProjectDetailsProgress';
import { useAuth } from '@/context/authContext';
import { useSearchParams } from 'next/navigation'; // Assuming you're still using `useSearchParams`
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProjectPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Initialize useSearchParams
  const userId = searchParams.get('userId'); // Get userId from query parameters
  const projectId = searchParams.get('projectId'); // Get projectId from query parameters
  const { user, loading } = useAuth();  // Use your auth hook

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');  // Redirect to login if no user is logged in
      } else {
        // Check if the user is admin based on their email
        if (user.email === 'ayush.bhujle@gmail.com') {
          // Admin
        } else {
          // Client
        }
      }
    }
  }, [user, loading, router]);

  // Ensure userId and projectId exist before rendering the component
  if (!userId || !projectId) {
    return <div>Missing user or project information.</div>;
  }


  if (!user) {
    return null;  // Prevent rendering until user is confirmed
  }

  // Ensure userId and projectId exist before rendering the component
  if (!userId || !projectId) {
    return <div>Missing user or project information.</div>;
  }

  // Render correct dashboard
  return user.email === 'ayush.bhujle@gmail.com' ? (
    <DASHBOARDAdminProjectDetailsProgress userId={userId} projectId={projectId} />
  ) : (
    <DASHBOARDClientProjectDetailsProgress userId={userId} projectId={projectId} />
  );
};

export default ProjectPage;