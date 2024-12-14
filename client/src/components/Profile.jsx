import React, { useState } from "react";
import Navbar from "./ui/shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Link, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const Profile = () => {
  const isResume = true;

  const [open, setOpen] = useState(false);
  const {user}=useSelector(store=>store.auth)
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                className=""
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}
                
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right cursor-pointer"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge className="" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>NO SKILLS</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>

          {isResume ? (
            <a
              className="flex gap-1 text-blue-500 w-full hover:underline cursor-pointer"
              target="blank"
              href={user?.profile?.resume}
            >
              {user?.profile?.resumeOriginalName}<Link></Link>
            </a>
          ) : (
            <span>Not Applicaple</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* applied job table */}
        <AppliedJobTable />
      </div>

      {/* update profile dialog from */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
