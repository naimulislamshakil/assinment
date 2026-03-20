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
import { Field } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { registerSchema } from '@/schema/register-schema';

interface Data {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const RegisterViews = () => {
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
		console.log(data);
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
															setShowConfirmPassword(!showPassword)
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

								<div>
									<Field orientation="horizontal">
										<Checkbox id="remember_me" name="remember_me" />
										<Label htmlFor="remember_me">Remember me</Label>
									</Field>

									{/* <Link></Link> */}
								</div>

								<Button className="w-full py-5" type="submit">
									Register
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
