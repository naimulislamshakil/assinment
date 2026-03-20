'use client';
import { Topbar } from '@/components/common/topbar';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import {
	EyeClosedIcon,
	EyeIcon,
	LockIcon,
	MailIcon,
	User2Icon,
} from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { registerSchema } from '@/schema/register-schema';
import { useRegisterMutation } from '@/Redux/slice/userSlice';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Data {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const RegisterViews = () => {
	const router = useRouter();
	const [register, { isLoading }] = useRegisterMutation();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = async (data: Data) => {
		try {
			const res = await register(data).unwrap();

			toast.success(res.message);

			router.push('/login');
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
							Give all details for create a account
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
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<InputGroup>
													<InputGroupInput
														placeholder="E.g: Jon Dow"
														{...field}
													/>

													<InputGroupAddon>
														<User2Icon />
													</InputGroupAddon>
												</InputGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

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

								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<InputGroup>
													<InputGroupInput
														type={showConfirmPassword ? 'text' : 'password'}
														placeholder="********"
														{...field}
													/>

													<InputGroupAddon align="inline-start">
														<LockIcon />
													</InputGroupAddon>

													<InputGroupAddon
														onClick={() =>
															setShowConfirmPassword(!showConfirmPassword)
														}
														align="inline-end"
													>
														{showConfirmPassword ? (
															<EyeIcon />
														) : (
															<EyeClosedIcon />
														)}
													</InputGroupAddon>
												</InputGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									disabled={isLoading}
									className="w-full py-5"
									type="submit"
								>
									{isLoading ? 'User creating...' : 'Register'}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default RegisterViews;
