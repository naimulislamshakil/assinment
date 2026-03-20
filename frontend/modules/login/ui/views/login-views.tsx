'use client';
import { Topbar } from '@/components/common/topbar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/Redux/slice/userSlice';
import { loginSchema } from '@/schema/login-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { EyeClosedIcon, EyeIcon, LockIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Data {
	email: string;
	password: string;
}

const LoginViews = () => {
	const router = useRouter();
	const [login, { isLoading }] = useLoginMutation();
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = async (data: Data) => {
		try {
			const res = await login(data).unwrap();
			console.log(res);

			toast.success(res.message);
			router.push('/');
		} catch (err: any) {
			console.log(err);

			if (err?.data?.errors) {
				err.data.errors.forEach((e: { field: string; message: string }) => {
					toast.error(`${e.field}: ${e.message}`);
				});
				return;
			}

			toast.error(err?.data?.message || 'Something went wrong');
		}
	};
	return (
		<div>
			<Topbar />
			<div className="container py-10 mx-auto min-h-[80vh] flex items-center justify-center">
				<Card className="min-w-xl">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Welcome Back
						</CardTitle>
						<CardDescription>
							Give all details for login your account
						</CardDescription>
					</CardHeader>

					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-3"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<InputGroup>
													<InputGroupInput
														placeholder="E.g: example@yourdomain.com"
														{...field}
													/>

													<InputGroupAddon>
														<MailIcon />
													</InputGroupAddon>
												</InputGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<InputGroup>
													<InputGroupInput
														type={showPassword ? 'text' : 'password'}
														placeholder="********"
														{...field}
													/>

													<InputGroupAddon align="inline-start">
														<LockIcon />
													</InputGroupAddon>

													<InputGroupAddon
														onClick={() => setShowPassword(!showPassword)}
														align="inline-end"
													>
														{showPassword ? <EyeIcon /> : <EyeClosedIcon />}
													</InputGroupAddon>
												</InputGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex items-center justify-between">
									<Field orientation="horizontal">
										<Checkbox id="remember_me" name="remember_me" />
										<Label htmlFor="remember_me">Remember me</Label>
									</Field>

									<p className="text-[#fd6d3f] w-40">Forgot Password</p>
								</div>

								<Button
									disabled={isLoading}
									type="submit"
									className="w-full py-5 disabled:bg-gray-300"
								>
									{isLoading ? 'Login....' : 'Login'}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LoginViews;
