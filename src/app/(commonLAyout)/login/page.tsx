'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormInputs, loginSchema } from '@/schema/authSchema';
import { useLoginMutation } from '@/redux/features/authApi/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/features/authApi/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { buttonStyle } from '@/style';

export default function Login() {
  const [loginFn, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginFn(data).unwrap();

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
        router.push('/lessons');
        toast.success('ログイン成功！', {
          description: 'Welcome back to your Japanese learning journey!',
        });
      }
    } catch (error: any) {
      setErrorMessage(error.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="h-auto my-10 md:my-8 lg:h-[70vh] xl:h-screen flex m-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
        <div className="w-full">
          <Image
            src="https://img.freepik.com/free-vector/japanese-calligraphy-concept-illustration_114360-4134.jpg"
            alt="Japanese Learning Illustration"
            width={400}
            height={300}
            className="mx-auto lg:mx-0"
          />
        </div>

        <div className="relative max-w-2xl lg:w-full">
          <div className="bg-gradient-to-r from-blue-300 to-purple-500 absolute h-[130px] w-[350px] blur-2xl rotate-45"></div>

          <Card className="w-full bg-white/20 shadow-md backdrop-blur-3xl">
            <CardHeader>
              <CardTitle>ログイン (Login)</CardTitle>
              <CardDescription>
                Sign in to access your personalized learning experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
                <div className="flex items-center justify-center">
                  <Button
                    type="submit"
                    className={`${buttonStyle}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'ログイン中...' : 'ログイン (Login)'}
                  </Button>
                </div>
              </form>
              <p className="flex items-center gap-2 mt-5 justify-center">
                You haven't signed up yet?
                <Link
                  className="text-blue-500 hover:text-blue-600"
                  href="/sign-up"
                >
                  Sign Up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
