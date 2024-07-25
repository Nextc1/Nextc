// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '../../../../utils/supabase';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { cn } from '@/utils/cn';
// import { IconBrandGoogle } from "@tabler/icons-react";
// import Loading from '@/components/Loading';



// export default function SignIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const router = useRouter();

//     const handleSignIn = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const { error } = await supabase.auth.signInWithPassword({
//             email,
//             password,
//         });
//         if (error) {
//             alert(error.message);
//         } else {
//             router.push('/');
//         }
//     };

//     const handleGoogleSignIn = async () => {
//         const { error } = await supabase.auth.signInWithOAuth({
//             provider: 'google',
//         });
//         if (error) {
//             alert(error.message);
//         } else {
//             router.push('/');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
//             <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold mb-6">Sign In</h2>
//                 <form onSubmit={handleSignIn} className="space-y-4">
//                     <div>
//                         <Label htmlFor="email">Email Address</Label>
//                         <Input
//                             id="email"
//                             type="email"
//                             placeholder="example@domain.com"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <Label htmlFor="password">Password</Label>
//                         <Input
//                             id="password"
//                             type="password"
//                             placeholder="••••••••"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="w-full">
//                         Sign In
//                     </button>
//                 </form>
//                 <button
//                     onClick={handleGoogleSignIn}
//                     className="w-full mt-4 bg-red-500 text-white"
//                 >
//                     <IconBrandGoogle className="h-5 w-5 inline mr-2" />
//                     Sign In with Google
//                 </button>
//                 <div className="mt-4 text-center">
//                     <p className="text-sm text-gray-600">
//                         Don't have an account?{' '}
//                         <a
//                             href="/api/auth/signup"
//                             className="text-blue-500 font-medium hover:underline"
//                         >
//                             Sign Up
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../utils/supabase';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { IconBrandGoogle } from "@tabler/icons-react";
import Loading from '@/components/Loading';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                router.push('/');
            }
        };
        checkUser();
    }, [router]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                // Wait for the user to be authenticated before redirecting
                await new Promise(resolve => setTimeout(resolve, 1000)); // add a delay
                router.push('/');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });

            if (error) {
                setError(error.message);
            } else {
                // Wait for the user to be authenticated before redirecting
                await new Promise(resolve => setTimeout(resolve, 1000)); // add a delay
                router.push('/');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
                        {error && <div className="mb-4 text-red-500">{error}</div>}
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full">
                                Sign In
                            </button>
                        </form>
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full mt-4 bg-red-500 text-white"
                        >
                            <IconBrandGoogle className="h-5 w-5 inline mr-2" />
                            Sign In with Google
                        </button>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a
                                    href="/api/auth/signup"
                                    className="text-blue-500 font-medium hover:underline"
                                >
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
