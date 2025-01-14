import { loginSchema } from '@/types/zodSchema';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface LoginFormProps {
    form: UseFormReturn<{
        email: string;
        password: string;
    }>;
    isPending: boolean;
    onSubmit: (data: z.infer<typeof loginSchema>) => void;
}

const LoginForm = ({ form, onSubmit, isPending }: LoginFormProps) => {
    return (
        <div className="w-full mt-10 p-6 bg-white rounded-lg shadow-md z-10 lg:w-1/3 xl:w-1/5 md:w-1/2 sm:w-1/2">
            <Form {...form}>
                <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...field}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
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
                                <FormLabel htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...field}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            isPending ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        disabled={isPending}
                    >
                        {isPending ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;