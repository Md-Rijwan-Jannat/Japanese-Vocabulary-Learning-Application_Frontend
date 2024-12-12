'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUpdateUserMutation } from '@/redux/features/authApi/userApi';
import { useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/features/authApi/authSlice';
import { Spinner } from '@/components/shared/spinner';
import { buttonStyle } from '@/style';
import Image from 'next/image';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SettingPage() {
  const currentUser = useAppSelector(getUser);
  const router = useRouter();
  const [updateUserFn, { isLoading }] = useUpdateUserMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let photoUrl = null;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'travel-tips');

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const cloudinaryData = await response.json();
        photoUrl = cloudinaryData.secure_url;
      }
      const response = await updateUserFn({
        id: currentUser?.id,
        data: { ...formData, photo: photoUrl },
      }).unwrap();
      if (response.success) {
        toast.success('Profile updated successfully!');
        router.push('/profile');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-purple-500">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      {/* Settings Header */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-300 to-purple-300 absolute h-[130px] w-[350px] blur-2xl mt-10"></div>
        <Card className="p-6 bg-white/20 backdrop-blur-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Settings</CardTitle>
            <CardDescription className="text-gray-500">
              Update your profile information
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Profile Update Form */}
      <motion.div
        className="mt-8 w-full max-w-md relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-300 to-purple-300 absolute bottom-0 right-0 h-[130px] w-[350px] blur-2xl mt-10"></div>
        <Card className="p-6 bg-white/20 backdrop-blur-3xl">
          <CardContent>
            {previewImage && (
              <div className="mt-4 flex flex-col items-center">
                <Image
                  src={previewImage ? previewImage : currentUser?.photo || ''}
                  alt="Preview"
                  width={1000}
                  height={1000}
                  className="rounded-full size-24 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-2 border border-red-100 text-red-500  hover:bg-red-500 hover:text-white transition-colors duration-300 rounded-md px-4 py-1"
                >
                  Remove
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-500"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-500"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-500"
                >
                  Profile Photo
                </label>
                <Input
                  type="file"
                  id="photo"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full mt-2"
                >
                  Upload Photo
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className={`${buttonStyle} mt-5`}
                >
                  {isLoading ? 'Updating...' : 'Profile Update'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
