'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '@/redux/features/authApi/authApi';
import { setCredentials } from '@/redux/features/authApi/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { SignUpFormInputs, signUpSchema } from '@/schema/authSchema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Cookies from 'js-cookie';
import Image from 'next/image';
import {
  ImageIcon,
  X,
  CheckCircle,
  BookOpen,
  Users,
  Palette,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { buttonStyle } from '@/style';
import Link from 'next/link';

export default function SignUpPage() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('photo', e.target.files as FileList);
    }
  };

  const handleRemoveImage = (): void => {
    setPreviewImage(null);
    setValue('photo', {} as FileList);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: SignUpFormInputs): Promise<void> => {
    let photoUrl = '';
    try {
      if (data.photo?.[0]) {
        const formData = new FormData();
        formData.append('file', data.photo[0]);
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

      const registrationData = {
        name: data.name,
        email: data.email,
        password: data.password,
        photo: photoUrl,
      };

      const response = await registerUser(registrationData).unwrap();

      if (response.success) {
        Cookies.set('accessToken', response.data.token);
        dispatch(
          setCredentials({
            user: response.data.user,
            token: response.data.token,
          })
        );
        reset();
        setErrorMessage(null);
        setPreviewImage(null);
        router.push('/lessons');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An unexpected error occurred.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="h-fit relative">
      <div className="mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-3xl bg-white/20 rounded-md px-3 py-5 border mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-center">
            ようこそ <span className="text-blue-600">Learn Japanese</span> へ！
          </h1>
          <p className="text-lg mb-6 text-center">
            Embark on your journey to master the Japanese language and culture.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/20 backdrop-blur-3xl">
              <CardHeader>
                <CardTitle>新規登録 (Sign Up)</CardTitle>
                <CardDescription>
                  Create your account to start learning Japanese
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">名前 (Name)</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">メールアドレス (Email)</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="password">パスワード (Password)</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      {...register('password')}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="photo">
                      プロフィール写真 (Profile Photo)
                    </Label>
                    <Input
                      type="file"
                      id="photo"
                      accept="image/*"
                      {...register('photo')}
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                    <div className="mt-1 w-full">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Upload Photo <ImageIcon className="ml-2" />
                      </Button>
                    </div>
                    {previewImage && (
                      <div className="flex items-center justify-center">
                        <div className="mt-4 size-28 rounded-md p-2 relative">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            width={100}
                            height={100}
                            className="rounded-full object-cover size-20"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                    {errors.photo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.photo.message}
                      </p>
                    )}
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                  )}
                  <div className="flex items-center justify-center">
                    <Button
                      type="submit"
                      className={`${buttonStyle}`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Registering...' : '登録する (Register)'}
                    </Button>
                  </div>
                </form>
                <p className="flex items-center gap-2 mt-5 justify-center">
                  Already have an account?{' '}
                  <Link
                    className="text-blue-500 hover:text-blue-600"
                    href="/login"
                  >
                    Login
                  </Link>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 absolute h-[130px] w-[350px] blur-3xl"></div>
            <Card className="bg-white/20 backdrop-blur-3xl relative">
              <CardHeader>
                <CardTitle>日本語を学ぶ理由 (Why Learn Japanese?)</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="culture" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 gap-3 md:h-[50px] md:z-20">
                    <TabsTrigger
                      className="text-black bg-transparent hover:bg-gray-200 font-semibold py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 [&[data-state='active']]:bg-gradient-to-r [&[data-state='active']]:from-blue-500 [&[data-state='active']]:to-purple-500 [&[data-state='active']]:text-white"
                      value="culture"
                    >
                      文化 (Culture)
                    </TabsTrigger>
                    <TabsTrigger
                      className="text-black bg-transparent hover:bg-gray-200 font-semibold py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 [&[data-state='active']]:bg-gradient-to-r [&[data-state='active']]:from-blue-500 [&[data-state='active']]:to-purple-500 [&[data-state='active']]:text-white"
                      value="career"
                    >
                      キャリア (Career)
                    </TabsTrigger>
                    <TabsTrigger
                      className="text-black bg-transparent hover:bg-gray-200 font-semibold py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 [&[data-state='active']]:bg-gradient-to-r [&[data-state='active']]:from-blue-500 [&[data-state='active']]:to-purple-500 [&[data-state='active']]:text-white"
                      value="anime"
                    >
                      アニメ (Anime)
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="culture" className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Immerse in Rich Culture
                    </h3>
                    <p>
                      Discover the depth of Japanese traditions, arts, and
                      modern pop culture.
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center">
                        <CheckCircle
                          className="mr-2 text-green-500"
                          size={16}
                        />{' '}
                        Experience tea ceremonies
                      </li>
                      <li className="flex items-center">
                        <CheckCircle
                          className="mr-2 text-green-500"
                          size={16}
                        />{' '}
                        Understand Kabuki theater
                      </li>
                      <li className="flex items-center">
                        <CheckCircle
                          className="mr-2 text-green-500"
                          size={16}
                        />{' '}
                        Explore modern fashion trends
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="career" className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Boost Your Career
                    </h3>
                    <p>
                      Open doors to new opportunities in the global job market.
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center">
                        <CheckCircle
                          className="mr-2 text-green-500"
                          size={16}
                        />{' '}
                        Work with Japanese companies
                      </li>
                      <li className="flex items-center">
                        <CheckCircle
                          className="mr-2 text-green-500"
                          size={16}
                        />{' '}
                        Enhance your resume
                      </li>
                      <li className="flex items-center">
                        <CheckCircle
                          className="mr-2 text-green-500"
                          size={16}
                        />{' '}
                        Access unique job opportunities
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="anime" className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Enjoy Anime & Manga
                    </h3>
                    <p>
                      Appreciate your favorite shows and comics in their
                      original language.
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center">
                        <CheckCircle
                          className="mr-2 text-green-500"
                          size={16}
                        />{' '}
                        Watch without subtitles
                      </li>
                      <li className="flex items-center">
                        <CheckCircle
                          className="mr-2 text-green-500"
                          size={16}
                        />{' '}
                        Understand cultural nuances
                      </li>
                      <li className="flex items-center">
                        <CheckCircle
                          className="mr-2 text-green-500"
                          size={16}
                        />{' '}
                        Read untranslated manga
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="mt-8 bg-white/20 backdrop-blur-sm ">
              <CardHeader>
                <CardTitle>学習方法 (How You'll Learn)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <BookOpen className="w-10 h-10 mr-4 text-blue-500" />
                    <div>
                      <h4 className="font-semibold">Interactive Lessons</h4>
                      <p className="text-sm text-gray-600">
                        Engage with our AI-powered learning system
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Users className="w-10 h-10 mr-4 text-green-500" />
                    <div>
                      <h4 className="font-semibold">Live Tutoring</h4>
                      <p className="text-sm text-gray-600">
                        Practice with native Japanese speakers
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Palette className="w-10 h-10 mr-4 text-purple-500" />
                    <div>
                      <h4 className="font-semibold">Cultural Workshops</h4>
                      <p className="text-sm text-gray-600">
                        Immerse yourself in Japanese traditions
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="bg-gradient-to-r from-blue-300 to-purple-300 absolute h-[230px] w-[350px] blur-3xl -rotate-12"></div>
        <motion.section
          className="mt-8 text-center bg-white/20 backdrop-blur-3xl rounded-md border px-3 py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            日本語の冒険を始めましょう！ (Start Your Japanese Adventure!)
          </h2>
          <p className="mb-4">
            Join thousands of learners mastering Japanese with our proven
            methods.
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/register')}
            className={`${buttonStyle}`}
          >
            無料で始める (Start for Free)
          </Button>
        </motion.section>
      </div>
    </div>
  );
}
