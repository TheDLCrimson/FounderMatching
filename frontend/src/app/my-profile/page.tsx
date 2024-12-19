"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileAPI } from "@/lib/api/profiles";
import { ProfilePreviewCard } from "@/lib/types/profiles";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MyProfilePage = () => {
  const { getUserProfiles } = useProfileAPI();
  const [profiles, setProfiles] = useState<ProfilePreviewCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await getUserProfiles();
        // const formData = await response.formData();
        const profilesJson = response.get("ProfileInfo") as string;

        if (!profilesJson) {
          throw new Error("Missing ProfileInfo in response");
        }

        const parsedProfiles: ProfilePreviewCard[] = JSON.parse(profilesJson);

        const updatedProfiles = parsedProfiles.map((profile) => {
          const avatarFile = response.get(String(profile.avatar)) as File;
          if (!avatarFile) {
            console.warn(`No file found for avatar ID ${profile.avatar}`);
          }

          return {
            ...profile,
            avatar: avatarFile,
          };
        });

        setProfiles(updatedProfiles);
      } catch (err: any) {
        console.error("Error fetching profiles:", err.message);
        setError("Failed to load profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading)
    return <div className="text-center p-6">Loading profiles...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profiles</h1>
      <div className="flex flex-col items-center p-4">
        <Button onClick={() => router.push("/my-profile/create")}>
          Create New Profile
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Card
            key={profile.ProfileID}
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() =>
              router.push(`/dashboard/profile/me?id=${profile.ProfileID}`)
            }
          >
            <CardHeader className="flex items-center justify-center">
              <img
                src={profile.AvatarURL || "https://via.placeholder.com/150"}
                alt={profile.Name}
                className="h-24 w-24 rounded-full object-cover"
              />
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="text-lg font-bold break-words">
                {profile.Name}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {profile.Occupation || "No occupation listed"}
              </CardDescription>
              <div className="mt-2 text-sm font-medium text-blue-600">
                {profile.IsStartup ? "Startup" : "Candidate"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyProfilePage;
